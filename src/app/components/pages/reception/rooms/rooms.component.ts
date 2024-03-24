import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RoomAvailableResponse, RoomResponse, RoomTypeResponse } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss']
})
export class RoomsComponent implements OnInit {
  rooms: any[] = [];
  pagination = {
    total: [],
    filter: [],
    pageSize: 5,
    startElement: 0,
    lastElement: 0,
    pageIndex: 0
  };
  roomTypes: {[key:number]:any} = {};

  constructor(
    private roomService: RoomService,
    private toastService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this.getRooms();
    this.getRoomTypes();
  }

  getRoomTypes(){
    this.roomService.getRoomTypes().subscribe(
      {
        next: (response:RoomTypeResponse[]) => {
          this.roomTypes[0] = { room_type_id: 0, room_type_name: "Cualquiera"};
          response.forEach((roomType)=>{
            this.roomTypes[roomType.room_type_id] = roomType;
          });
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error("Error al obtener los tipos de habitaciones");
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
              availableDate: this.getRandomDate(startDate, endDate)
            });
            this.rooms.sort(this.sortRoomsByAvailability)
            this.pagination.total = this.rooms;
            this.resetPagination(this.pagination);
          });
        },
        error: (error: HttpErrorResponse) => {
          this.toastService.error("Error al obtener las habitaciones");
        }
      });
  }

  resetPagination(paginationTemp) {
    paginationTemp.startElement = 0;
    paginationTemp.pageIndex = 0;
    paginationTemp.lastElement = paginationTemp.pageSize;
    paginationTemp.filter = paginationTemp.total.slice(paginationTemp.startElement, paginationTemp.lastElement);
    paginationTemp.lastElement = paginationTemp.filter.length;
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
