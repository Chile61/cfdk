import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { registerPage } from '../register/register';
import { UserService } from '../service/User.service';

declare var SHA1: any;
declare var $: any;
declare var QQSDK: any;
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  name: string = "";
  password: string = "";
  loading: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, public alertCtrl: AlertController, public userService: UserService) {
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
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
    this.loading.present();
    var mupas = SHA1(this.password);
    var url = "http://www.devonhello.com/cfdk/applogins";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uname=" + this.name + "&upas=" + mupas, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if (res.json() == "0") {
          alert("用户名或密码错误");
        } else {
          var datas = res.json()[0];
          //alert(datas);
          this.userService.update(datas);
          this.loading.dismiss();
          //this.userService.getStorage();
          this.navCtrl.pop();
        }
      });


  }

  qqlogin() {
    this.loading.present();
    var _that = this;
    QQSDK.checkClientInstalled(function () {

      QQSDK.ssoLogin(function (args) {
        //alert("token is " + args.access_token);
        //alert("userid is " + args.userid);
        //alert("expires_time is " + new Date(parseInt(args.expires_time)) + " TimeStamp is " + args.expires_time);
        _that.getQQuser(args.access_token, args.userid);
      }, function (failReason) {
        _that.loading.dismiss();
        alert(failReason);
      });

    }, function () {
      // if installed QQ Client version is not supported sso,also will get this error
      _that.loading.dismiss();
      alert('请下载QQ客户端');
    });
  }


  //获取qq用户信息
  getQQuser(accessToken, userId) {
    var _that = this;
    var url = "https://graph.qq.com/user/get_user_info?access_token=" + accessToken + "&oauth_consumer_key=" + "1104885342" + "&openid=" + userId;

    this.http.get(url)
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        var sex = res.json()['gender'] == "男" ? 0 : 1;

        //alert(res.json()['nickname']);
        _that.checkqqlogin('qq' + res.json()['nickname'], sex, accessToken, res.json()['figureurl_2']);
        // _that.loading.dismiss();
      });

  }


  //QQ用户登录检测
  checkqqlogin(name, sex, token, fig) {
    this.loading.present();
    var _that = this;

    var url = "http://www.devonhello.com/cfdk/qqapplogins";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "qqtoken=" + token, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if (res.json() == "0") {
          //未注册
          _that.register(name, sex, token, fig);
        } else {
          //已经注册过
          var datas = res.json()[0];
          _that.userService.update(datas);
          _that.userService.getStorage();
          _that.loading.dismiss();
          _that.navCtrl.pop();

        }
      });


  }


  //注册
  register(name, sex, token, fig) {

    this.loading.present();

    let url = "http://www.devonhello.com/cfdk/register";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uname=" + name + "&usex=" + sex + "&upas=" + SHA1(token) + "&ufrom=QQ" + "&uheader=" + fig + "&qqtoken=" + token, {
      headers: headers
    })
      .subscribe((res) => {


        var datas = res.json()[0];
        this.userService.update(datas);
        this.userService.getStorage();
        this.loading.dismiss();
        this.navCtrl.pop();
      });

  }

  ionViewDidLeave() {
    this.loading.dismiss();
  }


}
