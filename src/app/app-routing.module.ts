import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RoomTypesCrudComponent
} from 'src/app/components/pages/reception/room-types/room-types-crud/room-types-crud.component';
import {
  RoomTypesListComponent
} from 'src/app/components/pages/reception/room-types/room-types-list/room-types-list.component';
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
      { path: 'rooms', data: { breadcrumb: 'Habitaciones' }, component: RoomsComponent },
      { path: 'rooms-types', data: { breadcrumb: 'Tipos de habitaciones' }, component: RoomTypesListComponent },
      { path: `rooms-types/:roomTypeId`, data: { breadcrumb: 'Tipos de habitaciones' }, component: RoomTypesCrudComponent },
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
