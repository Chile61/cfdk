import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { writecommentPage } from '../writecomment/writecomment';
import { loginPage } from '../login/login';
import { UserService } from '../service/User.service';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'page-PopoverPage2',
  templateUrl: 'PopoverPage2.html'
})
export class PopoverPage2 {

  datas: any;
  type: any;
  loading: any;
  coll: any;
  nav: NavController;
  hideWhen:any = true;


  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserService, public http: Http, public viewCtrl: ViewController, private navParams: NavParams) {
    this.type = this.navParams.data.type;
    this.datas = this.navParams.data.datas;
    this.nav = this.userService.nav;
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    switch (this.type) {
      case '1':
        this.coll = "question";
        break;
      case '2':
        this.coll = "work";
        this.hideWhen = false;
        break;
      case '3':
        this.coll = "chart";
        break;
      default:
        break;
    }

  }

  dele() {
    let alert = this.alertCtrl.create({
      title: '提示',
      message: '是否要删除?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.postdele();
          }
        }
      ]
    });
    alert.present();
  }

  //post－dele
  postdele() {
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/dele";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "uid=" + this.userService._user._id + "&coll=" + this.coll + "&id=" + this.datas['_id'], {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if(res.json() != '0'){
          this.loading.dismiss();
          this.close();
          this.nav.pop();
        }
        
      });
  }

  alter() {
    alert(JSON.stringify(this.datas));
  }

  close() {
    this.loading.dismiss();
    this.viewCtrl.dismiss();
  }

  ionViewDidLeave(){
    this.loading.dismiss();
  }

}
