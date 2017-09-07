import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FotoDoAlertaPage } from '../foto-do-alerta/foto-do-alerta';

@Component({
  selector: 'page-mapa',
  templateUrl: 'mapa.html'
})
export class MapaPage {

  constructor(public navCtrl: NavController) {
  }
  goToFotoDoAlerta(params){
    if (!params) params = {};
    this.navCtrl.push(FotoDoAlertaPage);
  }
}
