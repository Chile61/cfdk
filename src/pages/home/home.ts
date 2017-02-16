import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NavController, LoadingController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
import { toutiaoHotListPage } from '../toutiaoHotList/toutiaoHotList';
import { videolistPage } from '../videolist/videolist';
import { searchPage } from '../search/search';
import { rankingPage } from '../ranking/ranking';


declare var $: any;
declare var Swiper: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  public oSwiper = null;
  public oUser = null;

  public headers: Headers;

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController) {
    //this.RongCloudS.RongCloudLibPlugin_init();

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

  //打开菜谱分类／搜索
  pushsearchPage() {
    this.navCtrl.push(searchPage);
  }

  //打开养生头条
  pushtoutiaoPage() {
    this.navCtrl.push(toutiaoPage);
  }

  //打开排名
  pushrankingPage() {
    this.navCtrl.push(rankingPage);
  }

  //打开热门养生头条
  pushtoutiaoHotListPage() {
    this.navCtrl.push(toutiaoHotListPage);
  }

  //打开视频
  pushvideoPage() {
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
