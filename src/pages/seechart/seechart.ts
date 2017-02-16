import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-seechart',
  templateUrl: 'seechart.html'
})
export class seechartPage {

  constructor(public navCtrl: NavController) {

  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {

      infiniteScroll.complete();
    }, 500);
  }

}
