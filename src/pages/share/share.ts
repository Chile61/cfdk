import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { sendqusPage } from '../sendqus/sendqus';
import { sendchartPage } from '../sendchart/sendchart';
import { sendworkPage } from '../sendwork/sendwork';
import { seequsPage } from '../seequs/seequs';
import { seeworkPage } from '../seework/seework';

import { UserService } from '../service/User.service';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  pet: string = "new1";

  constructor(public navCtrl: NavController, public userService: UserService, public loadingCtrl: LoadingController) {

  }

  //查看问题
  openqus(){
   this.navCtrl.push(seequsPage); 
  }

  //查看作品详情
  openwork(){
   this.navCtrl.push(seeworkPage); 
  }

  //发布厨房问答
  sendQus(){

    if( this.userService._user._id ){
      this.navCtrl.push(sendqusPage);
    }else{
      this.navCtrl.push(loginPage);
    }

  }

  //发布厨房作品
  sendWork(){
    if( this.userService._user._id ){
        this.navCtrl.push(sendworkPage);
      }else{
        this.navCtrl.push(loginPage);
      }
  }

  //发布心情
  sendchart(){
    if( this.userService._user._id ){
      this.navCtrl.push(sendchartPage);
    }else{
      this.navCtrl.push(loginPage);
    }
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
