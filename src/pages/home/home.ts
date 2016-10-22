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
    }

  }

}
