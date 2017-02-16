import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';

@Component({
  selector: 'page-toutiaoHotList',
  templateUrl: 'toutiaoHotList.html'
})
export class toutiaoHotListPage {

  constructor(public navCtrl: NavController) {

  }

  //打开养生头条
  pushtoutiaoPage() {
    this.navCtrl.push(toutiaoPage);
  }

}
