import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataBooking } from '../booking';
import moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';


@Component({
  selector: 'app-data-booking',
  templateUrl: './data-booking.component.html',
  styleUrls: ['./data-booking.component.css']
})
export class DataBookingComponent implements OnInit {
  today = moment().format('YYYY-MM-DD');
  model: DataBooking = new DataBooking(this.today, this.today, 1, 0);
  submitted = false;
  formDataBooking = new FormGroup({
    dayStart: new FormControl(''),
    dayEnd: new FormControl(''),
    adults: new FormControl(1),
    children: new FormControl(0),
  });
/*   datos!: string;
 */ datos!:DataBooking
  @Output() newItemEvent = new EventEmitter<DataBooking>();

  onSubmit() {
    /* this.datos = `dayStart=${this.formDataBooking.value.dayStart},
                dayEnd=${this.formDataBooking.value.dayEnd},
                adults=${this.formDataBooking.value.adults},
                children=${this.formDataBooking.value.children}
                `; */
    this.datos = new DataBooking(`${this.formDataBooking.value.dayStart}`,`${this.formDataBooking.value.dayEnd}`,+`${this.formDataBooking.value.adults}`,+`${this.formDataBooking.value.children}`);
    this.addUserData();
  }
  constructor() { }

  ngOnInit(): void {
  }
  addUserData() {
    this.newItemEvent.emit(this.datos);
  }
}
