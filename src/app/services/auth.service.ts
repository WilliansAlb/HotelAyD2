import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthRequest } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = `${environment.HTL_BACKEND_URL}/auth`;

  constructor(private http: HttpClient) {
  }

  login(data: AuthRequest) {
    return this.http.post(this.url, data);
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  logout() {
    localStorage.clear();
  }
}
