import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DomSanitizer, SafeHtml, SafeScript} from "@angular/platform-browser";
import {FormDisplay} from "../../models/form-display";


@Injectable()
export class StudyDataProvider {

  studies: any = [];
  allForms: any = [];
  formsView: any = [];
  currentForms: any = [];
  testFormHTML: any = [];
  safeTestFormHTML: SafeHtml;
  safeTestScriptHTML: SafeScript;
  api_base_url = "https://designteam14consentapi.azurewebsites.net";
  allSections: any = [];
  section_array: any = [];
  // api_base_url = "http://localhost:3003";

  constructor(
    public http: HttpClient,
    public sanitizer: DomSanitizer
    ) {
    console.log('Hello StudyDataProvider Provider');
  }


  getStudyData() {
    this.http.get(this.api_base_url + "/studies").subscribe(data => {
      this.studies = data;
      console.log(data);
    });
  }

  getFormData() {

    this.allForms = [];
    console.log("Some massive messge");
    this.http.get(this.api_base_url + "/forms").subscribe(data => {
      this.allForms = data;
      console.log("this should be showing all forms:");
      console.log(this.allForms);
      this.getCurrentForms(1)
    });
  }

  getOneTestFormHTML() {


    this.testFormHTML = [];
    this.section_array = [];
    this.http.get(this.api_base_url + "/single_form_test").subscribe(data => {

      this.allSections = data;

      console.log(this.allSections);
      for (let section of this.allSections) {
        let section_display = new FormDisplay(section.content, section.order, section.section_type, this.sanitizer);
        // let safe_html = this.sanitizer.bypassSecurityTrustHtml(section_display.html_display);
        this.section_array[section_display.section_order] = section_display;
      }

      console.log(this.section_array);

      // content: "<p>This is an example of a paragraph.</p>"
      // form_form_ID: 6
      // formsection_ID: 1
      // order: "0"
      // section_type: "<p>"


      // this.testFormHTML = data[0].form_pretty_html;
      // this.testFormHTML = this.testFormHTML[0];
      // console.log(data);
      // console.log(this.testFormHTML);
      // this.safeTestFormHTML = this.sanitizer.bypassSecurityTrustHtml(this.testFormHTML);
      // this.safeTestScriptHTML = this.sanitizer.bypassSecurityTrustScript(this.testFormHTML)
    });
  }

  static getFormLayout(form_array) {
    let form_layout: any = [];
    for (let i = 0; i < form_array.length; i = i + 4){
      form_layout.push(form_array.slice(i, i + 4))
    }
    return(form_layout)
  }


  getCurrentForms(study_id) {

    this.currentForms = [];
    this.formsView = [];
    for (let form of this.allForms) {
      if (form.study_study_ID === study_id) {
        this.currentForms.push(form)
      }
    }
    this.formsView = StudyDataProvider.getFormLayout(this.currentForms);
  }




}
