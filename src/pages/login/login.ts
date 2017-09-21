import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { CadastroPage } from '../cadastro/cadastro';
import { FirebaseListObservable, AngularFireDatabase } from "angularfire2/database";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AcessarProvider } from "../../providers/acessar/acessar";
import { LocalizarProvider } from "../../providers/localizar/localizar";
import { AuthProvider } from '../../providers/auth/auth';
import { AngularFireAuth } from "angularfire2/auth";
import { InCioPage } from "../in-cio/in-cio";
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [
    AcessarProvider,
    LocalizarProvider,
    AuthProvider,
    AngularFireAuth
  ]
})
export class LoginPage {
  user: FirebaseListObservable<any>;
  form: FormGroup;
  hasError: boolean;
  errorMessage: string;
  flag = true;// se falso aparece a informação
  nome = "Paulo";
  tipo: string;
  usuario: any;

  constructor(public navCtrl: NavController,
    public ap: AcessarProvider,
    public navParams: NavParams,
    public af: AngularFireDatabase,
    public lp: LocalizarProvider,
    private formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private loadingCtrl: LoadingController,
    private auth: AuthProvider
  ) {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });

    firebase.auth().onAuthStateChanged(function (logadoObs) {
      if (logadoObs) {
       // this.verificaUser();
       console.log("usuário logado no observable!");
      } else {
        console.log("Sem usuário logado no observable!");
      }
    });
    this.verificaUser();
  }

  verificaUser() {    
        console.log("usuário logado!");
        this.usuario = firebase.auth().currentUser;
        
        if (this.usuario) {
          this.nome = this.usuario.name;
          this.tipo = this.usuario.email;
          this.flag = false;
          console.log("Nome: " + this.nome);
        } else {
          console.log("Sem usuário logado!");
        }    
  }

  sair() {
    firebase.auth().signOut().then(function () {
      console.log("Saiu com sucesso!");
    }).catch(function (error) {
      console.log("Erro ao sair");
    });
  }

  cadastrar() {
    const loading = this.loadingCtrl.create({
      content: 'Por favor, aguarde...'
    });
    loading.present();

    this.auth.signInWithEmailAndPassword(this.form.value.email, this.form.value.password)
      .then(() => {
        loading.dismiss();
        this.navCtrl.push(InCioPage);
      }, (error) => {
        loading.dismiss();
        switch (error.code) {
          case 'auth/invalid-email':
            this.errorMessage = 'Insira um email válido.';
            break;
          case 'auth/wrong-password':
            this.errorMessage = 'Combinação de usuário e senha incorreta.';
            break;
          case 'auth/user-not-found':
            this.errorMessage = 'Combinação de usuário e senha incorreta.';
            break;
          default:
            this.errorMessage = error;
            break;
        }
        this.hasError = true;
      });
  }

  goToCadastro(params) {
    if (!params) params = {};
    this.navCtrl.push(CadastroPage);
  }
}
