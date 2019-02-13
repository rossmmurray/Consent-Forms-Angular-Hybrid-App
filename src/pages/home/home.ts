import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Study } from "../../models/study";
import { StudiesProvider } from "../../providers/studies/studies";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [StudiesProvider]
})
export class HomePage {

  // public studies = [];
  // study1: Study =



  constructor(public navCtrl: NavController, public studiesService: StudiesProvider) {

    // let study1 = new Study("Affects of Paracetamol on Children with Asthma");
    // let study2 = new Study('Affects of Cheese on Children with Allergies')
    // let study3 = new Study('CH343: Calpol on Children with Headaches')
    // this.studies.push(study1)

    // let study1 = new Study('Affects of Paracetamol on Children with Asthma')
    // let study2 = new Study('Affects of Cheese on Children with Allergies')
    // let study3 = new Study('CH343: Calpol on Children with Headaches')
    // this.studies = [study1, study2, study3];
    // console.log(this.studies);
  }

  ionViewDidLoad(){
    this.studiesService.load();
  }
  //
  // load(){
  //   this.studies = [
  //     {'name': 'Affects of Paracetamol on Children with Asthma'},
  //     {'name': 'Affects of Cheese on Children with Allergies'},
  //     {'name': 'CH343: Calpol on Children with Headaches'}
  //     ]
  // }

}
