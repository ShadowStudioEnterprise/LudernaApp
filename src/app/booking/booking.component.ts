import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import apartments from '../../assets/apartments.json';
import moment from 'moment';
import { DataBooking, DataUserBooking } from '../booking';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {

  dataBookings!: DataBooking;
  dataUserBookings!: DataUserBooking;
  max_guests: number = 0;
  apartmentId: number = -1;
  constructor(private route: ActivatedRoute,) { }
  name: string ="";
  town: string ="";
  location:string ="";

  addItem(dataBooking: DataBooking) {
    this.dataBookings = dataBooking;
    console.log(this.calculatePrices(this.apartmentId, this.dataBookings))
  }

  addUserData(userData: DataUserBooking){
    this.dataUserBookings = userData;
  }
  onSubmit():void{

  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const apartmentParam = Number(routeParams.get('id'));
    if (this.getIndex(apartmentParam) != -1) this.apartmentId = this.getIndex(apartmentParam);
    this.max_guests = apartments[this.apartmentId].booking_data.max_guests;
    this.name = apartments[this.apartmentId].name;
    this.town = apartments[this.apartmentId].location.town;
    this.location = apartments[this.apartmentId].location.map.lat +","+apartments[this.apartmentId].location.map.lng;
    console.log(apartments[this.apartmentId].booking_data.cleaning_fee)
    // console.log(apartments[apartmentId].booking_data.daily_breakdown["2022-06-01"].available)

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
    if (max > data.adults + data.children) return false
    else {
      return true
    }
  }
  validateDates(id: number, data: DataBooking): boolean {
    const start = new Date(data.dayStart);
    const end = new Date(data.dayEnd);
    let keys = Object.entries(apartments[id].booking_data.daily_breakdown);
    let loop = new Date(start);
    while (loop <= end) {
      console.log(loop);
      let newDate = loop.setDate(loop.getDate() + 1);
      let str: string = "" + moment(new Date(newDate)).format('YYYY-MM-DD');
      for (let key of keys) {
        if (key[0] == str)
          if (key[1].available == false) return false
      }
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
      console.log(loop);

      let str: string = "" + moment(new Date(loop)).format('YYYY-MM-DD');
      for (let key of keys) {
        if (key[0] == str) {
          console.log(key[1].night_price);
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
