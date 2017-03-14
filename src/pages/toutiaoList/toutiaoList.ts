import { Component, ViewChild } from '@angular/core';
import { NavController, Content, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { toutiaoPage } from '../toutiao/toutiao';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-toutiaoList',
  templateUrl: 'toutiaoList.html'
})
export class toutiaoListPage {
  @ViewChild(Content) content: Content;
  items = [];
  loading:any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, public userService: UserService) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
			content: '加载中，稍等...'
		});
    this.getData();
    
  }

  getData(){
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/articlelist";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len=0", {
      headers: headers
    })
      .subscribe((res) => {
        
        this.items = res.json();
        this.loading.dismiss();
      });
  }

  //打开养生头条
  pushtoutiaoPage(index) {
    alert(index);
    alert(this.items[index]["_id"]);
    this.navCtrl.push(toutiaoPage,{
      id:this.items[index]["_id"]
    });
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

}
