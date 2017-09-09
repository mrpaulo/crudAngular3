import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LocalizarProvider } from "../../providers/localizar/localizar";
import { AcessarProvider } from "../../providers/acessar/acessar";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";

import { FormBuilder, FormGroup } from "@angular/forms";
import { InCioPage } from '../in-cio/in-cio';

@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
  providers: [
    AcessarProvider,
    LocalizarProvider
  ]
})
export class CadastroPage {
  user: FirebaseListObservable<any>;
  local: any;
  form : FormGroup;
  
  constructor(public navCtrl: NavController,
    public ap: AcessarProvider,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public lp: LocalizarProvider,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController
  ) {   
    this.form = this.formBuilder.group({
      name: [''],
      cellphone: [''],
      email: [''],
      password: ['']
    }); 
  }  

  cadastrar(){
    this.local = this.lp.obterLocal();
    this.user = this.af.list('/userList');
    this.user.push({
      name: this.form.value.name,
      cellphone: this.form.value.cellphone,
      email: this.form.value.email,
      password: this.form.value.password,//depois de instalar o "md5" Md5.hashStr(password)
      local: this.local,
      type_user: 1
    })
         
    let prompt = this.alertCtrl.create({
      title: 'Syspush diz:',
      message: "Cadastro realizado com sucesso!",
      buttons: [{text: 'Ok'}]
    });
    prompt.present();
    this.navCtrl.push(InCioPage);
  }  
}
