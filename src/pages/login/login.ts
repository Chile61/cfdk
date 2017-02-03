import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { registerPage } from '../register/register';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class loginPage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

  }

  //跳转注册界面
  pushregisterPage(){
    this.navCtrl.push(registerPage)
  }

  

}
