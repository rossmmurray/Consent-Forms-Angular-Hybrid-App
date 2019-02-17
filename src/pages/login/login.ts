import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController) {
  }

  doLogin() {

    let messageEmail: string = this.account.email ;

      let toast = this.toastCtrl.create({
        message: "Successful Login with email: " + messageEmail,
        duration: 3000,
        position: 'top',
        cssClass: "myToast"
      });

      toast.present();

    this.navCtrl.push(HomePage);

    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
