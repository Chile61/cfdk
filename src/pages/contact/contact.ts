import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { chartPage } from '../chart/chart';
import { UserService } from '../service/User.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public navCtrl: NavController, public userService: UserService) {
    userService.setnav(this.navCtrl);
  }

  chart(){
    this.navCtrl.push(chartPage);
  }

}
