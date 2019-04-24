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

    let imageWidth = 180;
    let imageHeight = imageWidth * image.height / image.width;

    let a4Ratio = 1.4142;

    // let imageHeight = 180 * a4Ratio;
    // let imageWidth = imageHeight * image.width / image.height;

    // the factor roughly takes into account margins
    const pageHeight = imageWidth * a4Ratio * 1.15;

    // const pageHeight = doc;

    let imgDataURL = image.toDataURL("image/jpeg", 0.6);
    doc.addPage();
    doc.addImage(imgDataURL, 'JPEG', 10, 10, imageWidth, imageHeight);

    // add extra page
    if ( (imageHeight > pageHeight)) {
      doc.addPage();
      doc.addImage(imgDataURL, 'JPEG', 10, -pageHeight + 10, imageWidth, imageHeight);
    }
  }

}

