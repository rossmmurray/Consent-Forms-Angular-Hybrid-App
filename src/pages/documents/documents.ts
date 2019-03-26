import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {DomSanitizer} from "@angular/platform-browser";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import {Storage} from "@ionic/storage";

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {
  signature = '';
  isDrawing = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 300
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StudyDataService: StudyDataProvider,
    public sanitizer: DomSanitizer,
    public storage: Storage
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    this.signaturePad.set('minWidth', 5);
    this.signaturePad.clear();

    // this.StudyDataService.getOneTestFormHTML();
    // // the below logs don't do anything
    // console.log("here's the document.ts page showing the testFormHTML");
    // console.log(this.StudyDataService.testFormHTML);
    // console.log("above is where it was happening");
  }

  ionViewDidEnter() {
    this.signaturePad.clear()
    this.storage.get('savedSignature').then((data) => {
      this.signature = data;
    });
  }

  drawComplete() {
    // will be notified of szimek/signature_pad's onEnd event
    console.log(this.signaturePad.toDataURL());
  }

  drawStart() {
    // will be notified of szimek/signature_pad's onBegin event
    console.log('begin drawing');
  }

  // ngAfterViewInit(): void {
  //   this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  // }


  // var startpoint;
  // pendown(elem,ev){
  //   let rect=elem.getBoundingClientRect();
  //   this.startpoint=[ev.targetTouches[0].pageX-rect.left,ev.targetTouches[0].pageY-rect.top]
  // }

  // draw(elem,ev){
  //   let ctx=elem.getContext("2d");
  //   let rect=elem.getBoundingClientRect();
  //   let destination = [ev.targetTouches[0].pageX-rect.left,ev.targetTouches[0].pageY-rect.top];
  //   ctx.moveTo(this.startpoint[0],this.startpoint[1]);
  //   ctx.lineTo(destination[0],destination[1]);
  //   ctx.stroke();
  //   this.startpoint[0]=destination[0];
  //   this.startpoint[1]=destination[1];
  //   console.log("hello");
  // }

  // myFunction() {
  //   console.log("Here is the button being clicked")
  // }

}
