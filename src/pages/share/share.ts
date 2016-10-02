import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { MyPopOverPage } from '../pop/pop';
import { sendWorkPage } from '../sendWork/sendWork';
import { QuestionInPage } from '../question_in/question_in';
import { TipsInPage } from '../tips_in/tips_in';


@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

	pet: string = "new";

	
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController) {
  }


  presentPopover(myEvent) {
    let popover = this.popoverCtrl.create(MyPopOverPage);
    popover.present({
      ev: myEvent
    });
  }

  //查看问题
  pushQuestionInPage(){
    this.navCtrl.push(QuestionInPage);
  }

  //发表作品
  sendWork(){
    this.navCtrl.push(sendWorkPage);
  }

  //查看心得
  pushTipsInPage(){
    this.navCtrl.push(TipsInPage);
  }

  //上拉刷新
  doInfinite(infiniteScroll) {
    console.log('Begin async operation');

    setTimeout(() => {
      
      infiniteScroll.complete();
    }, 6000);
  }
  
  doRefresh(refresher) {
    

    setTimeout(() => {
      
      refresher.complete();
    }, 6000);
  }
  
  selectedFriends(){
  	
  }
  
}
