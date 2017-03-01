import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { loginPage } from '../login/login';
import { sendqusPage } from '../sendqus/sendqus';
import { sendchartPage } from '../sendchart/sendchart';
import { sendworkPage } from '../sendwork/sendwork';
import { seequsPage } from '../seequs/seequs';
import { seeworkPage } from '../seework/seework';
import { seechartPage } from '../seechart/seechart';
import { Headers, Http } from '@angular/http';
import { UserService } from '../service/User.service';
import { Work } from '../service/Work';

@Component({
  selector: 'page-share',
  templateUrl: 'share.html'
})
export class SharePage {

  pet: string = "new1";
  workarr = [];
  qusarr = [];
  chartarr = [];

  constructor(public navCtrl: NavController, public userService: UserService, public loadingCtrl: LoadingController, public work: Work, public http: Http) {
    this.getwork(0);
    
  }

  //获取作品数据
  getwork(type){
    let url = "http://www.devonhello.com/cfdk/workdata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len="+this.workarr.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.workarr = this.workarr.concat(res.json());
        if(type==0){
          this.getque(0);
        }
        
      });

      
  }

  //获取问答数据
  getque(type){
    let url = "http://www.devonhello.com/cfdk/quedata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len="+this.qusarr.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.qusarr = this.qusarr.concat(res.json());
        if(type==0){
          this.getchart();
        }
        
      });

      
  }

  //分享心情数据
  getchart(){
    let url = "http://www.devonhello.com/cfdk/chartdata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len="+this.chartarr.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.chartarr = this.chartarr.concat(res.json());
        
      });
  }

  //查看问题
  openqus(id) {
    this.navCtrl.push(seequsPage,{
      id:id
    });
  }

  //查看作品详情
  openwork(id) {
    this.navCtrl.push(seeworkPage,{
      id:id
    });
  }

  //查看分享闲聊
  openchart(id) {
    this.navCtrl.push(seechartPage,{
      id:id
    });
  }

  //发布厨房问答
  sendQus() {

    if (this.userService._user._id) {
      this.navCtrl.push(sendqusPage);
    } else {
      this.navCtrl.push(loginPage);
    }

  }

  //发布厨房作品
  sendWork() {
    if (this.userService._user._id) {
      this.navCtrl.push(sendworkPage);
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //发布心情
  sendchart() {
    if (this.userService._user._id) {
      this.navCtrl.push(sendchartPage);
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //刷新视频
  doRefresh(refresher) {
    this.presentLoadingDefault();
    switch (this.pet) {
      case "new1":
        this.getque(1);
        break;
    case "new2":
        this.getwork(1);
        break;
    case "new3":
        this.getchart();
        break;
    }
    refresher.complete();
    
  }


  presentLoadingDefault() {
    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 3000);
  }

  ionViewDidEnter() {

    this.work.init();

  }

}
