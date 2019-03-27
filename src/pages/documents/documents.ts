import {Component, ElementRef, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {DomSanitizer} from "@angular/platform-browser";
import { ToastController } from 'ionic-angular';
import * as html2canvas from "html2canvas";


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
    public studyDataService: StudyDataProvider
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    this.studyDataService.getOneTestFormHTML();
  }

  getDocImage() {
    let doc = this.docPage.nativeElement;
    html2canvas(doc).then(canvas => {
      console.log("doing something at least");
      console.log(canvas);
      this.imgDataURL = canvas.toDataURL("image/PNG");
      // imgDataURL.
      //Add image Canvas to PDF
    })
  }


}
