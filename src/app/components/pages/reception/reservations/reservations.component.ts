import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReservationRequest } from 'src/app/models/reservation.model';
import { RoomResponse, RoomTypeResponse } from 'src/app/models/room.model';
import { RoomTypeService } from 'src/app/services/room-type.service';
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
  clientModal = false;
  newReservation: ReservationRequest = new ReservationRequest();
  reservationModal = false;

  constructor(
    private roomService: RoomService,
    private roomTypeService: RoomTypeService
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
    this.roomTypeService.findAll().subscribe(
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

  closeClientModal(element){
    console.log(element);
    this.clientModal = false;
  }

  closeReservationModal(element){
    console.log(element);
    this.reservationModal = false;
  }

  createReservation(room: RoomResponse){
    this.newReservation = new ReservationRequest();
    this.newReservation.room_id = room.room_id;
    this.newReservation.reservation_from = this.startDate;
    this.newReservation.reservation_until = this.endDate;
    this.reservationModal = true;
  }
}
