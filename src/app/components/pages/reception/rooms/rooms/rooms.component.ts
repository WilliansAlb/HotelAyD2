import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MessageEnum } from 'src/app/enums/message.enum';
import { RoomAvailableResponse, RoomResponse, RoomTypeResponse } from 'src/app/models/room.model';
import { SimpleList } from 'src/app/models/simple-list';
import { RoomTypeService } from 'src/app/services/room-type.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent extends SimpleList implements OnInit {
  rooms: any[] = [];
  roomTypes: {[key:number]:any} = {};

  constructor(
    private roomService: RoomService,
    private roomTypeService: RoomTypeService,
    private toastService: ToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getRooms();
    this.getRoomTypes();
  }

  getRoomTypes(){
    this.roomTypeService.findAll().subscribe(
      {
        next: (response:RoomTypeResponse[]) => {
          this.roomTypes[0] = { room_type_id: 0, room_type_name: "Cualquiera"};
          response.forEach((roomType)=>{
            this.roomTypes[roomType.room_type_id] = roomType;
          });
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error(MessageEnum.MSG_ERROR_SERVER);
        }
      });
  }

  getRooms() {
    const startDate = new Date('2020-01-01');
    const endDate = new Date('2025-12-31');
    this.roomService.getRooms().subscribe(
      {
        next: (response:RoomResponse[]) => {
          response.forEach(element => {
            this.rooms.push({
              occupied: (Math.round(Math.random() * 1)) == 0,
              number: element.room_code,
              level: element.htl_level,
              type: element.room_type_id,
              availableDate: this.getRandomDate(startDate, endDate),
              room_id: element.room_id
            });
            this.rooms.sort(this.sortRoomsByAvailability)
            this.pagination.total = this.rooms;
            this.resetPagination(this.pagination);
          });
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error(MessageEnum.MSG_ERROR_SERVER);
        }
      });
  }

  sortRoomsByAvailability(a: RoomAvailableResponse, b: RoomAvailableResponse): number {
    // If one room is occupied and the other is not, the occupied room should come first
    if (a.occupied && !b.occupied) return 1;
    if (!a.occupied && b.occupied) return -1;

    // If both rooms are occupied or both are available, sort by available date
    return b.availableDate.getTime() - a.availableDate.getTime();
  }

  getRandomDate(startDate: Date, endDate: Date): Date {
    const start = startDate.getTime();
    const end = endDate.getTime();
    const randomTime = start + Math.random() * (end - start);
    return new Date(randomTime);
  }
}
