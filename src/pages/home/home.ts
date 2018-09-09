import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SecureStorage,SecureStorageObject } from '@ionic-native/secure-storage';
import { ToastController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  text:string;
  number:number;
  pwd:string;

  constructor(public secureStorage: SecureStorage,public toastCtrl: ToastController,public navCtrl: NavController) {
  }

  ngOnInit(){
    this.secureStorage.create('my_store_name')
  .then((storage: SecureStorageObject) => {

     storage.get('text')
       .then(
         data => {
           console.log(data)
           this.text=data
         },
         error => console.log(error)
     );

     storage.get('number')
       .then(
        data => {
          console.log(data)
          this.number=parseFloat(data)
        },
         error => console.log(error)
     );

     storage.get('password')
     .then(
         data => {
           console.log(data) 
           this.pwd=data
        },
         error => console.log(error)
     );

  });
  }

  savePref(){
    console.log("savePref called........")
    this.secureStorage.create('my_store_name')
    .then((storage: SecureStorageObject) => {
     storage.set('text', this.text)
       .then(
        data => {
          console.log("Text Saved...."+data)
          this.presentToast("Text Saved Successfully")
        },
        error => console.log(error)
     );
     storage.set('number', String(this.number))
       .then(
        data => {
          console.log("Number Saved...."+data)
          this.presentToast("Number Saved Successfully")
        },
        error => console.log(error)
     );
     storage.set('password', this.pwd)
       .then(
        data =>{
          console.log("Password Saved...."+data)
          this.presentToast("Password Saved Successfully")
        },
        error => console.log(error)
     );
  });
  }

  presentToast(comment:string) {
    const toast = this.toastCtrl.create({
      message: comment,
      duration: 3000
    });
    toast.present();
  }

}
