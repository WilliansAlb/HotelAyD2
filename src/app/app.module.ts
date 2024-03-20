import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './components/layouts/sidebar/sidebar.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './components/layouts/header/header.component';
import { ReceptionComponent } from './components/pages/reception/reception.component';
import { ReservationsComponent } from './components/pages/reception/reservations/reservations.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
import { RoomsComponent } from './components/pages/reception/rooms/rooms.component';
import { PaginationComponent } from './components/elements/pagination/pagination.component';
import { FormsModule } from '@angular/forms';
import { AuthInterceptor } from './security/auth.interceptor';
import { LoginComponent } from './components/pages/auth/login/login.component';
import { AuthComponent } from './components/pages/auth/auth.component';
import { ToastrModule } from 'ngx-toastr';
import { RoomTypesListComponent } from './components/pages/reception/room-types/room-types-list/room-types-list.component';
import { RoomTypesCrudComponent } from './components/pages/reception/room-types/room-types-crud/room-types-crud.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    ReceptionComponent,
    ReservationsComponent,
    FooterComponent,
    RoomsComponent,
    PaginationComponent,
    LoginComponent,
    AuthComponent,
    RoomTypesListComponent,
    RoomTypesCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot()
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
