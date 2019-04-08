import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, ToastController} from 'ionic-angular';
import { StudiesProvider } from "../../providers/studies/studies";
import { LoginPage } from "../login/login";
import { DocumentsPage } from "../documents/documents";
import { StudyDataProvider} from "../../providers/study-data/study-data";
import { Slides } from "ionic-angular";
import {Study} from "../../models/study";
import {Form} from "../../models/form";
import {User} from "../../models/user";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StudiesProvider, StudyDataProvider]
})

export class HomePage {
  selectedStudyId: number = -1;
  selectedStudy: Study;
  user: User;
  anySelectedForms: Boolean = false;
  // navParams: NavParams;
  // selectedFormIds = [];
  // selectedForms: Form[];


  @ViewChild('studySlides') studySlides: Slides;

  documentEmail: string = 'example@gmail.com';
  // currentForms: any = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider,
    public navParams: NavParams
  ) {
    this.user = this.navParams.get('user');
    console.log("logged in user is: ");
    console.log(this.user);
  }

  checkAnySelectedForms() {
    this.anySelectedForms = false;
    for (let form of this.selectedStudy.forms) {
        if (form.selected == true) {
          this.anySelectedForms = true;
        }
    }
  }

  onStudySelection() {
    this.selectedStudy = this.studyDataService.studies.find(study => study.id === +this.selectedStudyId);
    // console.log("current study: ");
    // console.log(this.selectedStudy);
    // // this.currentForms = this.selectedStudy.forms;

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
    console.log("ionViewDidLoad");
    this.studyDataService.getAllStudyFormData(String(this.user.id));
    console.log("after get all study form data")

    // this.selectedStudyId = this.studyDataService.selectedStudyDP.id;
    // this.selectedStudy = this.studyDataService.selectedStudyDP;
  }

  openDocumentsPage(){
    console.log("here are the studies before push to next page");
    console.log(this.selectedStudy);
    this.navCtrl.push(DocumentsPage, {
      'selectedStudy': this.selectedStudy,
      'user': this.user
      // 'forms': this.
    });
  }

}
