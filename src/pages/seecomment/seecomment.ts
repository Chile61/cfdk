import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-seecomment',
  templateUrl: 'seecomment.html'
})
export class seecommentPage {

  text:string = '';

  constructor(public navCtrl: NavController) {

  }

  send(){
    alert(this.text);
    this.text = '';
  }


}
