import { IonicPage, NavController, AlertController, ActionSheetController } from 'ionic-angular';
import { Component } from '@angular/core';
import { AcessarProvider } from "../../providers/acessar/acessar";
import { FirebaseListObservable } from "angularfire2/database";

@IonicPage()
@Component({
  selector: 'page-user-lista',
  templateUrl: 'user-lista.html',
  providers: [
    AcessarProvider
  ]
})
export class UserListaPage {
users: FirebaseListObservable<any>;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController, 
    public ap: AcessarProvider, 
    public actionSheetCtrl: ActionSheetController    
  ) {
    this.users = ap.listarUser();
    console.log("Lista: " + this.users)   
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad UserListaPage');
  }

  removeUser(userId: string){
    this.users.remove(userId);
  }

  updateType(userId, name, email, cellphone, type_user){
    let prompt = this.alertCtrl.create({
      message: "Editar tipo do Usuário: "+name,
      inputs: [        
        {
          label: "Cadastrado",
          name: 'type_user',
          value: "1",
          type: 'radio'         
        },
        {
          label: "Operador",
          name: 'type_user',
          value: "2",
          type: 'radio'         
        }
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
            this.users.update(userId, {              
              name: data.name,
              email: data.email,
              cellphone: data.cellphone,
              type_user: data.type_user
            });
          }
        }
      ]
    });
    prompt.present();
  }

  updateUser(userId, name, email, cellphone, type_user){
    let prompt = this.alertCtrl.create({
      message: "Editar dados do Usuário",
      inputs: [
        {
          name: 'name',
          value: name          
        },
        {          
          name: 'email',
          value: email          
        },
        {
          name: 'cellphone',
          value: cellphone          
        },
        {
          name: 'type_user',
          value: type_user          
        }
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
            this.users.update(userId, {
              name: data.name,
              email: data.email,
              cellphone: data.cellphone,
              type_user: data.type_user
            });
          }
        }
      ]
    });
    prompt.present();
  }

  showOptions(userId, name, email, cellphone, type_user) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Escolha a opção:',
      buttons: [
        {
          text: 'Editar Usuário',
          handler: () => {
            this.updateUser(userId, name, email, cellphone, type_user);
          }
        },
        {
          text: 'Mudar tipo Usuário',
          handler: () => {
            this.updateType(userId, name, email, cellphone, type_user);
          }
        },
        {
          text: 'Deletar Usuário',
          role: 'destructive',
          handler: () => {
            this.removeUser(userId);
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}