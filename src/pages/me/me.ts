import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { MedataPage } from '../medata/medata';
import { loginPage } from '../login/login';
import { settingPage } from '../setting/setting';
import { forkPage } from '../fork/fork';
import { mycollPage } from '../mycoll/mycoll';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  public uname: any;
  datas:any = {};

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userService: UserService, private navParams: NavParams) {
    userService.setnav(this.navCtrl);
    this.datas = this.userService._user;

  }

  ionViewDidEnter() {

    if (this.userService._user._id) {
      this.uname = this.userService._user.uname;
    }

  }

  //打开系统设置
  setting(){
    this.navCtrl.push(settingPage);
  }

  //我的资料
  openme() {
    if (this.userService._user._id) {
      let modal = this.modalCtrl.create(MedataPage,{
      id:this.userService._user._id
    });
      modal.present();
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //我的收藏
  collect(){
    if (this.userService._user._id) {
      this.navCtrl.push(mycollPage);
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //我的关注
  myfork(){
    if (this.userService._user._id) {
      this.navCtrl.push(forkPage);
    } else {
      this.navCtrl.push(loginPage);
    }
  }  


  clear() {
    this.userService.clear();
  }

}
