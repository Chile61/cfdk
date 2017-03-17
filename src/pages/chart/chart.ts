import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { RongCloudService } from '../service/RongCloud.service';


@Component({
  selector: 'page-chart',
  templateUrl: 'chart.html'
})
export class chartPage {

  text:any = '';
  uid:any;
  userData:any;

  constructor(public navCtrl: NavController, public userService: UserService, public rongCloudService: RongCloudService, private navParams: NavParams) {
    userService.setnav(this.navCtrl);
    this.uid = navParams.get('id');
    this.rongCloudService.webclearUnreadCount(this.uid);
    //this.userData = this.rongCloudService.webgetConversation(this.uid);
    //alert(JSON.stringify(this.userData));
  }

  send(){
    alert(this.text);
    
    //this.rongCloudService.websendTextMessaget(this.uid,this.text);
    this.rongCloudService.websendMessage(this.uid,this.text,'');
    this.text = '';
  }


}
