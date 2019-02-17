import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
// import { Study } from "../../models/study";
import { StudiesProvider } from "../../providers/studies/studies";
import { LoginPage } from "../login/login";
import { DocumentsPage } from "../documents/documents";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StudiesProvider]
})
export class HomePage {

  documentEmail: string;

  constructor(
    public navCtrl: NavController,
    public studiesService: StudiesProvider,
    public toastCtrl: ToastController) {
  }

  sendEmail() {

    let toast = this.toastCtrl.create({
      message: "Documents have been sent to " + this.documentEmail,
      duration: 3000,
      position: 'middle',
      cssClass: "myToast"
    });

    toast.present();
  }

  LogOut(){

    let toast = this.toastCtrl.create({
      message: "You have been logged out",
      duration: 1000,
      position: 'top',
      cssClass: "myToast"
    });

    toast.present();
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad(){
    this.studiesService.load();
  }

  openDocumentsPage(){
    this.navCtrl.push(DocumentsPage);
  }


}
