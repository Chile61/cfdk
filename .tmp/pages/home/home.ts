import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


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
