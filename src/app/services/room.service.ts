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

  findById(roomId) {
    return this.http.get<Room>(`${this.URL}/${roomId}`);
  }

  getRooms() {
    return this.http.get(this.URL);
  }

  getRoomAvailables(startDate, endDate) {
    return this.http.get(this.URL + '/available?startDate=' + startDate + '&endDate=' + endDate);
  }

  save(room: Room) {
    if (room.roomId) return this.http.put(`${this.URL}/${room.roomId}`, room);
    return this.http.post(this.URL, room);
  }
}
