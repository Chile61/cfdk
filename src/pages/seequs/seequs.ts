import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'page-seequs',
  templateUrl: 'seequs.html'
})
export class seequsPage {

  datas = {

  };

  constructor(public navCtrl: NavController, public http: Http, private navParams: NavParams) {
    this.getque();
  }

  //获取问答数据
  getque(){
    let url = "http://www.devonhello.com/cfdk/seequedata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id="+this.navParams.get('id'), {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.datas = res.json()[0];
      });

      
  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {

      infiniteScroll.complete();
    }, 500);
  }

}
