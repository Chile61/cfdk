import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { Headers, Http } from '@angular/http';
import { seequsPage } from '../seequs/seequs';
import { seeworkPage } from '../seework/seework';
import { seechartPage } from '../seechart/seechart';

@Component({
  selector: 'page-mysend',
  templateUrl: 'mysend.html'
})
export class mysendPage {
  @ViewChild(Content) content: Content;
  type:any;
  work:any = [];
  que:any = [];
  chart:any = [];
  quehideWhen: any = true;
  workhideWhen: any = true;
  charthideWhen: any = true;
  loading:any;
  uid:any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, private navParams: NavParams, public userService: UserService, public http: Http) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
			content: '加载中，稍等...'
		});
    
    this.type = navParams.get('type');
    this.uid = navParams.get('id');
    switch (this.type) {
      case "work":
        this.getwork();
        break;
      case "que":
        this.getque();
        break;
      case "chart":
        this.getchart();
        break;
    }
    //this.getcomt();
  }


  //获取评论
  getwork(){
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/getmywork";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(url, "uid="+ this.uid +"&len="+this.work.length, {
        headers: headers
      })
      .subscribe((res) => {
          this.work = res.json();
          this.workhideWhen = false;
          this.loading.dismiss();
        });
  
  }

  //获取评论
  getque(){
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/getmyquestion";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(url, "uid="+ this.uid +"&len="+this.que.length, {
        headers: headers
      })
      .subscribe((res) => {
          this.que = res.json();
          this.quehideWhen = false;
          this.loading.dismiss();
        });
  
  }

  //获取评论
  getchart(){
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/getmychart";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(url, "uid="+ this.uid +"&len="+this.chart.length, {
        headers: headers
      })
      .subscribe((res) => {
          this.chart = res.json();
          this.charthideWhen = false;
          this.loading.dismiss();
        });
  
  }

  //查看问题
  openqus(id) {
    this.navCtrl.push(seequsPage, {
      id: id
    });
  }

  //查看作品详情
  openwork(id) {
    this.navCtrl.push(seeworkPage, {
      id: id
    });
  }

  //查看分享闲聊
  openchart(id) {
    this.navCtrl.push(seechartPage, {
      id: id
    });
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

  ionViewDidLeave(){
    this.loading.dismiss();
  }


}
