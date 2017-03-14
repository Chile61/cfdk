import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
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
  loading:any;

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





}
