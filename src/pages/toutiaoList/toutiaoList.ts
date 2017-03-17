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
  infiniteScroll: any = null;

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

    this.http.post(url, "len="+this.items.length, {
      headers: headers
    })
      .subscribe((res) => {
        if(res.json()!="0"){
          this.items = this.items.concat(res.json());
        }
        this.loading.dismiss();
        if(this.infiniteScroll != null){
          this.infiniteScroll.complete();
        }
        
      });
  }

  //打开养生头条
  pushtoutiaoPage(index) {
    
    this.navCtrl.push(toutiaoPage,{
      id:this.items[index]["_id"]
    });
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

  doInfinite(infiniteScroll) {

    this.infiniteScroll = infiniteScroll;
    this.getData();
  }

  ionViewDidLeave(){
    this.loading.dismiss();
  }

}
