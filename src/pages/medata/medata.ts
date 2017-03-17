import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { chartPage } from '../chart/chart';
import { UserService } from '../service/User.service';
import { ContactData } from '../service/ContactData';
import { loginPage } from '../login/login';
import { Headers, Http } from '@angular/http';


@Component({
  selector: 'page-medata',
  templateUrl: 'medata.html'
})
export class MedataPage {

  header: any;
  name: any;
  time: any;
  isshow: any = false;
  loading: any;
  datas:any = {};

  constructor(public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public params: NavParams, public viewCtrl: ViewController, public userService: UserService, public contactData: ContactData) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    this.header = "assets/img2/user_1.jpeg";
    this.name = userService._user.uname;
    //alert(this.params.get('id'));
    this.getdata();
    if (this.params.get('id') != this.userService._user._id) {
      this.isshow = true;
    }

  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chart() {
    if (this.userService._user._id) {
      this.navCtrl.push(chartPage, {
        id: this.params.get('id')
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //获取用户信息
  getdata() {

    this.loading.present();

    let url = "http://www.devonhello.com/cfdk/getuserdata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.params.get('id'), {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.datas = res.json()[0];
        this.loading.dismiss();
      });

  }

  ionViewDidLeave() {
    this.loading.dismiss();
  }

}
