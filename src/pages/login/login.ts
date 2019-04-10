import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';
import {HomePage} from "../home/home";
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {Observable} from "rxjs";
import {User} from "../../models/user";

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [StudyDataProvider]
})
export class LoginPage {

  account: { email: string, password: string } = {
    email: 'Firsttestemailaddress@pretendemailprovider',
    password: null
  };

  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public studyDataService: StudyDataProvider
  ) {
  }

  doLogin() {

    let messageEmail: string = this.account.email ;

      let toast = this.toastCtrl.create({
        message: "Successful Login with email: " + messageEmail,
        duration: 3000,
        position: 'bottom',
        cssClass: "myToast"
      });



    // this.navCtrl.push(DocumentsPage);
    let credentialsResultObservable: Observable<any> = this.studyDataService.checkCredentials(this.account.email, this.account.password);

    credentialsResultObservable.subscribe(data => {
      console.log(data);

      //if unsuccessful
      if (Object.keys(data).length === 0) {
        console.log("unsuccessful login");
        toast.setMessage("Incorrect email or password.");
        toast.present();
      //  if successful login
      } else {
        console.log("successful login");
        toast.present();
        let user = new User(data.user_ID, data.email, data.role);
        this.navCtrl.push(HomePage, {'user': user})
      }
    });



    //
    // this.navCtrl.push(DocumentsPage, {
    //   'selectedStudy': this.studyDataService.studies[2],
    //   // 'forms': this.
    // });

    // this.user.login(this.account).subscribe((resp) => {
    //   this.navCtrl.push(MainPage);
    // }, (err) => {
    //   this.navCtrl.push(MainPage);
    // });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    this.studyDataService.getAllStudyFormData();
  }

}
