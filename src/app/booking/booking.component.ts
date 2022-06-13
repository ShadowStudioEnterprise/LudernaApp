import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';
import apartments from '../../assets/apartments.json';
import moment from 'moment';
import { Booking, DataBooking, DataPlaceBooking, DataUserBooking } from '../booking';
import { BookingService } from '../booking.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})


export class BookingComponent implements OnInit {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'my-auth-token'
    })
  };

  dataBookings!: DataBooking;
  dataUserBookings!: DataUserBooking;
  booking!: Booking;
  max_guests: number = 0;
  apartmentId: number = -1;
  constructor(private route: ActivatedRoute, private bookingService: BookingService, private router: Router) { }
  name: string = "";
  town: string = "";
  location: string = "";

  addItem(dataBooking: DataBooking) {
    this.dataBookings = dataBooking;
  }

  addUserData(userData: DataUserBooking) {
    this.dataUserBookings = userData;
  }
  onSubmit(): void {
    if (this.dataBookings && this.dataUserBookings) {
      if (this.validate(this.max_guests, this.dataBookings)&& this.validateDates(this.apartmentId, this.dataBookings)) {
        let place = new DataPlaceBooking(this.name, this.town, this.location)
        this.booking = new Booking(this.dataUserBookings, this.dataBookings, place, this.calculatePrices(this.apartmentId, this.dataBookings));
        this.bookingService.setBooking(this.booking);
        this.router.navigate(['/payments']);
      }else{
        if(this.validate(this.max_guests, this.dataBookings)){
            alert("Maximo permitido sobrepasado")
        }
        if (this.validateDates(this.apartmentId, this.dataBookings)) {
          alert("Algun dia no esta disponible")
        }
      }
    }
    else {
      alert("faltan datos")
    }

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const apartmentParam = Number(routeParams.get('id'));
    if (this.getIndex(apartmentParam) != -1) this.apartmentId = this.getIndex(apartmentParam);
    this.max_guests = apartments[this.apartmentId].booking_data.max_guests;
    this.name = apartments[this.apartmentId].name;
    this.town = apartments[this.apartmentId].location.town;
    this.location = apartments[this.apartmentId].location.map.lat + "," + apartments[this.apartmentId].location.map.lng;
  }
  getIndex(number: number): number {
    for (let i in apartments) {
      if (+apartments[i].id == number) {
        return +i;
      }
    }
    return -1;
  }
  validate(max: number, data: DataBooking): boolean {
    if (max > data.adults + data.children) return true
    else return false

  }
  validateDates(id: number, data: DataBooking): boolean {
    const start = new Date(data.dayStart);
    const end = new Date(data.dayEnd);
    let keys = Object.entries(apartments[id].booking_data.daily_breakdown);
    let loop = new Date(start);
    while (loop <= end) {
      let str: string = "" + moment(loop).format('YYYY-MM-DD');
      for (let key of keys) {
        if (key[0] == str)
          if (key[1].available == false) return false
      }
      loop.setDate(loop.getDate() + 1);
    }
    return true;
  }
  calculatePrices(id: number, data: DataBooking): number {
    const start = new Date(data.dayStart);
    const end = new Date(data.dayEnd);
    let keys = Object.entries(apartments[id].booking_data.daily_breakdown);
    let loop = new Date(start);
    let prizeAcc = apartments[id].booking_data.cleaning_fee;
    let countNight = 0;
    while (loop <= end) {
      let str: string = "" + moment(new Date(loop)).format('YYYY-MM-DD');
      for (let key of keys) {
        if (key[0] == str) {
          prizeAcc += key[1].night_price;
          countNight++;
        }
      }
      loop.setDate(loop.getDate() + 1);
    }
    let tax = 0;
    if (countNight > 7 && countNight < 30) tax = 7
    else if (countNight > 30) tax = 0
    else tax = countNight
    prizeAcc += data.adults + tax;
    return prizeAcc;
  }
}
