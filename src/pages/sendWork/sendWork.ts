import { Component } from '@angular/core';
import { NavController, reorderArray } from 'ionic-angular';

@Component({
  selector: 'page-sendWork',
  templateUrl: 'sendWork.html'
})
export class sendWorkPage {

  items = [];
  isReordering: boolean = false;

  constructor(public navCtrl: NavController) {

    for (let x = 0; x < 5; x++) {
      this.items.push(x);
    }

  }

  toggle() {
    this.isReordering = !this.isReordering;
  }


  reorderItems(indexes) {
    this.items = reorderArray(this.items, indexes);
  }

}