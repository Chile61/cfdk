import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Work } from '../service/Work';
import { UserService } from '../service/User.service';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'page-writecomment',
  templateUrl: 'writecomment.html'
})
export class writecommentPage {

  type: any = "";
  fid: any = "";
  fhead: any = "";
  fname: any = "";
  artid: any = "";
  ftext: any = "";
  utid: any = "";
  nid: any = "";
  text: any = "";

  constructor(public navCtrl: NavController, private navParams: NavParams,public work: Work, public userService: UserService, public http: Http) {
    this.type = navParams.get('type');
    this.fid = navParams.get('fid');
    this.fhead = navParams.get('fhead');
    this.fname = navParams.get('fname');
    this.artid = navParams.get('artid');
    this.ftext = navParams.get('ftext');
    this.utid = navParams.get('utid');
    this.nid = navParams.get('nid');
  }

  //发布问题
  send() {

    this.quesend();

  }


  //提交问答评论
  quesend(){
    let url = "http://www.devonhello.com/cfdk/comment_chart";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(url, "uid="+this.userService._user._id+"&uhead=https://avatars0.githubusercontent.com/u/11835988?v=3&s=460"+"&uname="+this.userService._user.uname+"&utext="+this.text+"&type="+this.type+"&fid="+this.fid+"&fhead="+this.fhead+"&fname="+this.fname+"&ftext="+this.ftext+"&uartid="+this.artid+"&utid="+this.utid+"&nid="+this.nid, {
        headers: headers
      })
      .subscribe((res) => {
          alert(JSON.stringify(res));
          if (res.json()["ops"][0]["_id"]) {
            this.navCtrl.pop();
          }
        });
  }


}
