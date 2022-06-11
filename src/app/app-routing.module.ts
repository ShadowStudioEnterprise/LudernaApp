import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApartmentListComponent } from './apartment-list/apartment-list.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { BookingComponent } from './booking/booking.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [{ path: '', component: HomeComponent },{ path: 'apartments', component: ApartmentListComponent }, { path: 'apartments/:id', component: ApartmentComponent },  { path: 'apartments/:id/reserva', component: BookingComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
