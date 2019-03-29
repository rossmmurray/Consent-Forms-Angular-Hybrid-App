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
  allStudyFormData: Study[];
  selectedStudyId: number = -1;
  selectedStudy: Study;
  selectedFormId = -1;


  @ViewChild('studySlides') studySlides: Slides;

  documentEmail: string = 'example@gmail.com';
  // currentForms: any = [];

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider,
  ) {}

  onStudySelection() {
    this.selectedStudy = this.allStudyFormData.find(study => study.id === +this.selectedStudyId);
    console.log("current study: ");
    console.log(this.selectedStudy);
    // this.currentForms = this.selectedStudy.forms;

  }

  onFormSelection() {
    console.log("selecting forms");
    console.log(this.selectedFormId);
  }


  showCurrentForms() {

    let selectedStudy = this.getSelectedStudy();
    this.studyDataService.getCurrentForms(selectedStudy);
    console.log("showing current forms");
    console.log(selectedStudy);
  }

  getSelectedStudy() {
    let activeSlide = this.studySlides.getActiveIndex();
    let activeStudy = this.studyDataService.studies[activeSlide];
    return activeStudy.id;
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
    // console.log("testing5");
    this.studyDataService.getAllStudyFormData();
    this.allStudyFormData = this.studyDataService.studies;
    // this.selectedStudyId = this.allStudyFormData[0];

    // this.studyDataService.getFormData();
  }

  openDocumentsPage(){
    this.navCtrl.push(DocumentsPage);
  }

}
