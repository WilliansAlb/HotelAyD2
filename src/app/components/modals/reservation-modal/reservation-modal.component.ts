import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actions } from 'src/app/enums/actions.enum';
import { ButtonLoading } from 'src/app/models/button-loading.model';
import { ClientRequest } from 'src/app/models/client.model';
import { InputAutocompleteConfiguration } from 'src/app/models/input-autocomplete.model';
import { ReservationRequest } from 'src/app/models/reservation.model';
import { RoomResponse, RoomTypeResponse } from 'src/app/models/room.model';
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
  clients: ClientRequest[] = [];
  configuration: InputAutocompleteConfiguration = new InputAutocompleteConfiguration("fa-asterisk",true,false,true,"");
  clientModal = false;
  @Input() roomTypes: { [key: number]: any } = {};
  rooms: { [key: number]: any } = {};
  dataRoom = {
    beds: 0,
    code: "A",
    type: "Junior",
    price: 100.00
  }

  constructor(
    private roomService: RoomService,
    private toastService: ToastrService
  ){
    for (let i = 0; i < 10; i++) {
      var temp = new ClientRequest();
      temp.email = "email"+i+"@gmail.com";
      temp.first_name = "primer nombre "+i;
      temp.identification_no = "283204"+i+"8181007";
      temp.last_name = "apellido "+i;
      temp.middle_name = "segundo nombre "+i;
      temp.phone_number = "3498"+i+"0838";
      this.clients.push(temp);
    }
  }

  ngOnInit(): void {
    this.getRoomTypes();
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
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error("Error al obtener las habitaciones");
      }
    })
  }

  acceptReservation(){

  }

  closeClientModal(client:ClientRequest){
    if (!client){
      console.log("nada");
    } else {
      this.clients.push(client);
      this.configuration = new InputAutocompleteConfiguration("fa-circle-check",true,true,true, client.identification_no+ " "+client.first_name+" "+client.last_name);
    }
    this.clientModal = false;
  }
}
