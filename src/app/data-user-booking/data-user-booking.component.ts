import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataUserBooking } from '../booking';
import moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';



@Component({
  selector: 'app-data-user-booking',
  templateUrl: './data-user-booking.component.html',
  styleUrls: ['./data-user-booking.component.css']
})
export class DataUserBookingComponent implements OnInit {
  model: DataUserBooking = new DataUserBooking("", "", "", 0);
  submitted = false;
  formDataUserBooking = new FormGroup({
    name: new FormControl(''),
    surname: new FormControl(''),
    email: new FormControl(''),
    phone: new FormControl(0),
  });
/*   datos!: string;
 */ datos!:DataUserBooking
  @Output() newItemEvent = new EventEmitter<DataUserBooking>();

  onSubmit() {
    this.submitted = true;
    /* this.datos = `name=${this.formDataUserBooking.value.name},
                surname=${this.formDataUserBooking.value.surname},
                email=${this.formDataUserBooking.value.email},
                phone=${this.formDataUserBooking.value.phone}
                `; */
    this.datos = new DataUserBooking(`${this.formDataUserBooking.value.name}`,`${this.formDataUserBooking.value.surname}`,`${this.formDataUserBooking.value.email}`,+`${this.formDataUserBooking.value.phone}`);
    this.addNewItem();
  }
  constructor() { }

  ngOnInit(): void {
  }
  addNewItem() {
    this.newItemEvent.emit(this.datos);
  }

}
