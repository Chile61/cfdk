import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html'
})
export class rankingPage {

  constructor(public navCtrl: NavController) {

  }

  //打开养生头条
  pushtoutiaoPage(){
    this.navCtrl.push(toutiaoPage);
  }

}
