import { Injectable } from '@angular/core';

/*
  Generated class for the StudiesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudiesProvider {

  studies: any = [];

  constructor() {

  }

  load(){
    this.studies = [
      {'name': 'Affects of Paracetamol on Children with Asthma'},
      {'name': 'Affects of Cheese on Children with Allergies'},
      {'name': 'CH343: Calpol on Children with Headaches'}
    ];
  }

}
