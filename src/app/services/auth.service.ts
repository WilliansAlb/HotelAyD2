import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "http://localhost:8080/auth";

  constructor(
    private http: HttpClient
  ) { }

  login(data: AuthRequest) {
    return this.http.post(this.url, data);
  }

  setToken(token: string) {
    localStorage.setItem("jwt", token);
  }

  logout(){
    localStorage.clear();
  }
}
