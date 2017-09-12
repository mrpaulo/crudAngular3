import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

//import { HomePage } from '../pages/home/home';

import { AlertaDetalhadoPage } from '../pages/alerta-detalhado/alerta-detalhado';
import { FotoDoAlertaPage } from '../pages/foto-do-alerta/foto-do-alerta';
import { MapaPage } from '../pages/mapa/mapa';
import { EnviarAlertaPage } from '../pages/enviar-alerta/enviar-alerta';
import { HistRicoAlertaPage } from '../pages/hist-rico-alerta/hist-rico-alerta';
import { ConfiguraEsPage } from '../pages/configura-es/configura-es';
import { LoginPage } from '../pages/login/login';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { SobrePage } from '../pages/sobre/sobre';
import { InCioPage } from '../pages/in-cio/in-cio';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
  rootPage:any = InCioPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //c1463ecb-ec58-4bd8-9705-d54e33c417b8      
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
  goToInCio(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(InCioPage);
  }
  goToAlertaDetalhado(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(AlertaDetalhadoPage);
  }
  goToFotoDoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(FotoDoAlertaPage);
  }
  goToMapa(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(MapaPage);
  }
  goToEnviarAlerta(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(EnviarAlertaPage);
  }
  goToHistRicoAlerta(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(HistRicoAlertaPage);
  }
  goToConfiguraEs(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(ConfiguraEsPage);
  }
  goToLogin(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(LoginPage);
  }
  goToCadastro(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(CadastroPage);
  }
  goToSobre(params) {
    if (!params) params = {};
    this.navCtrl.setRoot(SobrePage);
  }
}

