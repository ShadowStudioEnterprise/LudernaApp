import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import apartments from '../../assets/apartments.json';
import { Apartments, Location, Info, HouseLayout} from '../apartment';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-apartment',
  templateUrl: './apartment.component.html',
  styleUrls: ['./apartment.component.css']
})
export class ApartmentComponent implements OnInit {

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) { }
  apartment: Apartments = {};
  video: SafeUrl = "";
  location: Location = {};
  info: Info = {};
  houseLayout: HouseLayout = {};
  gallery: string[] =[""];
  locationCoord: string = "";

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const apartmentParam = Number(routeParams.get('id'));
    let apartmentId:number=-1;
    if(this.getIndex(apartmentParam)!=-1) apartmentId =this.getIndex(apartmentParam);


    this.apartment = apartments[apartmentId];
    this.location = apartments[apartmentId].location;
    this.info = apartments[apartmentId].info;
    this.houseLayout = apartments[apartmentId].house_layout;
    this.gallery = this.arrayGaleria(apartmentId,3);
    this.video=this.sanitizer.bypassSecurityTrustResourceUrl(apartments[apartmentId].media.video);
    this.locationCoord = apartments[apartmentId].location.map.lat +","+apartments[apartmentId].location.map.lng
  }
  arrayGaleria(id:number, size:number):string[]{
    let str= [];
    for (let iterator of apartments[id].media.gallery) {
      if(size==1)
        str.push(iterator.size1.src);
      else if (size==2) {
        str.push(iterator.size2.src);
      }else if (size==3){
        str.push(iterator.size3.src);
      }
    }
    return str;
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
