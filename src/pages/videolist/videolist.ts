import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Content } from 'ionic-angular';
import { videoPage } from '../video/video';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-videolist',
  templateUrl: 'videolist.html'
})
export class videolistPage {
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public userService: UserService) {
    userService.setnav(this.navCtrl);
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

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

}
