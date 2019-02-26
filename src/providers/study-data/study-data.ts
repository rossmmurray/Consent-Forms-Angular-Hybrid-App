import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
// import { map} from "rxjs/operator/map";

/*
  Generated class for the StudyDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class StudyDataProvider {

  constructor(public http: HttpClient) {
    console.log('Hello StudyDataProvider Provider');
  }

  getStudyData() {

    this.http.get("http://localhost:3003/studies").subscribe(data => {
      console.log(data)
    });
  }

}
