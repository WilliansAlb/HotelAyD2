import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReceptionComponent } from './components/pages/reception/reception.component';
import { ReservationsComponent } from './components/pages/reception/reservations/reservations.component';
import { RoomsComponent } from './components/pages/reception/rooms/rooms.component';

const routes: Routes = [
  { path: '', redirectTo: 'reception/reservations', pathMatch: 'full' },
  {
    path: 'reception', component: ReceptionComponent,
    children: [
      { path: 'reservations', data: { breadcrumb: 'Reservaciones' }, component: ReservationsComponent },
      { path: 'rooms', data: { breadcrumb: 'Habitaciones' }, component: RoomsComponent }
    ]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
