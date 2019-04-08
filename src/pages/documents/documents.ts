import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {DomSanitizer} from "@angular/platform-browser";
import {ToastController} from 'ionic-angular';

import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';
import {File as realFile} from "@ionic-native/file/ngx";
import {Study} from "../../models/study";
import {Form} from "../../models/form";
import {LoadingController} from "ionic-angular";
import {Consent} from "../../models/consent";
import {HomePage} from "../home/home";
import {Platform} from 'ionic-angular';
import {utilities} from "../../shared/utilities";
import {AlertController} from "ionic-angular";
import {User} from "../../models/user";


declare var cordova;

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
  providers: [utilities]
})
export class DocumentsPage {
  selectedStudy: Study;
  selectedForms: Form[];
  selectedFormID = 1;
  selectedForm: Form;
  selectedFormHTML;
  pid: number = 10000000;
  typedEmail: string = '';
  spaceBetweenSlides: number = -20;
  user: User;

  @ViewChildren('docPage') docPageList: QueryList<ElementRef>;
  @ViewChild('studySlides') slides: Slides;

  constructor(
    public utils: utilities,
    public navCtrl: NavController,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider,
    public loadingController: LoadingController,
    public platform: Platform,
    public alertController: AlertController,
  ) {
    this.selectedStudy = navParams.get('selectedStudy');
    this.user = navParams.get('user');
    this.selectedForms = this.selectedStudy.forms.filter(form => form.selected === true);
    console.log("here are the data from the last page");
    console.log(this.selectedStudy);
    // console.log(this.selectedForms);
  }

  generatePid() {
    return Math.floor(Math.random() * 1000000000);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    this.studyDataService.getStudyFormsSections(String(this.selectedStudy.id), this.selectedForms);
    this.pid = this.generatePid();

    const docPagePercent = 0.8;
    const docPagePixels = 720;
    const naturalPixelsBetween = this.platform.width()  * (1-docPagePercent);
    const closenessFactor = 1.8;

    this.spaceBetweenSlides = -1 * naturalPixelsBetween / closenessFactor;
    // this.spaceBetweenSlides = -1 * (this.platform.width() - docPagePixels) / 4;
    // this.spaceBetweenSlides = -100;

  }

  disableSwiping() {
    console.log("detected a touch");
    this.slides.noSwiping = true;
    this.slides.lockSwipes(true);
  }

  enableSwiping() {
    this.slides.lockSwipes(false);
  }

  showCurrentForm() {
    console.log("segment chosen");
    console.log(this.selectedFormID);
    this.selectedForm = this.selectedForms.find(form => form.form_id == this.selectedFormID);
    console.log(this.selectedForm);
    console.log("showing section array");
    this.selectedFormHTML = this.studyDataService.section_array.filter(section => section.form_id == this.selectedForm.form_id);
    console.log(this.selectedFormHTML);
  }

  createDocOfImages(docPages: QueryList<ElementRef>): Promise<jsPDF> {
    return new Promise((resolve, reject) => {
      let docGenerationPromises = [];
      let doc = new jsPDF("p", "mm", "a4");
      doc.deletePage(1);

      // loop through all pages
      for (let docPage of docPages.toArray()) {
        let docElement = docPage.nativeElement;
        const options = {background: "white", height: docElement.clientHeight, width: docElement.clientWidth};
        let singlePromise = html2canvas(docElement, options).then(canvas => {
          this.utils.addImagePageToDoc(doc, canvas);
          return canvas;
        });
        docGenerationPromises.push(singlePromise);
      }

      // waits for all promises to be fulfilled then returns doc
      Promise.all(docGenerationPromises).then(y => {
        resolve(doc);
      });
    })
  }

  sendDocsToDB() {

    // show loading animation
    const loading = this.loadingController.create({
      content: '<h3> Saving Forms... <br>Please give the device back to the member of staff. </h3>',
    });
    loading.present();

    // create docs then send them
    let allDocsCreated = this.createDocOfImages(this.docPageList);
    allDocsCreated.then(doc => {
      const consentPdf = new Consent(doc.output('datauristring'), this.pid, this.selectedStudy.id, 4);
      this.studyDataService.sendConsent(consentPdf).subscribe(db_res => console.log(db_res));
      if (!this.platform.is('cordova')) {
        doc.output('dataurlnewwindow');
      }
      loading.dismiss();

      let toast = this.toastCtrl.create({
        message: "Documnets have been sent to remote database",
        duration: 3000,
        position: 'middle',
        cssClass: "myToast"
      });

      toast.present();

    })
  }

  EmailDocs() {
    // create docs then email them
    this.createDocOfImages(this.docPageList).then(doc => {
      if (this.platform.is('cordova')) {
        this.utils.sendDocViaEmail(this.platform, cordova, doc, this.typedEmail);
      } else {
        doc.output('dataurlnewwindow');
      }
    })
  }

  changeStudyForms() {
    this.navCtrl.push(HomePage, {'user': this.user});
  }

  trySendFormsToDB() {
    const alert = this.alertController.create({
      cssClass: "myAlert",
      title: '<h3>Do you want to send documents to the database?</h3>',
      message: '<p>Only click yes if you are a member of staff. <br/><br/> If so, make sure you have checked the form is fully filled in and noted down the PID</p>',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel');
          }
        }, {
          text: 'Yes, submit',
          handler: () => {
            console.log('Confirm Yes');
            this.sendDocsToDB();
          }
        }
      ]
    });

    alert.present();
  }


}
