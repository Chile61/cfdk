import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SharePage } from '../share/share';
import { MePage } from '../me/me';
import { ContactPage } from '../contact/contact';
import { UserService } from '../service/User.service';
import { ContactData } from '../service/ContactData';
import { UpdateService } from '../service/Update.service';
import { AppVersion } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SharePage;
  tab3Root: any = ContactPage;
  tab4Root: any = MePage;

  _num: any = 0;
  VersionCode: any;

  constructor(public alertCtrl: AlertController, public userService: UserService, public contactData: ContactData, public updateService: UpdateService, public http: Http) {
    //this.userService.clear();
    var _that = this;

    setTimeout(() => {
      _that.userService.getStorage();
      //_that._num = _that.contactData._num;
      AppVersion.getVersionNumber().then((version) => {
        _that.VersionCode = version;
        _that.AppV();
      });
    }, 2000);

  }


  AppV() {


    let alert = this.alertCtrl.create({
      title: '提示',
      message: '是否要更新到最新版本?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.updateService.download();
          }
        }
      ]
    });


    this.http.get("http://www.devonhello.com/cfdk/version").subscribe((res) => {
      //alert("服务器版本：" + res.json());
      if (res.json() != this.VersionCode) {
        //需要更新

        alert.present();
      }
    });


  }
}
