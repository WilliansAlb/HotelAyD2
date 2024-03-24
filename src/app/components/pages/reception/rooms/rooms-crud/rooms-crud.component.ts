import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Room, RoomTypeResponse } from 'src/app/models/room.model';
import { RoomTypeService } from 'src/app/services/room-type.service';
import { RoomService } from 'src/app/services/room.service';
import { MessageEnum } from 'src/app/enums/message.enum';

@Component({
  selector: 'app-rooms-crud',
  templateUrl: './rooms-crud.component.html',
  styleUrls: ['./rooms-crud.component.scss']
})
export class RoomsCrudComponent implements OnInit {

  roomId!: number;
  room: Room;
  roomTypes: RoomTypeResponse[] = [];
  curRoomType!: RoomTypeResponse;

  constructor(
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.room = new Room();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: params => {
        this.roomId = Number(params.get('roomId') ?? 0);

        this.roomTypeService.findAll().subscribe({
          next: (response) => {
            this.roomTypes = response ?? [];
            if (!this.roomId) return;

            this.roomService.findById(this.roomId).subscribe({
              next: response => {
                this.room = response;
                // find room type
                this.curRoomType = this.roomTypes
                  .find(type => type.room_type_id == this.room.roomType.roomTypeId);
              },
              error: (e: HttpErrorResponse) => {
                if (e.status == 404) {
                  this.toastService.error(MessageEnum.MSG_DEFAULT_404);
                  void this.router.navigate(['/reception', 'rooms']);
                  return;
                }

                this.toastService.error(MessageEnum.MSG_ERROR_SERVER);
              }
            });
          },
          error: _ => this.toastService.error(MessageEnum.MSG_ERROR_SERVER)
        });
      }
    });
  }

  compareWith = (roomType: RoomTypeResponse, selectedRoomType: RoomTypeResponse) => {
    return roomType.room_type_id == selectedRoomType.room_type_id;
  }

  onSave(): void {
    if (!this.curRoomType || !this.room.roomCode || !this.room.htlLevel) {
      this.toastService.warning(MessageEnum.MSG_INVALID_FORM);
      return;
    }

    this.roomTypeService.findById(this.curRoomType.room_type_id)
      .subscribe({
        next: (response) => {
          this.room.roomType = response;

          this.roomService.save(this.room).subscribe({
            next: _ => {
              this.toastService.success(MessageEnum.MSG_CHANGES_SAVED)
              void this.router.navigate(['/reception', 'rooms']);
            },
            error: (e: HttpErrorResponse) => {
              this.toastService.error(MessageEnum.MSG_ERROR_SERVER)
            }
          })
        },
        error: _ => this.toastService.error(MessageEnum.MSG_ERROR_SERVER)
      });
  }
}
