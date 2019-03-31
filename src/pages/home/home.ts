import {Component, ViewChild} from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { StudiesProvider } from "../../providers/studies/studies";
import { LoginPage } from "../login/login";
import { DocumentsPage } from "../documents/documents";
import { StudyDataProvider} from "../../providers/study-data/study-data";
import { Slides } from "ionic-angular";
import {Study} from "../../models/study";
import {Form} from "../../models/form";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StudiesProvider, StudyDataProvider]
})

export class HomePage {
  selectedStudyId: number = -1;
  selectedStudy: Study;
  // selectedFormIds = [];
  // selectedForms: Form[];


  @ViewChild('studySlides') studySlides: Slides;

  documentEmail: string = 'example@gmail.com';
  // currentForms: any = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider,
  ) {}

  onStudySelection() {
    this.selectedStudy = this.studyDataService.studies.find(study => study.id === +this.selectedStudyId);
    // console.log("current study: ");
    // console.log(this.selectedStudy);
    // // this.currentForms = this.selectedStudy.forms;

  }

  // onFormSelection() {
  //   this.selectedFormIds = this.selectedFormIds.map(formId => +formId);
  //   this.selectedForms = this.selectedStudy.forms.filter(form => this.selectedFormIds.indexOf(form.form_id) !== -1);
  //
  // }

  //
  // showCurrentForms() {
  //
  //   let selectedStudy = this.getSelectedStudy();
  //   this.studyDataService.getCurrentForms(selectedStudy);
  //   console.log("showing current forms");
  //   console.log(selectedStudy);
  // }
  //
  // getSelectedStudy() {
  //   let activeSlide = this.studySlides.getActiveIndex();
  //   let activeStudy = this.studyDataService.studies[activeSlide];
  //   return activeStudy.id;
  // }

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
    console.log("ionViewDidLoad")
    this.studyDataService.getAllStudyFormData();
    console.log("after get all study form data")
    // this.selectedStudyId = this.studyDataService.selectedStudyDP.id;
    // this.selectedStudy = this.studyDataService.selectedStudyDP;
  }

  openDocumentsPage(){
    console.log("here are the studies before push to next page");
    console.log(this.selectedStudy);
    this.navCtrl.push(DocumentsPage, {
      'selectedStudy': this.selectedStudy,
      // 'forms': this.
    });
  }

}
