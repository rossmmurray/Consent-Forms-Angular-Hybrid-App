import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {StudyDataProvider} from "../../providers/study-data/study-data";
import {DomSanitizer} from "@angular/platform-browser";

/**
 * Generated class for the DocumentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-documents',
  templateUrl: 'documents.html',
})
export class DocumentsPage {

  @ViewChild('myCanvas') myCanvas: ElementRef;
  public context: CanvasRenderingContext2D;
  startpoint;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public StudyDataService: StudyDataProvider,
    public sanitizer: DomSanitizer,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DocumentsPage');
    this.StudyDataService.getOneTestFormHTML();
    // the below logs don't do anything
    console.log("here's the document.ts page showing the testFormHTML");
    console.log(this.StudyDataService.testFormHTML);
    console.log("above is where it was happening");

  }

  // ngAfterViewInit(): void {
  //   this.context = (<HTMLCanvasElement>this.myCanvas.nativeElement).getContext('2d');
  // }


  // var startpoint;
  pendown(elem,ev){
    let rect=elem.getBoundingClientRect();
    this.startpoint=[ev.targetTouches[0].pageX-rect.left,ev.targetTouches[0].pageY-rect.top]
  }

  draw(elem,ev){
    let ctx=elem.getContext("2d");
    let rect=elem.getBoundingClientRect();
    let destination = [ev.targetTouches[0].pageX-rect.left,ev.targetTouches[0].pageY-rect.top];
    ctx.moveTo(this.startpoint[0],this.startpoint[1]);
    ctx.lineTo(destination[0],destination[1]);
    ctx.stroke();
    this.startpoint[0]=destination[0];
    this.startpoint[1]=destination[1];
    console.log("hello");
  }

  myFunction() {
    console.log("Here is the button being clicked")
  }

}
