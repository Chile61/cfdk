import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { registerPage } from '../register/register';
import { UserService } from '../service/User.service';

declare var SHA1: any;
declare var $: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  name: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public userService: UserService) {

  }

  ionViewDidEnter() {

    if (this.userService._user._id) {

      this.navCtrl.pop();
    }

  }

  //跳转注册界面
  pushregisterPage() {
    this.navCtrl.push(registerPage)
  }

  //登录
  logIn() {
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });

    if ($.trim(this.name).length >= 4 && $.trim(this.password).length >= 6) {
      loading.present();

      let url = "http://www.devonhello.com/cfdk/login";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(url, "uname=" + this.name + "&upas=" + SHA1(this.password), {
        headers: headers
      })
        .subscribe((res) => {

          if (res.json() == "0") {
            let alert = this.alertCtrl.create({
              title: '提示!',
              subTitle: '输入有误!',
              buttons: ['确定']
            });
            alert.present();

          } else {
            var datas = res.json()[0];
            alert(datas);
            this.userService.update(datas);
            this.userService.getStorage();
            this.navCtrl.pop();
          }


          loading.dismiss();
        });
    } else {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: '输入有误!',
        buttons: ['确定']
      });
      alert.present();
      this.name = "";
      this.password = "";
    }


  }



}
