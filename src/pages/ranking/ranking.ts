import { Component, ViewChild } from '@angular/core';
import { UserService } from '../service/User.service';
import { NavController, ModalController, Content, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { MedataPage } from '../medata/medata';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html'
})
export class rankingPage {
  @ViewChild(Content) content: Content;
  userlist:any = [];
  loading:any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserService, public http: Http, public modalCtrl: ModalController) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
			content: '加载中，稍等...'
		});
    
    this.getdata();
  }

  //打开ta资料
  openTA(index){
    let modal = this.modalCtrl.create(MedataPage,{
      id:this.userlist[index]["_id"]
    });
    modal.present();
  }

  getdata() {
    this.loading.present();
    var url = "http://www.devonhello.com/cfdk/usersort";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len="+this.userlist.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.userlist = res.json();
        this.loading.dismiss();
      });
  }

  //打开养生头条
  pushtoutiaoPage() {
    //this.navCtrl.push(toutiaoPage);
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

}
