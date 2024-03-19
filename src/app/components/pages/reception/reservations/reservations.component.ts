import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RoomResponse, RoomTypeResponse } from 'src/app/models/room.model';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  roomTypes: { [key: number]: any } = {};
  startDate = "";
  endDate = "";
  rooms: RoomResponse[] = [];
  pagination = {
    total: [],
    filter: [],
    pageSize: 5,
    startElement: 0,
    lastElement: 0,
    pageIndex: 0
  };
  roomType = 0;


  constructor(
    private roomService: RoomService
  ) {

    var today = new Date();
    this.startDate = (today).toISOString().split("T")[0];
    today.setDate(today.getDate() + 1);
    this.endDate = (today).toISOString().split("T")[0];
  }

  ngOnInit(): void {
    this.getRoomTypes();
  }

  getRoomTypes() {
    this.roomService.getRoomTypes().subscribe(
      {
        next: (response: RoomTypeResponse[]) => {
          this.roomTypes[0] = { room_type_id: 0, room_type_name: "Cualquiera" };
          response.forEach((roomType) => {
            this.roomTypes[roomType.room_type_id] = roomType;
          });
          this.getRoomsAvailable();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  getRoomsAvailable() {
    this.roomService.getRoomAvailables(this.startDate, this.endDate).subscribe(
      {
        next: (response: RoomResponse[]) => {
          this.rooms = response;
          this.filterRooms();
        },
        error: (error: HttpErrorResponse) => {
          console.log(error);
        }
      });
  }

  filterRooms(){
    this.pagination.total = this.rooms;
    if (this.roomType!=0){
      this.pagination.total = this.rooms.filter((room) =>{
        return room.room_type_id == this.roomType;
      });
    }
    this.resetPagination(this.pagination);
  }

  resetPagination(paginationTemp) {
    paginationTemp.startElement = 0;
    paginationTemp.pageIndex = 0;
    paginationTemp.lastElement = paginationTemp.pageSize;
    paginationTemp.filter = paginationTemp.total.slice(paginationTemp.startElement, paginationTemp.lastElement);
    paginationTemp.lastElement = paginationTemp.filter.length;
  }
}
