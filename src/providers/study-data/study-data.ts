import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/map';
import {DomSanitizer, SafeHtml, SafeScript} from "@angular/platform-browser";
import {FormDisplay} from "../../models/form-display";
import {Form} from "../../models/form";
import {Study} from "../../models/study";
import { Consent} from "../../models/consent";
import {Observable} from "rxjs";
import {catchError} from "rxjs/operators";


@Injectable()
export class StudyDataProvider {

  studies: Study[] = [];
  allForms: any = [];
  formsView: any = [];
  currentForms: any = [];
  testFormHTML: any = [];
  safeTestFormHTML: SafeHtml;
  safeTestScriptHTML: SafeScript;
  api_base_url = "https://designteam14consentapi.azurewebsites.net";
  allSections: any = [];
  section_array: FormDisplay[] = [];
  // api_base_url = "http://localhost:3003";
  selectedStudyDP: Study;
  forms_with_html: Form[] = [];


  constructor(
    public http: HttpClient,
    public sanitizer: DomSanitizer
    ) {
    console.log('Hello StudyDataProvider Provider');
  }

  checkCredentials(email: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };

    let credentialJson = JSON.stringify({
      email: email,
      password: password
    });
    return this.http.post(this.api_base_url + "/login", credentialJson, httpOptions );
  }


  getStudyMetaData(user_id?: string) {
    // get top level data for all studies
    user_id = user_id || '';
    this.studies = [];
    this.http.get(this.api_base_url + "/studies" + "/" + user_id).subscribe(data => {
      // @ts-ignore
      for (let row of data) {
        let study = new Study(row.study_ID, row.study_name, []);
        this.studies.push(study);
      }
      this.addFormsToStudies(this.studies, this.allForms);
      this.selectedStudyDP = this.studies[0];
    }, error => (console.log(error)));
  }

  getFormData() {

    this.http.get(this.api_base_url + "/forms").subscribe(data => {
      this.allForms = [];
      // @ts-ignore
      for (let row of data) {
        this.allForms.push(new Form(row.form_ID, row.form_title, row.study_study_ID))
      }
      this.addFormsToStudies(this.studies, this.allForms);
      this.getCurrentForms(1);
    });
  };


  getAllStudyFormData(user_id?: string) {
    user_id  =  user_id || '';
    this.getStudyMetaData((user_id));
    this.getFormData();
  }

  addFormsToStudies(studies: Study[], forms: Form[]) {
    for (let study of studies) {
      study.forms = [];
      let forms_for_study =  forms.filter(form => form.study_id === study.id);
      study.forms = forms_for_study
    }
    console.log("here are the transformed studies");
    console.log(studies);
    return studies;
  }


  getStudyFormsSections(study_id: string, forms: Form[]) {
    this.testFormHTML = [];
    this.section_array = [];
    // this.forms
    this.http.get(this.api_base_url + "/study_forms_sections/" + study_id).subscribe(data => {
      this.allSections = data;
      console.log(this.allSections);
      for (let section of this.allSections) {
        let section_display = new FormDisplay(section.content, section.order, section.section_type, section.form_ID);
        // this.forms_with_html[section.]
        // let safe_html = this.sanitizer.bypassSecurityTrustHtml(section_display.html_display);
        this.section_array.push(section_display);
      }
      console.log(this.section_array);

      // add html to forms
      this.forms_with_html = forms;
      for (let form of this.forms_with_html) {
        form.formHTML = this.section_array.filter(section => section.form_id == form.form_id)
      }
      console.log("here are the forms with their html in them");
      console.log(this.forms_with_html);

      // this.section_array.forEach(row => this.forms_with_html[row.])

    });
  }
  //
  // add_html_to_study_forms(section_array: FormDisplay[], studies: Study[]) {
  //
  //   for (let study of studies) {}
  //
  // }


  getOneTestFormHTML() {
    this.testFormHTML = [];
    this.section_array = [];
    this.http.get(this.api_base_url + "/single_form_test").subscribe(data => {

      this.allSections = data;

      console.log(this.allSections);
      for (let section of this.allSections) {
        let section_display = new FormDisplay(section.content, section.order, section.section_type, section.form_ID);
        // let safe_html = this.sanitizer.bypassSecurityTrustHtml(section_display.html_display);
        this.section_array[section_display.section_order] = section_display;
      }

      console.log(this.section_array);
    });
  }

  sendConsent(consent: Consent) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': 'my-auth-token'
      })
    };

    let myRegex = /.*base64,(.*)/g;
    let match = myRegex.exec(consent.formData);
    consent.formData = match[1];

    let consentJson = JSON.stringify(consent);

    console.log("JSON being sent with post request to api");
    console.log(consentJson);

    return this.http.post(this.api_base_url + "/form_html", consentJson, httpOptions )

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
