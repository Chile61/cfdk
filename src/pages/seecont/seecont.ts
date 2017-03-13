import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserService } from '../service/User.service';
import { writecommentPage } from '../writecomment/writecomment';

@Component({
  selector: 'page-seecont',
  templateUrl: 'seecont.html'
})
export class seecontPage {

  title:any;

  comment:any = [];
  type:any;
  _id:any;
  artid:any;

  url:any;

  constructor(public navCtrl: NavController, public http: Http, private navParams: NavParams, public userService: UserService) {
    //this.getque();
    
    this.type = this.navParams.get('type');
    this._id = this.navParams.get('_id');
    this.artid = this.navParams.get('artid');
    //alert(this.artid);
    switch (this.type) {
      case "2":
        this.url = "http://www.devonhello.com/cfdk/getmywork_jpush";
        this.title = "我的作品评论";
        this.getdata();
        break;
      case "1":
        this.url = "http://www.devonhello.com/cfdk/getmyque_jpush";
        this.title = "我的问答评论";
        this.getdata();
        break;
      case "3":
        this.url = "http://www.devonhello.com/cfdk/getmychart_jpush";
        this.title = "我的分享评论";
        this.getdata();
        break;
    }
  }

  

  //获取评论
  getdata(){

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(this.url, "uid="+this.userService._user._id+"&id="+this._id+"&artid="+this.artid+"&type="+this.type+"&len="+this.comment.length, {
        headers: headers
      })
      .subscribe((res) => {
        //alert(JSON.stringify(res));
          this.comment = res.json();
        });
  
  }


  opencomment(id,index){
    
    this.navCtrl.push(writecommentPage, {
      type: 2+'',
      fid:this.comment[index]['uid'],
      fhead:this.comment[index]['uhead'],
      fname:this.comment[index]['uname'],
      ftext:this.comment[index]['utext'],
      artid: this.artid,
      utid:this.comment[index]['uid'],
      nid:id
    });
  }

  
}
