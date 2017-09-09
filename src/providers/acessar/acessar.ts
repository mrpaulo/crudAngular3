import { Injectable, Pipe } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';

import * as _ from 'lodash';

@Injectable()
export class AcessarProvider {

  // constructor(public http: Http) {
  //   console.log('Hello AcessarProvider Provider');
  // }
  alerts: FirebaseListObservable<any>;
  oneAlert: FirebaseObjectObservable<any>;
  urlPhoto: any;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public af: AngularFireDatabase,
    public actionSheetCtrl: ActionSheetController
  ) {
    //this.alerts = af.list('/alertList');
  }

  especificoAlerta(alertID) {
    return this.oneAlert = this.af.object('/alertList/'+alertID);
  }

  ultimoAlerta() {
    return this.alerts = this.af.list('/alertList',{
      query: {
        limitToLast: 1
      }
    });
  }
  
  listarAlertas() {
    return this.alerts = this.af.list('/alertList',{
      query: {
        limitToLast: 30
      }
    });   
      
  }

  obterPhoto(){
    this.urlPhoto = "http://res.cloudinary.com/dht8hrgql/image/upload/v1499814594/ImagensAlertas/3.jpg";
    return this.urlPhoto;
  }  

  addSong() {
    let prompt = this.alertCtrl.create({
      title: 'Song Name',
      message: "Enter a name for this new song you're so keen on adding",
      inputs: [
        {
          name: 'title_alert',
          placeholder: 'Title',

        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Save',
          handler: data => {
            this.alerts.push({
              id: 1,
              type_alert: 1,
              title_alert: data.title_alert,
              last_description: "Moradores deixar suas casas",
              penultimate_description: "Penultimo",
              antepenultimate_description: "Ante Penultimo",
              date_hour: "10/05/2017 - 20:00 h",
              url_img: "img/thumbnailVermelho.jpg",
              url_photo: "http://res.cloudinary.com/dht8hrgql/image/upload/v1499814594/ImagensAlertas/3.jpg",
              local_alert: "-29.639410, -50.787776"
            });
          }
        }
      ]
    });
    prompt.present();
  }

}
