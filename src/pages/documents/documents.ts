import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {DomSanitizer} from "@angular/platform-browser";
import { ToastController } from 'ionic-angular';

import * as html2canvas from "html2canvas";
import * as jsPDF from 'jspdf';
import { File as realFile} from "@ionic-native/file/ngx";


@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
  imgDataURL;

  @ViewChild('docPage') docPage: ElementRef;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StudyDataService: StudyDataProvider,
    public sanitizer: DomSanitizer,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider,
    private file: realFile
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    this.studyDataService.getOneTestFormHTML();
  }

  getDocImage() {
    let docElement = this.docPage.nativeElement;
    html2canvas(docElement).then(canvas => {
      console.log("doing something at least");
      console.log(canvas);

      // get image url thing
      // TODO: imgDataURL doesn't need to be an object property
      this.imgDataURL = canvas.toDataURL("image/PNG");

      //Add image Canvas to PDF
      let doc = new jsPDF("p","mm","a4");
      doc.addImage(this.imgDataURL, 'PNG', 20,20 );


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

      console.log("success maybe");

    })
  }


}
