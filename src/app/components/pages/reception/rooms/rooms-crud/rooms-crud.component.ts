import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Room, RoomTypeResponse } from 'src/app/models/room.model';
import { RoomTypeService } from 'src/app/services/room-type.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms-crud',
  templateUrl: './rooms-crud.component.html',
  styleUrls: ['./rooms-crud.component.scss']
})
export class RoomsCrudComponent implements OnInit {

  roomTypes: RoomTypeResponse[] = [];
  curRoomType!: RoomTypeResponse;
  room: Room;

  constructor(
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.room = new Room();
  }

  ngOnInit(): void {
    this.roomTypeService.findAll().subscribe({
      next: (response) => {
        this.roomTypes = response ?? [];
      },
      error: _ => window.alert('Something went wrong')
    });
  }

  compareWith = (roomType: RoomTypeResponse, selectedRoomType: RoomTypeResponse) => {
    return roomType.room_type_id == selectedRoomType.room_type_id;
  }

  onSave() {
    if (!this.curRoomType || !this.room.roomCode || !this.room.htlLevel) {
      return window.alert('formulario invalido');
    }

    this.roomTypeService.findById(this.curRoomType.room_type_id)
      .subscribe({
        next: (response) => {
          this.room.roomType = response;

          this.roomService.save(this.room).subscribe({
            next: _ => {
              window.alert('Cambios guardados con éxito');
              void this.router.navigate(['/reception', 'rooms']);
            },
            error: (e: HttpErrorResponse) => {
              console.error(e);
            }
          })
        },
        error: _ => window.alert("error en el servidor, intente mas tarde")
      });
  }
}
