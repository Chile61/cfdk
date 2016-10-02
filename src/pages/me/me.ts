import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { myBasePage } from '../myBase/myBase';


@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {
  constructor(public navCtrl: NavController) {
  	
  }

  pushmyBasePage(){

  	this.navCtrl.push(myBasePage);

  }

  pushmysetPage(){

  	//this.navCtrl.push(setPage);

  }
}
