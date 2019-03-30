export class FormDisplay {
  html_display: string;
  section_order: number;
  type_id: string;
  section_text: string;
  form_id: number;

  constructor(html_display: string, section_order: number, type_id: string, form_id: number) {
    this.html_display = html_display;
    this.section_order = +section_order;
    this.type_id = type_id;
    this.form_id = form_id;

    // get text for checkbox
    let myRegex = /.*<span.*?>(.*?)</g;
    if (this.type_id === "<di") {
      let match = myRegex.exec(this.html_display);
      this.section_text = match[1];
    }


    //
    //
    // // change html representation of canvas and button elements
    // let type_html_translations = {
    //   '<ca': '<sig-block></sig-block>',
    //   '<bu': '<smiley-block></smiley-block>'
    // };
    // // console.log(type_id);
    // if (this.type_id in type_html_translations) {
    //
    //   // let sanitizer: DomSanitizer;
    //   // this.html_display = sanitizer.bypassSecurityTrustHtml(html_string);
    //   this.html_display = type_html_translations[this.type_id];
    //
    //
    //   // this.safeTestFormHTML = this.sanitizer.bypassSecurityTrustHtml(this.testFormHTML);
    // }
  }
}


