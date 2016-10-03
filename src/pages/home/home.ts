import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';


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
	

  public headers: Headers;
  banners;
  qus;
  art;
  works;

  constructor(public navCtrl: NavController, private http: Http) {
  		this.GetData();
  }

  //获取数据
  GetData() {

		let url = "http://www.devonhello.com/cfdk";
		this.http.get(url).subscribe((res) => {

				this.banners = res.json()[0]["banner"];
				this.art = res.json()[0]["art"];
				this.qus = res.json()[0]["question"];
				this.works = res.json()[0]["work"];
			});
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
