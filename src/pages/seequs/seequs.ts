import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-seequs',
  templateUrl: 'seequs.html'
})
export class seequsPage {

  constructor(public navCtrl: NavController) {

  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {

      infiniteScroll.complete();
    }, 500);
  }

}
