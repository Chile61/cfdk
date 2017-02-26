import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { toutiaoPage } from '../toutiao/toutiao';

@Component({
  selector: 'page-toutiaoList',
  templateUrl: 'toutiaoList.html'
})
export class toutiaoListPage {

  items = [];

  constructor(public navCtrl: NavController, public http: Http) {
    this.getData();
  }

  getData(){

    let url = "http://www.devonhello.com/cfdk/articlelist";

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
