import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private url = "http://localhost:8080/rooms";
  constructor(
    private http: HttpClient
  ) { }

    getRooms(){
      return this.http.get(this.url);
    }

    getRoomTypes(){
      return this.http.get(this.url+ "/types");
    }

    getRoomAvailables(startDate, endDate){
      return this.http.get(this.url + "/available?startDate="+startDate+"&endDate="+endDate);
    }
}
