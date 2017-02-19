import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { chartPage } from '../chart/chart';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController) {

  }

  chart(){
    this.navCtrl.push(chartPage);
  }

}
