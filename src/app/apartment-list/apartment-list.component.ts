import { Component, OnInit } from '@angular/core';
import { Apartments, Location, Info, HouseLayout } from '../apartment';
import apartments from '../../assets/apartments.json';


@Component({
  selector: 'app-apartment-list',
  templateUrl: './apartment-list.component.html',
  styleUrls: ['./apartment-list.component.css']
})
export class ApartmentListComponent implements OnInit {

  apartmentsList!: Apartments[]

  constructor() { }

  ngOnInit(): void {
    this.apartmentsList = apartments;
  }

  getImg(obj: Apartments): string {
    if (typeof obj.id == "string"){
      return apartments[this.getIndex(+obj.id)].media?.gallery[0].size1.src;
    }
    else return "a"
  }
  getIndex(number:number):number{
    for (let i in apartments) {
      if(+apartments[i].id==number){
        return +i;
      }
    }
    return -1;
  }
}
