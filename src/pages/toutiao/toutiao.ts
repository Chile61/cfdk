import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-toutiao',
  templateUrl: 'toutiao.html'
})
export class toutiaoPage {
  @ViewChild(Content) contentv: Content;
  id = null;
  content = '';
  loading:any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, private navParams: NavParams, public userService: UserService) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
			content: '加载中，稍等...'
		});
    this.id = navParams.get('id');
    this.getData();
    
  }


  getData(){
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/article";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id="+this.id, {
      headers: headers
    })
      .subscribe((res) => {
        
        this.content = res.json()[0];
        this.loading.dismiss();
      });
  }

  //点击到顶部
  tapEvent(e) {
    this.contentv.scrollToTop();
  }

}
