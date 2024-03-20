import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './components/pages/reception/reception.component';
import { ReservationsComponent } from './components/pages/reception/reservations/reservations.component';
import { RoomsComponent } from './components/pages/reception/rooms/rooms.component';
import { authGuard } from './security/auth.guard';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { AuthComponent } from './components/pages/auth/auth.component';

const routes: Routes = [
  { path: '', redirectTo: 'reception/reservations', pathMatch: 'full' },
  {
    path: 'reception', component: ReceptionComponent,
    canActivate: [authGuard],
    children: [
      { path: 'reservations', data: { breadcrumb: 'Reservaciones' }, component: ReservationsComponent },
      { path: 'rooms', data: { breadcrumb: 'Habitaciones' }, component: RoomsComponent }
    ]
  },
  {
    path: 'auth', component: AuthComponent,
    children: [
      { path: 'login', data: { breadcrumb: 'Login' }, component: LoginComponent },
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
