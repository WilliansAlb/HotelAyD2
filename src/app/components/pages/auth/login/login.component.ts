import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest, AuthResponse } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  waitLogin = false;
  newLogin: AuthRequest = new AuthRequest();
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastrService
  ) {
  }

  login() {
    this.loading = true;
    this.authService.login(this.newLogin).subscribe({
      next: (response: AuthResponse) => {
        console.log(response.token);
        this.authService.setToken(response.token);
        void this.router.navigate(['']);
        this.loading = false;
      },
      error: (error: HttpErrorResponse) => {
        this.toastService.error("Credenciales invalidas");
        this.loading = false;
      }
    })
  }
}
