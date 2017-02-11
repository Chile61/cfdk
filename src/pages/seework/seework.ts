import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-seework',
  templateUrl: 'seework.html'
})
export class seeworkPage {

  constructor(public navCtrl: NavController) {

  }

  doInfinite(infiniteScroll) {
    
    setTimeout(() => {
      
      infiniteScroll.complete();
    }, 500);
  }

}
