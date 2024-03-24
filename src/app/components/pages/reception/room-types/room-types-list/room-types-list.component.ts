import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageEnum } from 'src/app/enums/message.enum';
import { RoomTypeResponse } from 'src/app/models/room.model';
import { SimpleList } from 'src/app/models/simple-list';
import { RoomTypeService } from 'src/app/services/room-type.service';

@Component({
  selector: 'app-room-types-list',
  templateUrl: './room-types-list.component.html',
  styleUrls: ['./room-types-list.component.scss']
})
export class RoomTypesListComponent extends SimpleList implements OnInit {
  roomTypes: RoomTypeResponse[] = [];

  constructor(
    private roomTypeService: RoomTypeService,
    private toastService: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.roomTypeService.findAll()
      .subscribe({
        next: (response) => {
          this.roomTypes = response;
          this.pagination.total = this.roomTypes;
          this.resetPagination(this.pagination);
        },
        error: _ => this.toastService.error(MessageEnum.MSG_ERROR_SERVER)
      });
  }
}
