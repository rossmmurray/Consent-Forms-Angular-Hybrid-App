import { Injectable } from '@angular/core';
// import { Study } from "../../models/study";
import { HttpClient} from "@angular/common/http";


@Injectable()
export class StudiesProvider {

  studies: any = [];
  forms: any = [];
  formsLayout: any = [];

  constructor() {

  }

  load(){
    // let study1 = new Study('Cancer drug trial on Mild Skin Cancer')
    this.studies = [
      {'name': 'Affects of Paracetamol on Children with Asthma'},
      {'name': 'Affects of Cheese on Children with Allergies'},
      {'name': 'CH343: Calpol on Children with Headaches'}
    ];

    this.forms = [
      {'name': 'Info Sheet 1'},
      {'name': 'Info Sheet 2'},
      {'name': 'Adult Consent Form (Italian)'},
      {'name': 'Adult Consent Form'},
      {'name': 'Child Assent Form'},
      {'name': 'Child Assent Form (Italian)'}
    ];

    for (let i = 0; i < this.forms.length; i = i + 4){
      this.formsLayout.push(this.forms.slice(i, i + 4))
    }
    // console.log(allForms)
  }

}
