import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { seeworkPage } from '../seework/seework';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class searchPage {

  items: string[];

  constructor(public navCtrl: NavController) {
    this.items = [
      '搜索结果',
      '搜索结果',
      '搜索结果',
      '搜索结果',
      '搜索结果'
    ];
  }

  //
  ionInput(ev: any) {
    alert(ev.target.value);
  }

  //查看菜谱
  openwork() {
    this.navCtrl.push(seeworkPage);
  }
}
