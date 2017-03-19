import { Component } from '@angular/core';
import { NavController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { AppVersion } from 'ionic-native';
import { Headers, Http } from '@angular/http';
import { UpdateService } from '../service/Update.service';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class settingPage {

  ischecked: any = true;
  loading: any;
  VersionCode: any = '';

  constructor(public alertCtrl: AlertController, public plt: Platform, public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserService, public http: Http, public updateService: UpdateService) {
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    userService.setnav(this.navCtrl);
    var _that = this;
    AppVersion.getVersionNumber().then((version) => {
      _that.VersionCode = version;
      //alert(version);
    });

  }


  AppV() {

    this.loading.present();
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
      this.loading.dismiss();
    });


  }

  exit() {
    var _that = this;
    let alert = this.alertCtrl.create({
      title: '提示',
      message: '是否要退出?',
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
            _that.userService.clear();
            _that.plt.exitApp();
          }
        }
      ]
    });
    alert.present();



  }
  ionViewDidLeave() {
    this.loading.dismiss();
  }


}
