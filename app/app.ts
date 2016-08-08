import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {HomePage} from './pages/home/home';
import { OneSignal } from 'ionic-native';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class MyApp {
  rootPage: any = HomePage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

      let notificationOpenedCallback = (jsonData: any) => {
        console.log('didReceiveRemoteNotificationCallBack: ' + JSON.stringify(jsonData));
      };

      let appId = '';
      let gpNumber = '';

      OneSignal.init(appId, { googleProjectNumber: gpNumber, autoRegister: true }).subscribe( (jsonData:any)=>{
        let dataFromPush = JSON.stringify(jsonData)
        console.log('didReceiveRemoteNotificationCallBack: ' + dataFromPush);
        alert(dataFromPush);
      });

      OneSignal.enableInAppAlertNotification(true);
    });
  }
}

ionicBootstrap(MyApp);
