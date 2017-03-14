import { Component } from '@angular/core';
import { UserService } from '../service/User.service';
import { NavController, ModalController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { MedataPage } from '../medata/medata';

@Component({
  selector: 'page-ranking',
  templateUrl: 'ranking.html'
})
export class rankingPage {

  userlist:any = [];

  constructor(public navCtrl: NavController, public userService: UserService, public http: Http, public modalCtrl: ModalController) {
    userService.setnav(this.navCtrl);
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
    var url = "http://www.devonhello.com/cfdk/usersort";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len="+this.userlist.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.userlist = res.json();
      });
  }

  //打开养生头条
  pushtoutiaoPage() {
    //this.navCtrl.push(toutiaoPage);
  }

}
