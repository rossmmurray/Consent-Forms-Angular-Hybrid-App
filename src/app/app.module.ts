import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StudiesProvider } from '../providers/studies/studies';
import { LoginPage } from "../pages/login/login";
import { DocumentsPage } from "../pages/documents/documents";
import { StudyDataProvider } from '../providers/study-data/study-data';
import { HttpClientModule } from "@angular/common/http";
import { SignaturePadModule} from "angular2-signaturepad";
import {IonicStorageModule} from "@ionic/storage";
import { SigBlockComponent} from "../components/sig-block/sig-block";
import {SmileyBlockComponent} from "../components/smiley-block/smiley-block";
import { File as realFile} from "@ionic-native/file/ngx";
import {WheelSelector} from "@ionic-native/wheel-selector/ngx";
import {utilities} from "../shared/utilities";
// import {Em} from "@ionic-native/email-composer";
// import {EmailComposer} from "@ionic-native/email-composer/ngx";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    DocumentsPage,
    SigBlockComponent,
    SmileyBlockComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    SignaturePadModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    DocumentsPage
  ],
  providers: [
    // EmailComposer,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    StudiesProvider,
    StudyDataProvider,
    realFile,
    WheelSelector,
    utilities
  ]
})
export class AppModule {}
