import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MessageEnum } from 'src/app/enums/message.enum';
import { RoomType } from 'src/app/models/room.model';
import { RoomTypeService } from 'src/app/services/room-type.service';

@Component({
  selector: 'app-room-types-crud',
  templateUrl: './room-types-crud.component.html',
  styleUrls: ['./room-types-crud.component.scss']
})
export class RoomTypesCrudComponent implements OnInit {

  roomTypeId!: number;
  roomType!: RoomType;

  constructor(
    private roomTypeService: RoomTypeService,
    private route: ActivatedRoute,
    private router: Router,
    private toastService: ToastrService
  ) {
    this.roomType = new RoomType();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        this.roomTypeId = Number(params.get('roomTypeId') ?? 0);
        if (!this.roomTypeId) {
          void this.router.navigate(['/reception', 'rooms-types']);
          return;
        }

        this.roomTypeService.findById(this.roomTypeId).subscribe({
          next: (response) => {
            this.roomType = response;
          },
          error: (e: HttpErrorResponse) => {
            if (e.status == 404) {
              this.toastService.error(MessageEnum.MSG_DEFAULT_404)
              void this.router.navigate(['/reception', 'rooms-types']);
              return;
            }

            this.toastService.error(MessageEnum.MSG_ERROR_SERVER);
          }
        });
      }
    });
  }

  onSave() {
    if (!this.roomType.roomTypeName || !this.roomType.price || !this.roomType.numberOfBeds) {
      this.toastService.warning(MessageEnum.MSG_INVALID_FORM);
      return;
    }

    this.roomTypeService.update(this.roomType).subscribe({
      next: (response) => {
        this.toastService.success(MessageEnum.MSG_CHANGES_SAVED);
        void this.router.navigate(['/reception', 'rooms-types']);
      },
      error: _ => this.toastService.error(MessageEnum.MSG_ERROR_SERVER)
    });
  }
}
