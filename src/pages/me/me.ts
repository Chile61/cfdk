import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-me',
  templateUrl: 'me.html'
})
export class MePage {

  public uname: any;

  constructor(public navCtrl: NavController, public userService: UserService) {
    
    this.uname = this.userService._user.uname;
    
  }

  ionViewDidEnter() {
    
    if( this.userService._user._is ){
      this.uname = this.userService._user.uname;
    }
    
  }

}
