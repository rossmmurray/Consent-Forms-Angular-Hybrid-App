import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';


@Injectable()
export class StudyDataProvider {

  studies: any = [];
  allForms: any = [];
  formsView: any = [];
  currentForms: any = [];

  constructor(public http: HttpClient) {
    console.log('Hello StudyDataProvider Provider');
  }

  getStudyData() {
    this.http.get("http://localhost:3003/studies").subscribe(data => {
      this.studies = data;
      console.log(data);
    });
  }

  getFormData() {

    this.allForms = [];
    this.http.get("http://localhost:3003/forms").subscribe(data => {
      this.allForms = data;
      this.getCurrentForms(1)
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
      if (form.study_ID === study_id) {
        this.currentForms.push(form)
      }
    }
    this.formsView = StudyDataProvider.getFormLayout(this.currentForms);
  }





}
