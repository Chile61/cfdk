import { Component } from '@angular/core';
import { NavController, AlertController, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-sendqus',
  templateUrl: 'sendqus.html'
})
export class sendqusPage {

  title: string = "";
  text: string = "";
  loading:any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, public userService: UserService, public alertCtrl: AlertController) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
			content: '加载中，稍等...'
		});
  }

  //发布问题
  send() {

    this.loading.present();

    let url = "http://www.devonhello.com/cfdk/post_question";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uid=" + this.userService._user._id + "&uhead=" + this.userService._user.uheader + "&uname=" + this.userService._user.uname + "&utitle=" + this.title + "&uquestion=" + this.text, {
      headers: headers
    })
      .subscribe((res) => {

        if (res.json()["ops"][0]["_id"]) {
          this.navCtrl.pop();
        }
        this.loading.dismiss();
      });

  }

  ionViewDidLeave(){
    this.loading.dismiss();
  }

}
