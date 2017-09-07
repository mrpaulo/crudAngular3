import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../mapa/mapa';
import { FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { AcessarProvider } from "../../providers/acessar/acessar";

@Component({
  selector: 'page-alerta-detalhado',
  templateUrl: 'alerta-detalhado.html',
  providers: [
    AcessarProvider
  ]
})
export class AlertaDetalhadoPage {
  public alerts: FirebaseListObservable<any>;
  public idAlert: any;
  oneAlert: FirebaseObjectObservable<any>;
  title_alerts: any;

    constructor(
      public navCtrl: NavController, 
      public ap: AcessarProvider,
      public navParams: NavParams    
    ) {
      this.idAlert = this.navParams.get("key");
      this.oneAlert = ap.especificoAlerta(this.idAlert); 
      console.log("Key: " + this.idAlert);
      console.log("AlertaUnico: " + this.oneAlert.$ref);
      console.log("AlertaTitulo: " + this.oneAlert);//("title_alerts")
    }
  goToFotoDoAlerta(params){
    if (!params) params = {};
    this.navCtrl.push(FotoDoAlertaPage);
  }
  goToMapa(params){
    if (!params) params = {};
    this.navCtrl.push(MapaPage);
  }
}
