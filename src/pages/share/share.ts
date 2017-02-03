import { Component } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { videolistPage } from '../videolist/videolist';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  pet: string = "new1";

  constructor(public navCtrl: NavController) {

  }

  //发布厨房问答
  sendQus(){
    NativeStorage.getItem('userId')
    .then(
      data => this.navCtrl.push(videolistPage),
      error => this.navCtrl.push(loginPage)
    );
  }

  //发布厨房作品
  sendWork(){

  }

  //发布厨房互动
  sendPlay(){

  }

}
