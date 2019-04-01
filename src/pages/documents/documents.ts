import {Component, ElementRef, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {IonicPage, NavController, NavParams, Slides} from 'ionic-angular';
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {DomSanitizer} from "@angular/platform-browser";
import { ToastController } from 'ionic-angular';

import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';
import { File as realFile} from "@ionic-native/file/ngx";
import {Study} from "../../models/study";
import {Form} from "../../models/form";
import { LoadingController} from "ionic-angular";
import {HttpClient} from '@angular/common/http';
import {Consent} from "../../models/consent";
import {EmailComposer} from "@ionic-native/email-composer";
import {HomePage} from "../home/home";


@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
  // providers: [EmailComposer]
})
export class DocumentsPage {
  imgDataURLList= [];
  selectedStudy: Study;
  selectedForms: Form[];
  selectedFormID = 1;
  selectedForm: Form;
  selectedFormHTML;
  pid: number = 10000000;
  swipeOptions = {
    noSwiping: true,
    noSwipingClass: 'do_not_swipe',
  };
  numberOfDocs: number = 0;
  numberOfDocsRendered: number = 0;

  @ViewChildren('docPage') docPageList: QueryList<ElementRef>;
  @ViewChild('studySlides') slides: Slides;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StudyDataService: StudyDataProvider,
    public sanitizer: DomSanitizer,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider,
    public loadingController: LoadingController,
    private emailComposer: EmailComposer,
    private file: realFile
  ) {
    this.selectedStudy = navParams.get('selectedStudy');
    this.selectedForms = this.selectedStudy.forms.filter(form => form.selected === true);
    // this.selectedForms =

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

  getDocImage() {

    const loading = this.loadingController.create({
      content: '<h3> Saving Forms... <br>Please give the device back to the member of staff. </h3>',
    });

    loading.present();

    this.imgDataURLList = [];

    this.numberOfDocs = this.docPageList.toArray().length;
    this.numberOfDocsRendered = 0;
    let doc = new jsPDF("p", "mm", "a4");

    for (let docPage of this.docPageList.toArray()) {
      // console.log(docPage);


      let docElement = docPage.nativeElement;
      const options = {background:"white",height : docElement.clientHeight , width : docElement.clientWidth  };
      html2canvas(docElement, options).then(canvas => {
        // console.log("doing something at least");
        // console.log(canvas);

        // get image url thing
        // TODO: imgDataURLList doesn't need to be an object property
        let imgDataURL = canvas.toDataURL("image/jpeg", 0.2);
        // console.log("here's the imgDataURL");
        // console.log(imgDataURL);
        this.imgDataURLList.push(imgDataURL);

        // put in pdf
        let canvasWidth = 180;
        let canvasHeight = canvasWidth * canvas.height / canvas.width;
        doc.addImage(imgDataURL, 'JPEG', 10, 10, canvasWidth, canvasHeight);

        if (this.numberOfDocsRendered < this.numberOfDocs) {
          doc.addPage();
        };




        // doc.output('dataurlnewwindow');
        //
        // //  new stuff
        //   let pdfOutput = doc.output();
        //   // using ArrayBuffer will allow you to put image inside PDF
        //   let buffer = new ArrayBuffer(pdfOutput.length);
        //   let array = new Uint8Array(buffer);
        //   for (let i = 0; i < pdfOutput.length; i++) {
        //     array[i] = pdfOutput.charCodeAt(i);
        //   }
        //
        //
        //   // let file = new realFile;
        //   //This is where the PDF file will stored , you can change it as you like
        //   // for more information please visit https://ionicframework.com/docs/native/file/
        //   const directory = this.file. ;
        //
        //   //Name of pdf
        //   const fileName = "example.pdf";
        //
        //   //Writing File to Device
        //   this.file.writeFile(directory,fileName,buffer)
        //     .then((success)=> console.log("File created Succesfully" + JSON.stringify(success)))
        //     .catch((error)=> console.log("Cannot Create File " +JSON.stringify(error)));

        // check if all docs are rendered
        this.numberOfDocsRendered += 1;
        if (this.numberOfDocsRendered == this.numberOfDocs) {


          let formDataBlob = this.imgDataURLList[0];
          console.log("here is the blob I'm trying to upload");
          console.log(formDataBlob);
          const consent = new Consent(formDataBlob.toString(), 2, 3, 4);
          console.log("here a result form db");
          // this.studyDataService.sendConsent(consent).subscribe(db_res => console.log(db_res));


          let file = doc.output('datauri');
          const consentPdf = new Consent(file.toString(), 2, 3, 4);
          this.studyDataService.sendConsent(consentPdf).subscribe(db_res => console.log(db_res));

          //
          // let email = {
          //   to: 'rossmichaelm@gmail.com',
          //   //cc: 'jdnichollsc@hotmail.com',
          //   //bcc: ['jdnichollsc@hotmail.com'],
          //   // attachments: [
          //   //   this.generateAttachment(file, "myFileName.pdf")
          //   // ],
          //   subject: 'Mira un PDF!',
          //   body: 'Abre el PDF creado con jsPDF :)',
          //   isHtml: true
          // };

          // let email = {
          //   to: 'max@mustermann.de',
          //   cc: 'erika@mustermann.de',
          //   bcc: ['john@doe.com', 'jane@doe.com'],
          //   subject: 'Cordova Icons',
          //   body: 'How are you? Nice greetings from Leipzig',
          //   isHtml: true
          // };
          //
          // // this.emailComposer.open(email);
          //
          // this.emailComposer.isAvailable().then((available: boolean) =>{
          //   if(available) {
          //     //Now we know we can send
          //     this.emailComposer.open(email);
          //   }
          // });


          loading.dismiss();
        }

      })
    }

  }

  sendEmail() {

    console.log("trying to send an email");
//
    let email = {
      to: 'max@mustermann.de',
      cc: 'erika@mustermann.de',
      bcc: ['john@doe.com', 'jane@doe.com'],
      // attachments: [
      //   'file://img/logo.png',
      //   'res://icon.png',
      //   'base64:icon.png//iVBORw0KGgoAAAANSUhEUg...',
      //   'file://README.pdf'
      // ],
      subject: 'Cordova Icons',
      body: 'How are you? Nice greetings from Leipzig',
      isHtml: true
    };

    this.emailComposer.open(email);

    this.emailComposer.isAvailable().then((available: boolean) =>{
      if(available) {

// Send a text message using default options
        this.emailComposer.open(email);
        //Now we know we can send
      }
    });
//     this.emailComposer.isAvailable();



  }

  changeStudyForms() {
    this.navCtrl.push(HomePage);
  }




}
