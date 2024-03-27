import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {
  RoomTypesCrudComponent
} from 'src/app/components/pages/reception/room-types/room-types-crud/room-types-crud.component';
import {
  RoomTypesListComponent
} from 'src/app/components/pages/reception/room-types/room-types-list/room-types-list.component';
import { RoomsCrudComponent } from 'src/app/components/pages/reception/rooms/rooms-crud/rooms-crud.component';
import { FoodCrudComponent } from 'src/app/components/pages/restaurant/food/food-crud/food-crud.component';
import { FoodListComponent } from 'src/app/components/pages/restaurant/food/food-list/food-list.component';
import {
  RestaurantDashboardComponent
} from 'src/app/components/pages/restaurant/restaurant-dashboard/restaurant-dashboard.component';
import { ReceptionComponent } from './components/pages/reception/reception.component';
import { ReservationsComponent } from './components/pages/reception/reservations/reservations.component';
import { RoomsComponent } from 'src/app/components/pages/reception/rooms/rooms/rooms.component';
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
      { path: 'rooms/create', data: { breadcrumb: 'Agregar habitación' }, component: RoomsCrudComponent },
      { path: 'rooms/edit/:roomId', data: { breadcrumb: 'Editar habitación' }, component: RoomsCrudComponent },
      { path: 'rooms-types', data: { breadcrumb: 'Tipos de habitaciones' }, component: RoomTypesListComponent },
      { path: `rooms-types/edit/:roomTypeId`, data: { breadcrumb: 'Tipos de habitaciones' }, component: RoomTypesCrudComponent },
    ]
  },
  {
    path: 'restaurant',
    canActivate: [authGuard],
    children: [
      { path: '', data: { breadcrumb: 'Restaurante' }, component: RestaurantDashboardComponent },
      { path: 'food', data: { breadcrumb: 'Comida' }, component: FoodListComponent },
      { path: 'food/create', data: { breadcrumb: 'Agregar comida' }, component: FoodCrudComponent },
      { path: 'food/edit/:foodId', data: { breadcrumb: 'Editar comida' }, component: FoodCrudComponent }
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
