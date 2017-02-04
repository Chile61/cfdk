import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  pet: string = "new1";

  constructor(public navCtrl: NavController, public userService: UserService, public loadingCtrl: LoadingController) {

  }

  //发布厨房问答
  sendQus(){

    if( this.userService._user._id ){

    }else{
      this.navCtrl.push(loginPage)
    }

  }

  //发布厨房作品
  sendWork(){

  }

  //发布厨房互动
  sendPlay(){

  }

  //刷新视频
  doRefresh(refresher) {

    this.presentLoadingDefault();

    setTimeout(() => {
      
      refresher.complete();
    }, 3000);
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

}
