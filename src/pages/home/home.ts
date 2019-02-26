import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
// import { Study } from "../../models/study";
import { StudiesProvider } from "../../providers/studies/studies";
import { LoginPage } from "../login/login";
import { DocumentsPage } from "../documents/documents";
import { StudyDataProvider} from "../../providers/study-data/study-data";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StudiesProvider, StudyDataProvider]
})
export class HomePage {

  documentEmail: string = 'example@gmail.com';

  constructor(
    public navCtrl: NavController,
    public studiesService: StudiesProvider,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider) {
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
    this.studyDataService.getStudyData();
  }

  openDocumentsPage(){
    this.navCtrl.push(DocumentsPage);
  }


}
