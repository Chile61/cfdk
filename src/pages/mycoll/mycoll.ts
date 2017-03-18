import { Component, ViewChild } from '@angular/core';
import { NavController, Content, LoadingController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { Headers, Http } from '@angular/http';
import { seeworkPage } from '../seework/seework';


@Component({
  selector: 'page-mycoll',
  templateUrl: 'mycoll.html'
})
export class mycollPage {
  @ViewChild(Content) content: Content;

  work: any = [];
  loading: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserService, public http: Http) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    this.getwork();
    //this.getcomt();
  }


  //获取评论
  getwork() {
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/mytocollect";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.userService._user._id + "&len=" + this.work.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if (res.json() != '0') {
          this.work = res.json();
        }


        this.loading.dismiss();
      });

  }


  //查看作品详情
  openwork(id) {
    this.navCtrl.push(seeworkPage, {
      id: id
    });
  }


  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

  ionViewDidLeave() {
    this.loading.dismiss();
  }


}
