import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { mysendPage } from '../mysend/mysend';


@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  public uname: any;

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public userService: UserService, private navParams: NavParams) {
    userService.setnav(this.navCtrl);
    this.uname = this.userService._user.uname;

  }

  ionViewDidEnter() {

    if (this.userService._user._is) {
      this.uname = this.userService._user.uname;
    }

  }

  //我的资料
  openme(){
    //let modal = this.modalCtrl.create(MedataPage);
    //modal.present();
  }

  //我的作品
  getwork(){
    this.navCtrl.push(mysendPage, {
      type: 'work',
    });
  }

  //我的提问
  getque(){
    this.navCtrl.push(mysendPage, {
      type: 'que',
    });
  }

  //我的分享闲聊
  getchart(){
    this.navCtrl.push(mysendPage, {
      type: 'chart',
    });
  }


  clear(){
    this.userService.clear();
  }

}
