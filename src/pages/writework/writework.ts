import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Work } from '../service/Work';

@Component({
  selector: 'page-writework',
  templateUrl: 'writework.html'
})
export class writeworkPage {

  text: string = "";
  _index = null;

  constructor(public navCtrl: NavController, private navParams: NavParams,public work: Work) {
    this._index = navParams.get('index');
    this.text = navParams.get('write');
  }

  //发布问题
  send() {
    if(this.text){
      this.work._work[this._index]["write"] = this.text;
    }
    this.navCtrl.pop();
  }

}
