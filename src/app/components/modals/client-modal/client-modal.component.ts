import { Component, EventEmitter, Output } from '@angular/core';
import { Actions } from 'src/app/enums/actions.enum';
import { ButtonLoading } from 'src/app/models/button-loading.model';
import { ClientRequest } from 'src/app/models/client.model';

@Component({
  selector: 'app-client-modal',
  templateUrl: './client-modal.component.html',
  styleUrls: ['./client-modal.component.scss']
})
export class ClientModalComponent {
  action: Actions = Actions.CREATE;
  buttonSave: ButtonLoading = new ButtonLoading("btn-success",false,"GUARDAR","fa-save");
  client: ClientRequest = new ClientRequest();
  @Output() close = new EventEmitter<any>();

  saveClient(){
    this.buttonSave.loading = true;
    setTimeout(()=>{
      this.buttonSave.loading = false;
      this.close.emit(this.client);
    },1000);
  }
}
