import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';


declare var $:any;
declare var Swiper:any;
declare var YCQQ:any;
declare var RongCloudLibPlugin:any;
declare var SHA1:any;
declare var YCWeibo:any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {
  	
  }

  ionViewDidEnter() {

		Swiper('.swiper-container', {
			loop: true,
			autoplay: 5000,
			autoplayDisableOnInteraction: false,
			// 如果需要分页器
			pagination: '.swiper-pagination',
		});
	}


}
