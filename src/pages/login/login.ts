import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { NativeStorage } from 'ionic-native';
import { registerPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  name: string = "";
  password: string = "";

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {
    NativeStorage.clear();
  }

  ionViewDidEnter() {
    
    NativeStorage.getItem('_user')
    .then(
      data => {
        //alert(data._id+"--"+data.uname+"--"+data.usex);
        this.navCtrl.pop();
      },
      error => {
        alert("No");
      }
    );
  }

  //跳转注册界面
  pushregisterPage(){
    this.navCtrl.push(registerPage)
  }

  //登录
  logIn(){
    alert(this.name);
    alert(this.password);
  }

  

}
