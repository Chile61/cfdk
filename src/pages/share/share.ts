import { Component } from '@angular/core';
import { NavController, PopoverController } from 'ionic-angular';
import { MyPopOverPage } from '../pop/pop';
import { sendWorkPage } from '../sendWork/sendWork';
import { QuestionInPage } from '../question_in/question_in';
import { TipsInPage } from '../tips_in/tips_in';
import { Headers, Http } from '@angular/http';


@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

	pet: string = "new";
  tips;
  question;
  works;

	
  constructor(public navCtrl: NavController, public popoverCtrl: PopoverController, private http: Http) {

      this.getShare();
      this.getQuestions();
      this.getWorks();

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

  //获取分享数据
  getShare(){
    let url = "http://www.devonhello.com/cfdk/tips";
    this.http.get(url).subscribe((res) => {

        this.tips = res.json();
        
      });
  }

  //获取问题数据
  getQuestions(){
    let url = "http://www.devonhello.com/cfdk/qus";
    this.http.get(url).subscribe((res) => {

        this.question = res.json();
        
      });
  }

  //获取作品数据
  getWorks(){
    let url = "http://www.devonhello.com/cfdk/works";
    this.http.get(url).subscribe((res) => {

        this.works = res.json();
        
      });
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
