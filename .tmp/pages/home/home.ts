import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
import { toutiaoHotListPage } from '../toutiaoHotList/toutiaoHotList';
import { videoPage } from '../video/video';


declare var $: any;
declare var Swiper: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public oSwiper = null;
  public oUser = null;

  constructor(public navCtrl: NavController) {

  }


  //打开养生头条
  pushtoutiaoPage(){
    this.navCtrl.push(toutiaoPage);
  }

  //打开热门养生头条
  pushtoutiaoHotListPage(){
    this.navCtrl.push(toutiaoHotListPage);
  }

  //打开视频
  pushvideoPage(){
    this.navCtrl.push(videoPage);
  }


  ionViewDidEnter() {

    if (this.oSwiper == null) {
      this.oSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
      });

      this.oUser = new Swiper('.swiper-container-user', {
        slidesPerView: 4,
        paginationClickable: true,
        slidesPerGroup: 4,
        spaceBetween: 6
      });

    }

  }

}
