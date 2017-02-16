import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

declare var $: any;
declare var Swiper: any;
@Component({
  selector: 'page-slides',
  templateUrl: 'slides.html'
})
export class slidesPage {

  public banner = null;

  constructor(public navCtrl: NavController) {

  }
  ionViewDidEnter() {

    if (this.banner == null) {
      this.banner = new Swiper('.swiper-container', {
        // 如果需要分页器
        pagination: '.swiper-pagination',
      });
    }
  }

  //跳转tab页面
  push() {
    this.navCtrl.push(TabsPage);
  }
}
