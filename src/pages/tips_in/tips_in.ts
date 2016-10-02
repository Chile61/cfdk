import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';

@Component({
  selector: 'page-tipsIn',
  templateUrl: 'tips_in.html'
})
export class TipsInPage {
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
  }

  send(){

  	let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

	loading.present();

	setTimeout(() => {
	    loading.dismiss();
	  }, 4000);
   }

   
}