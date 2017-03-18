import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, LoadingController, AlertController } from 'ionic-angular';
import { chartPage } from '../chart/chart';
import { UserService } from '../service/User.service';
import { ContactData } from '../service/ContactData';
import { loginPage } from '../login/login';
import { Headers, Http } from '@angular/http';
import { mysendPage } from '../mysend/mysend';


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
  datas: any = {};

  constructor(public alertCtrl: AlertController,public navCtrl: NavController, public http: Http, public loadingCtrl: LoadingController, public params: NavParams, public viewCtrl: ViewController, public userService: UserService, public contactData: ContactData) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });

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

  //加关注
  fork() {

    let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '已关注',
        buttons: ['是']
      });

    if (this.userService._user._id) {
      
      this.loading.present();

    let url = "http://www.devonhello.com/cfdk/fork";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uid=" + this.userService._user._id + "&fid="+this.params.get('id') + "&fname="+this.datas.uname + "&fhead="+this.datas.uheader, {
      headers: headers
    })
      .subscribe((res) => {
        alert.present();
        this.loading.dismiss();
      });

    } else {
      this.navCtrl.push(loginPage);
    }
    
  }

  //我的作品
  getwork() {
    if (this.userService._user._id || this.params.get('id')) {
      this.navCtrl.push(mysendPage, {
        type: 'work',
        id: this.params.get('id')
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //我的提问
  getque() {
    if (this.userService._user._id || this.params.get('id')) {
      this.navCtrl.push(mysendPage, {
        type: 'que',
        id: this.params.get('id')
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //我的分享闲聊
  getchart() {
    if (this.userService._user._id || this.params.get('id')) {
      this.navCtrl.push(mysendPage, {
        type: 'chart',
        id: this.params.get('id')
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  ionViewDidLeave() {
    this.loading.dismiss();
  }

}
