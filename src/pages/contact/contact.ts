import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { chartPage } from '../chart/chart';
import { UserService } from '../service/User.service';
import { ContactData } from '../service/ContactData';
import { RongCloudService } from '../service/RongCloud.service';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  data:any = [];

  constructor(public navCtrl: NavController, public userService: UserService,public contactData: ContactData,public rongCloudService: RongCloudService) {
    userService.setnav(this.navCtrl);
    this.data = this.contactData._data;
    //alert(JSON.stringify(this.data));
    //alert(this.data[0].latestMessage.content.extra.name);
  }

  chart(index){
    var id = this.data[index].targetId;
    alert(id);
    this.navCtrl.push(chartPage,{
      id: id
    });
  }

  ionViewDidEnter(){
    this.rongCloudService.webgetRemoteConversationList();
  }

}
