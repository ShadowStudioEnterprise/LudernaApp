import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { BookingComponent } from './booking/booking.component';
import { DataBookingComponent } from './data-booking/data-booking.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DataUserBookingComponent } from './data-user-booking/data-user-booking.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ApartmentComponent,
    ApartmentListComponent,
    BookingComponent,
    DataBookingComponent,
    HeaderComponent,
    FooterComponent,
    DataUserBookingComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
