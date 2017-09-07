import { Component } from '@angular/core';
import { NavController, AlertController, ActionSheetController } from 'ionic-angular';

import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  alerts: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    af: AngularFireDatabase, 
    public actionSheetCtrl: ActionSheetController
  ) {
      this.alerts = af.list('/alertList');
  }

  addSong(){
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
              type_alert: 1,
              title_alert: data.title_alert,
              last_description: "Ultima descrição do trem",
              penultimate_description: "Penultimo do trem",
              antepenultimate_description: "Ante Penultimo",
              date_hour: "10/05/2017 - 21:00 h",
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

  // removeSong(songId: string){
  //   this.songs.remove(songId);
  // }

  // updateSong(songId, songTitle){
  //   let prompt = this.alertCtrl.create({
  //     title: 'Song Name',
  //     message: "Update the name for this song",
  //     inputs: [
  //       {
  //         name: 'title',
  //         placeholder: 'Title',
  //         value: songTitle
  //       },
  //     ],
  //     buttons: [
  //       {
  //         text: 'Cancel',
  //         handler: data => {
  //           console.log('Cancel clicked');
  //         }
  //       },
  //       {
  //         text: 'Save',
  //         handler: data => {
  //           this.songs.update(songId, {
  //             title: data.title
  //           });
  //         }
  //       }
  //     ]
  //   });
  //   prompt.present();
  // }

  // showOptions(songId, songTitle) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: 'What do you want to do?',
  //     buttons: [
  //       {
  //         text: 'Delete Song',
  //         role: 'destructive',
  //         handler: () => {
  //           this.removeSong(songId);
  //         }
  //       },{
  //         text: 'Update title',
  //         handler: () => {
  //           this.updateSong(songId, songTitle);
  //         }
  //       },{
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }

}