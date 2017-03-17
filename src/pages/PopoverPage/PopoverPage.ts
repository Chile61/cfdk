import { Component } from '@angular/core';
import { NavController, ViewController, NavParams, LoadingController, AlertController, ModalController } from 'ionic-angular';
import { writecommentPage } from '../writecomment/writecomment';
import { loginPage } from '../login/login';
import { UserService } from '../service/User.service';
import { Headers, Http } from '@angular/http';
import { MedataPage } from '../medata/medata';

@Component({
  selector: 'page-PopoverPage',
  templateUrl: 'PopoverPage.html'
})
export class PopoverPage {

  datas: any;
  type: any;
  loading: any;
  coll: any;
  hideWhen:any = true;
  hideWhen2:any = true;
  

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public navCtrl: NavController, public userService: UserService, public http: Http, public viewCtrl: ViewController, private navParams: NavParams) {
    this.type = this.navParams.data.type;
    this.datas = this.navParams.data.datas;
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    
    switch (this.type) {
      case '1':
        this.coll = "question";
        break;
      case '2':
        this.coll = "work";
        this.hideWhen = false;
        break;
      case '3':
        this.coll = "chart";
        break;
      default:
        break;
    }
    
    if(this.datas['uid']==this.userService._user._id){
      this.hideWhen2 = false;
    }
  }

  writecom() {
    //alert(this.datas['uid']);
    if (this.userService._user._id) {
      this.navCtrl.push(writecommentPage, {
        type: this.type,
        fid: this.datas['uid'],
        fhead: this.datas['uhead'],
        fname: this.datas['uname'],
        ftext: this.datas['utitle'],
        artid: this.datas['_id'],
        utid: this.datas['uid'],
        nid: 0
      });
    } else {
      this.navCtrl.push(loginPage);
    }
    this.close();
  }

  //举报
  jubao() {
    //alert(this.datas['uid']);
    if (this.userService._user._id) {

      this.loading.present();

      let url = "http://www.devonhello.com/cfdk/jubao";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(url, "id=" + this.datas['_id'] + "&coll=" + this.coll, {
        headers: headers
      })
        .subscribe((res) => {

          this.loading.dismiss();
        });

    } else {
      this.navCtrl.push(loginPage);
    }
    this.close();
  }

  //收藏
  tocoll() {
    if (this.userService._user._id) {

      this.loading.present();

      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: '收藏成功',
        buttons: ['是']
      });


      let url = "http://www.devonhello.com/cfdk/tocollect";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');

      this.http.post(url, "uid=" + this.userService._user._id + "&utitle=" + this.datas['utitle'] + "&uartid=" + this.datas['_id'], {
        headers: headers
      })
        .subscribe((res) => {
          //alert(JSON.stringify(res.json()));
          alert.present();
          this.loading.dismiss();
        });

    } else {
      this.navCtrl.push(loginPage);
    }
    this.close();
  }


  presentConfirm() {
    let alert = this.alertCtrl.create({
      title: '提示',
      message: '是否要举报?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          handler: () => {
            //console.log('Cancel clicked');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.jubao();
          }
        }
      ]
    });
    alert.present();
  }

  //打开ta资料
  openTA(){
    let modal = this.modalCtrl.create(MedataPage,{
      id:this.datas['uid']
    });
    modal.present();
  }

  close() {
    this.viewCtrl.dismiss();
  }

}
