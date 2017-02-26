import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'page-toutiao',
  templateUrl: 'toutiao.html'
})
export class toutiaoPage {

  id = null;
  content = '';

  constructor(public navCtrl: NavController, public http: Http, private navParams: NavParams) {
    this.id = navParams.get('id');
    this.getData();
  }


  getData(){

    let url = "http://www.devonhello.com/cfdk/article";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id="+this.id, {
      headers: headers
    })
      .subscribe((res) => {
        
        this.content = res.json()[0];
        
      });
  }

}
