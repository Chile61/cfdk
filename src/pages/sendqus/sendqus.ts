import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-sendqus',
  templateUrl: 'sendqus.html'
})
export class sendqusPage {

  title: string = "";
  text: string = "";

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public userService: UserService, public alertCtrl: AlertController) {

  }

  //发布问题
  send() {

    let loading = this.loadingCtrl.create({
      content: '请稍后...'
    });

    loading.present();

    let url = "http://www.devonhello.com/cfdk/post_question";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uid="+this.userService._user._id+"&uhead="+"https://avatars0.githubusercontent.com/u/11835988?v=3&s=460"+"&uname="+this.userService._user.uname+"&utitle="+this.title+"&uquestion="+this.text, {
        headers: headers
      })
        .subscribe((res) => {
          
          if(res.json()["ops"][0]["_id"]){
            this.navCtrl.pop();
          }
          loading.dismiss();
        });

  }

}
