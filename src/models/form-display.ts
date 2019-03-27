import {DomSanitizer} from "@angular/platform-browser";

export class FormDisplay {
  html_display: string;
  section_order: number;
  type_id: string;

  constructor(html_display: string, section_order: number, type_id: string, private sanitizer: DomSanitizer) {
    this.html_display = html_display;
    this.section_order = +section_order;
    this.type_id = type_id;


    // change html representation of canvas and button elements
    let type_html_translations = {
      '<ca': '<sig-block></sig-block>',
      '<bu': '<smiley-block></smiley-block>'
    };
    // console.log(type_id);
    if (this.type_id in type_html_translations) {

      // let sanitizer: DomSanitizer;
      // this.html_display = sanitizer.bypassSecurityTrustHtml(html_string);
      this.html_display = type_html_translations[this.type_id];


      // this.safeTestFormHTML = this.sanitizer.bypassSecurityTrustHtml(this.testFormHTML);
    }
  }
}


