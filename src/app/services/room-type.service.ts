import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomType, RoomTypeResponse } from 'src/app/models/room.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomTypeService {

  private URL = `${environment.HTL_BACKEND_URL}/room-types`;

  constructor(private http: HttpClient) {
  }

  findById(roomTypeId: number) {
    return this.http.get<RoomType>(`${this.URL}/${roomTypeId}`);
  }

  findAll() {
    return this.http.get<RoomTypeResponse[]>(this.URL);
  }

  update(roomType: RoomType) {
    return this.http.put(`${this.URL}/${roomType.roomTypeId}`, roomType);
  }
}
