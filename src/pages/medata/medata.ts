import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { chartPage } from '../chart/chart';
import { UserService } from '../service/User.service';
import { ContactData } from '../service/ContactData';
import { loginPage } from '../login/login';


@Component({
  selector: 'page-medata',
  templateUrl: 'medata.html'
})
export class MedataPage {

  header:any;
  name:any;
  time:any;
  isshow:any = false;

  constructor(public navCtrl: NavController, public params: NavParams,public viewCtrl: ViewController, public userService: UserService,public contactData: ContactData) {
    userService.setnav(this.navCtrl);
    this.header = "assets/img2/user_1.jpeg";
    this.name = userService._user.uname;
    alert(this.params.get('id'));
    if(this.params.get('id') != this.userService._user._id){
      this.isshow = true;
    }
    
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  chart(){
    if (this.userService._user._id) {
      this.navCtrl.push(chartPage,{
        id: this.params.get('id')
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }
  
}
