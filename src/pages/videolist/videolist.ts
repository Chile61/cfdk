import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { videoPage } from '../video/video';

@Component({
  selector: 'page-videolist',
  templateUrl: 'videolist.html'
})
export class videolistPage {

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

  }

  //打开视频
  pushvideoPage(){
    this.navCtrl.push(videoPage);
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
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

}
