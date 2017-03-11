import { Component } from '@angular/core';
import { UserService } from '../service/User.service';
import { NavController } from 'ionic-angular';


@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class videoPage {

  constructor(public navCtrl: NavController, public userService: UserService) {
    userService.setnav(this.navCtrl);
  }

}
