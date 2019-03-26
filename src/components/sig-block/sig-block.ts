import {Component, ViewChild} from '@angular/core';
import { SignaturePad } from "angular2-signaturepad/signature-pad";
import {Storage} from "@ionic/storage";
import { ToastController} from "ionic-angular";


@Component({
  selector: 'form-sections-sig-block',
  templateUrl: 'sig-block.html'
})
export class SigBlockComponent {
  signature = '';
  isDrawing = false;

  @ViewChild(SignaturePad) signaturePad: SignaturePad;

  private signaturePadOptions: Object = { // passed through to szimek/signature_pad constructor
    'canvasWidth': 500,
    'canvasHeight': 100
  };

  constructor(
    public storage: Storage,
    public toastCtrl: ToastController
  ) {
    console.log('Hello SigBlockComponent Component');

  }

  ngAfterViewInit() {
    console.log(this.signaturePad);

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
    console.log(this.signaturePad);
    console.log(event);
  }


}
