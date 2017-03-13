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

  login() {
    alert(3);


    var mupas = SHA1(this.password);
    var url = "http://www.devonhello.com/cfdk/applogins";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    alert(mupas);
    this.http.post(url, "uname=" + this.name + "&upas=" + mupas, {
      headers: headers
    })
      .subscribe((res) => {
        alert(JSON.stringify(res.json()));
        if (res.json() == "0") {
          alert("用户名或密码错误");
        } else {
          var datas = res.json()[0];
          alert(datas);
          this.userService.update(datas);
          //this.userService.getStorage();
          this.navCtrl.pop();
        }
      });


  }

  //登录
  logIn() {
    alert(0);
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });
    alert(1);
    if ($.trim(this.name).length >= 4 && $.trim(this.password).length >= 6) {
      loading.present();
      alert(2);
      let url = "http://www.devonhello.com/cfdk/applogins";

      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      var upas = SHA1(this.password);
      this.http.post(url, "uname=" + this.name + "&upas=" + upas, {
        headers: headers
      })
        .subscribe((res) => {
          alert(JSON.stringify(res));
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
