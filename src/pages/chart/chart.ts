import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserService } from '../service/User.service';


@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class chartPage {

  text:string = '';

  constructor(public navCtrl: NavController, public userService: UserService) {
    userService.setnav(this.navCtrl);
  }

  send(){
    alert(this.text);
    this.text = '';
  }


}
