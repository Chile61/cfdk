import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-sendqus',
  templateUrl: 'sendqus.html'
})
export class sendqusPage {

  title: string = "";
  text: string = "";

  constructor(public navCtrl: NavController) {

  }

  //发布问题
  send() {
    
  }

}
