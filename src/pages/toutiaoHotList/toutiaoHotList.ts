import { Component } from '@angular/core';
import { UserService } from '../service/User.service';
import { NavController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { toutiaoPage } from '../toutiao/toutiao';

@Component({
  selector: 'page-toutiaoHotList',
  templateUrl: 'toutiaoHotList.html'
})
export class toutiaoHotListPage {

  items = [];

  constructor(public navCtrl: NavController, public userService: UserService, public http: Http) {
    userService.setnav(this.navCtrl);
    this.getData();
  }

  getData(){

    let url = "http://www.devonhello.com/cfdk/hotarticlelist";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len=0", {
      headers: headers
    })
      .subscribe((res) => {
        
        this.items = res.json();
        
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

}
