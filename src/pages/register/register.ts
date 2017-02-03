import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class registerPage {

  sex: string = "0";
  
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController) {

  }

  

}
