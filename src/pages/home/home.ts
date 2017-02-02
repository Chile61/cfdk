import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
import { toutiaoHotListPage } from '../toutiaoHotList/toutiaoHotList';
import { videolistPage } from '../videolist/videolist';

import { RongCloudService } from '../service/RongCloud.service';


declare var $: any;
declare var Swiper: any;
declare var RongCloudLibPlugin: any;
declare var SHA1: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  
})
export class HomePage {

  public oSwiper = null;
  public oUser = null;

  //融云配置变量
	public rand: any;
	public now: any;
	public token: any;

  public headers: Headers;

  constructor(public navCtrl: NavController, public http: Http, public rongCloudService: RongCloudService) {
      //this.RongCloudS.RongCloudLibPlugin_init();
      this.rongCloudService.RongCloudLibPlugin_init();
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
    this.navCtrl.push(videolistPage);
  }


  ionViewDidEnter() {

    if (this.oSwiper == null) {

      //this.RongCloudLibPlugin_init();


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
