import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { AppVersion } from 'ionic-native';
import { Headers, Http } from '@angular/http';


@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html'
})
export class settingPage {

  ischecked: any = true;
  loading: any;
  VersionCode:any = '';

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserService, public http: Http) {
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    userService.setnav(this.navCtrl);
    var _that = this;
    AppVersion.getVersionNumber().then((version)=>{
      _that.VersionCode = version;
      //alert(version);
    });
    
  }


  AppV() {

    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/AppVersion";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "", {
      headers: headers
    })
      .subscribe((res) => {
        alert(res.json());

        this.loading.dismiss();
      });

  }

  



}
