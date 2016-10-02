import { Component } from '@angular/core';
import { NavController, ViewController } from 'ionic-angular';
import { QuestionPage } from '../question/question';
import { TipsPage } from '../tips/tips';


@Component({
  selector: 'page-pop',
  templateUrl: 'pop.html'
})
export class MyPopOverPage {
  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }


  //我要提问
  pushQuestionPage(){
  	this.navCtrl.push(QuestionPage);
  }

  //分享心得
  pushTipsPage(){
    this.navCtrl.push(TipsPage);
  }

  //发表作品
  pushsendWorkPagePage(){
    //this.navCtrl.push(sendWorkPage);
  }
  

}