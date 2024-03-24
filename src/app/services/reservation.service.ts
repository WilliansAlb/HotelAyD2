import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReservationRequest } from '../models/reservation.model';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private url = "http://localhost:8080/reservations";

  constructor(
    private http: HttpClient
  ) { }

  getReservations() {
    return this.http.get(this.url);
  }

  saveNewReservation(newReservation:ReservationRequest) {
    return this.http.post(this.url + "/new", newReservation);
  }
}
