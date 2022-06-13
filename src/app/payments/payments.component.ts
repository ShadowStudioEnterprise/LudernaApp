import { Component, OnInit } from '@angular/core';
import { faPhone, faCreditCard, faWallet } from '@fortawesome/free-solid-svg-icons';
import { faPaypal } from '@fortawesome/free-brands-svg-icons';
import { BookingService } from '../booking.service';
import { DataBooking, DataUserBooking, DataPlaceBooking, Booking } from '../booking';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css']
})
export class PaymentsComponent implements OnInit {

  faPhone = faPhone;
  faPayPal = faPaypal;
  faCreditCard = faCreditCard;
  faWallet = faWallet;
  booking!: Booking;
  dataUser!: DataUserBooking;
  dataBooking!: DataBooking;
  placeBoking!: DataPlaceBooking;
  prize: Number = 0;
  checked = false;

  constructor(private bookingService: BookingService, private router: Router) { }

  ngOnInit(): void {
    this.bookingService.selectedBooding$.subscribe((value) => {
      this.booking = value;
      this.dataBooking = this.booking.data;
      this.dataUser = this.booking.dataUser;
      this.placeBoking = this.booking.place;
      this.prize = this.booking.prize;
    });
  }
  end(): void {
    if (this.checked) {
      this.router.navigate(['/thanks']);
    }
  }
  hasChecked(){
    console.log(this.checked)
    this.checked=true;
  }
}
