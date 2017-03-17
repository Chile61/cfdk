import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { mysendPage } from '../mysend/mysend';
import { MedataPage } from '../medata/medata';
import { loginPage } from '../login/login';

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

    if (this.userService._user._is) {
      this.uname = this.userService._user.uname;
    }

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

  //我的作品
  getwork() {
    if (this.userService._user._id) {
      this.navCtrl.push(mysendPage, {
        type: 'work',
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //我的提问
  getque() {
    if (this.userService._user._id) {
      this.navCtrl.push(mysendPage, {
        type: 'que',
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }

  //我的分享闲聊
  getchart() {
    if (this.userService._user._id) {
      this.navCtrl.push(mysendPage, {
        type: 'chart',
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }


  clear() {
    this.userService.clear();
  }

}
