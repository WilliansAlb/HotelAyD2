import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private authService: AuthService
  ){

  }
  
  logout() {
    this.authService.logout();
  }

  saludar() {
    let tiempo = new Date();
    let hora, cad = "son las ";
    hora = tiempo.getHours();
    if (hora < 12)
      cad = "Buenos días ";
    else if (hora < 18)
      cad = "Buenas tardes ";
    else
      cad = "Buenas noches ";
    return cad
  }
}
