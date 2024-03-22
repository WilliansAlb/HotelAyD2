import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Room } from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private URL = `${environment.HTL_BACKEND_URL}/rooms`;

  constructor(private http: HttpClient) {
  }

  getRooms() {
    return this.http.get(this.URL);
  }

  getRoomTypes() {
    return this.http.get(this.URL + '/types');
  }

  getRoomAvailables(startDate, endDate) {
    return this.http.get(this.URL + '/available?startDate=' + startDate + '&endDate=' + endDate);
  }

  save(room: Room) {
    if (room.roomId) return this.http.put(`${this.URL}/${room.roomId}`, room);
    return this.http.post(this.URL, room);
  }
}
