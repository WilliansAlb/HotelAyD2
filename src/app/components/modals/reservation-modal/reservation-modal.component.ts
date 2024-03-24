import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actions } from 'src/app/enums/actions.enum';
import { ButtonLoading } from 'src/app/models/button-loading.model';
import { ClientRequest, ClientResponse } from 'src/app/models/client.model';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';
import { ReservationRequest } from 'src/app/models/reservation.model';
import { RoomResponse, RoomTypeResponse } from 'src/app/models/room.model';
import { ClientService } from 'src/app/services/client.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-reservation-modal',
  templateUrl: './reservation-modal.component.html',
  styleUrls: ['./reservation-modal.component.scss']
})
export class ReservationModalComponent implements OnInit{
  action: Actions = Actions.CREATE;
  @Input() reservation: ReservationRequest = new ReservationRequest();
  buttonPay: ButtonLoading = new ButtonLoading("btn-success",false,"RESERVAR","fa-money-bill-wave");
  @Output() close = new EventEmitter<any>();
  clients: ClientResponse[] = [];
  configuration: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-asterisk",true,false,true,"");
  clientModal = false;
  @Input() roomTypes: { [key: number]: any } = {};
  rooms: { [key: number]: any } = {};
  dataRoom = {
    beds: 0,
    code: "A",
    type: "Junior",
    price: 100.00,
    total: 0,
    min: 0
  }

  constructor(
    private roomService: RoomService,
    private toastService: ToastrService,
    private clientService: ClientService
  ){
  }

  ngOnInit(): void {
    this.getRoomTypes();
    this.getClients();
  }

  getRoomTypes(){
    this.roomService.getRoomTypes().subscribe({
      next: (response: RoomTypeResponse[])=>{
        response.forEach((room)=>{
          this.roomTypes[room.room_type_id] = room;
        });
        this.getRooms();
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error("Error al obtener las habitaciones");
      }
    })
  }

  getClients(){
    this.clientService.getClients().subscribe({
      next: (response: ClientResponse[])=>{
        this.clients = response;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error("Error al obtener las habitaciones");
      }
    })
  }

  getRooms(){
    this.roomService.getRooms().subscribe({
      next: (response: RoomResponse[])=>{
        response.forEach((room)=>{
          this.rooms[room.room_id] = room;
        });
        this.dataRoom.code = this.rooms[this.reservation.room_id].room_code;
        this.dataRoom.type = this.roomTypes[this.rooms[this.reservation.room_id].room_type_id].room_type_name;
        this.dataRoom.beds = this.roomTypes[this.rooms[this.reservation.room_id].room_type_id].number_of_beds;
        this.dataRoom.price = this.roomTypes[this.rooms[this.reservation.room_id].room_type_id].price;
        this.dataRoom.total = this.dataRoom.price * this.countDaysBetweenDates(
          new Date(this.reservation.reservation_from), 
          new Date(this.reservation.reservation_until));
        this.dataRoom.min = this.dataRoom.total * 0.3;
        this.reservation.payment = this.dataRoom.min;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error("Error al obtener las habitaciones");
      }
    })
  }

  countDaysBetweenDates(date1, date2) {
    // Convert both dates to milliseconds
    const date1Ms = date1.getTime();
    const date2Ms = date2.getTime();

    // Calculate the difference in milliseconds
    const timeDifferenceMs = Math.abs(date2Ms - date1Ms);

    // Convert the difference from milliseconds to days
    const daysDifference = Math.ceil(timeDifferenceMs / (1000 * 60 * 60 * 24));

    return daysDifference;
}

  acceptReservation(){

  }

  closeClientModal(client:ClientResponse){
    if (!client){
      console.log("nada");
    } else {
      this.clients.push(client);
      this.configuration = new InputAutocompleteConfiguration("fa-circle-check",true,true,true, client.identification_no+ " "+client.first_name+" "+client.last_name);
    }
    this.clientModal = false;
  }
}
