import { Component, ViewChild } from '@angular/core';
import { UserService } from '../service/User.service';
import { NavController, Content } from 'ionic-angular';


@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class videoPage {
  @ViewChild(Content) content: Content;
  constructor(public navCtrl: NavController, public userService: UserService) {
    userService.setnav(this.navCtrl);
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

}
