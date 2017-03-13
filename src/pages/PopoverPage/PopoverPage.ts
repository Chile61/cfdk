import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import { writecommentPage } from '../writecomment/writecomment';


@Component({
  selector: 'page-PopoverPage',
  templateUrl: 'PopoverPage.html'
})
export class PopoverPage {

  datas:any;
  type:any;

  constructor(public navCtrl: NavController,public viewCtrl: ViewController,private navParams: NavParams) {
    this.type = this.navParams.data.type;
    this.datas = this.navParams.data.datas;
  }

  writecom(){
    //alert(this.datas['uid']);
    this.navCtrl.push(writecommentPage, {
      type: this.type,
      fid:this.datas['uid'],
      fhead:this.datas['uhead'],
      fname:this.datas['uname'],
      ftext:this.datas['utitle'],
      artid: this.datas['_id'],
      utid:this.datas['uid'],
      nid:0
    });
    this.close();
  }

  close() {
    this.viewCtrl.dismiss();
  }
  
}
