import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientRequest } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private url = "http://localhost:8080/clients";
  constructor(
    private http:HttpClient
  ) { }

  getClients(){
    return this.http.get(this.url);
  }

  saveClient(newClient:ClientRequest){
    return this.http.post(this.url, newClient);
  }

  getClientAccounts(){
    return this.http.get(this.url + "/accounts");
  }

  getClientAccount(clientId:number){
    return this.http.get(this.url + "/accounts/"+clientId);
  }
}
