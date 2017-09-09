import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { NavController } from "ionic-angular";
import { Geolocation } from '@ionic-native/geolocation';

declare var google;

@Injectable()
export class LocalizarProvider {
  public coordenadas: any;
  public latLng: any;

  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation
  ) {
    console.log('Hello LocalizarProvider Provider');
  }
  obterLocal(){
    this.geolocation.getCurrentPosition().then((position) => {
      this.latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      }, 
      (err) => {
           console.log(err);
      }
      );

    this.coordenadas = "-29.639410, -50.787776";
    return this.latLng;
  }
}
