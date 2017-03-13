import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { UserService } from '../service/User.service';


@Component({
  selector: 'page-medata',
  templateUrl: 'medata.html'
})
export class MedataPage {

  header:any;
  name:any;
  time:any;

  constructor(public navCtrl: NavController, public params: NavParams,public viewCtrl: ViewController, public userService: UserService) {
    userService.setnav(this.navCtrl);
    this.header = "assets/img2/user_1.jpeg";
    this.name = userService._user.uname;
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  
}
