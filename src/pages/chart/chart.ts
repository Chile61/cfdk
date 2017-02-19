import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class chartPage {

  text:string = '';

  constructor(public navCtrl: NavController) {

  }

  send(){
    alert(this.text);
    this.text = '';
  }


}
