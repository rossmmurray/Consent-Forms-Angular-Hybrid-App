import {Injectable} from "@angular/core";
import * as jsPDF from 'jspdf';


@Injectable()
export class utilities {


  sendEmail(platform, cordova_handle, attachment, recipient) {
    let emailOptions = {
      to: recipient,
      attachments: [attachment],
      subject: 'Consent Forms',
      body: 'Please see the attached consent forms',
      isHtml: false
    };
    console.log("trying email");
      platform.ready().then(() => {
        cordova_handle.plugins.email.open(emailOptions);
      })
  }

  generateAttachment(doc, fileName){
    let uriString = doc.output('datauristring');
    let uristringparts = uriString.split(',');
    uristringparts[0] = "base64:" + fileName + "//";
    return uristringparts.join("");
  };

  sendDocViaEmail(platform, cordova_handle, doc, recipient) {
    let attachment = this.generateAttachment(doc, "ConsentForms.pdf");
    this.sendEmail(platform, cordova_handle, attachment, recipient)
  }

  addImagePageToDoc(doc: jsPDF, image: HTMLCanvasElement) {

    doc.addPage();
    let imgDataURL = image.toDataURL("image/jpeg", 0.2);
    let canvasWidth = 180;
    let canvasHeight = canvasWidth * image.height / image.width;
    doc.addImage(imgDataURL, 'JPEG', 10, 10, canvasWidth, canvasHeight);

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
  }

}

