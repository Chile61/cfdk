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
  isshow:any = true;
  

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserService, public http: Http, public viewCtrl: ViewController, private navParams: NavParams) {
    this.type = this.navParams.data.type;
    this.datas = this.navParams.data.datas;
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    
  }

  dele(){

  }

  alter(){
    
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
