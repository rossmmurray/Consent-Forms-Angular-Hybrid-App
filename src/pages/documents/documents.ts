import {Component, ViewChild, ElementRef, ViewChildren, QueryList} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {DomSanitizer} from "@angular/platform-browser";
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import {Storage} from "@ionic/storage";
import { ToastController } from 'ionic-angular';

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
  signaturePad;

  @ViewChildren(SignaturePad) signaturePadKids: QueryList<SignaturePad>;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    // 'minWidth': 5,
    'canvasWidth': 500,
    'canvasHeight': 100
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StudyDataService: StudyDataProvider,
    public sanitizer: DomSanitizer,
    public storage: Storage,
    public toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    // this.signaturePad.set('minWidth', 5);
    // this.signaturePad.clear();
    // this.canvasResize()
    // let canvas = this.myCanvas.toArray()[i].nativeElement;
    console.log(this.signaturePadKids);
    this.signaturePad = this.signaturePadKids.last

  }

  ionViewDidEnter() {
    this.signaturePad.clear();
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

  savePad() {
    this.signature = this.signaturePad.toDataURL();
    this.storage.set('savedSignature', this.signature);
    this.signaturePad.clear();
    let toast = this.toastCtrl.create({
      message: 'New Signature saved.',
      duration: 3000
    });
    toast.present();
  }

  clearPad(event: any) {
    this.signaturePad.clear();
    console.log(this.signaturePadKids);
    console.log(event);
  }

  // canvasResize() {
  //   console.log("resizing canvas")
  //   let canvas = document.querySelector('canvas');
  //   console.log(canvas);
  //   this.signaturePad.set('minWidth', 1);
  //   this.signaturePad.set('canvasWidth', canvas.offsetWidth);
  //   this.signaturePad.set('canvasHeight', canvas.offsetHeight);
  // }





}
