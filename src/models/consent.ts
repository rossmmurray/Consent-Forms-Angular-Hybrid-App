import {FormDisplay} from "./form-display";

export class Form {
  form_id: number;
  study_id: number;
  form_title: string;
  selected: boolean;
  formHTML: FormDisplay[];

  constructor(form_ID: number, form_title: string, study_study_ID: number, formHTML?: FormDisplay[]) {
    this.form_title = form_title;
    this.form_id = +form_ID;
    this.study_id = +study_study_ID;
    this.selected = true;
    this.formHTML = formHTML || [];
  }
}

