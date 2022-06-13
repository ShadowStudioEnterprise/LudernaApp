import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';


import { BehaviorSubject } from 'rxjs';
import { Booking } from './booking';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private booking$ = new BehaviorSubject<any>({});
  selectedBooding$ = this.booking$.asObservable();


  constructor() { }

  setBooking(booking: Booking) {
    this.booking$.next(booking);
  }
}
