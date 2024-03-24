import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Actions } from 'src/app/enums/actions.enum';
import { ButtonLoading } from 'src/app/models/button-loading.model';
import { ClientRequest, ClientResponse } from 'src/app/models/client.model';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent implements OnInit{
  action: Actions = Actions.CREATE;
  buttonSave: ButtonLoading = new ButtonLoading("btn-success",false,"GUARDAR","fa-save");
  client: ClientRequest = new ClientRequest();
  @Output() close = new EventEmitter<any>();

  constructor(
    private clientService:ClientService,
    private toastService: ToastrService
  ){

  }

  ngOnInit(): void {
      
  }

  saveClient(){
    this.buttonSave.loading = true;
    this.clientService.saveClient(this.client).subscribe({
      next: (response: ClientResponse)=>{
        console.log(response);
        this.toastService.success("Cliente creado correctamente!");
        this.buttonSave.loading = false;
        this.close.emit(this.client);
      },
      error: (error: HttpErrorResponse) => {
        this.buttonSave.loading = false;
        this.toastService.error("Error al obtener las habitaciones");
      }
    })
    setTimeout(()=>{
      this.buttonSave.loading = false;
      this.close.emit(this.client);
    },1000);
  }
}
