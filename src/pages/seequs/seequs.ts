import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { writecommentPage } from '../writecomment/writecomment';

@Component({
  selector: 'page-seequs',
  templateUrl: 'seequs.html'
})
export class seequsPage {

  datas = {

  };

  comment:any = [];

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
        this.getquecomment();
      });

      
  }

  //获取问答数据
  getquecomment(){
    let url = "http://www.devonhello.com/cfdk/see_comment_chart";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id="+this.navParams.get('id')+"&type=1", {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.comment = res.json();
      });

      
  }





  //我要留言
  writecom(){

    this.navCtrl.push(writecommentPage, {
      type: 1+'',
      fid:this.datas['uid'],
      fhead:this.datas['uhead'],
      fname:this.datas['uname'],
      ftext:this.datas['utitle'],
      artid: this.datas['_id'],
      utid:this.datas['uid'],
      nid:0
    });
  }

  opencomment(id,index){
    
    this.navCtrl.push(writecommentPage, {
      type: 1+'',
      fid:this.comment[index]['uid'],
      fhead:this.comment[index]['uhead'],
      fname:this.comment[index]['uname'],
      ftext:this.comment[index]['utext'],
      artid: this.datas['_id'],
      utid:this.comment[index]['uid'],
      nid:id
    });
  }

  
}
