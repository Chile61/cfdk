import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, Content, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { writecommentPage } from '../writecomment/writecomment';
import { UserService } from '../service/User.service';
import { PopoverPage } from '../PopoverPage/PopoverPage';
import { PopoverPage2 } from '../PopoverPage2/PopoverPage2';
import { loginPage } from '../login/login';

@Component({
  selector: 'page-seequs',
  templateUrl: 'seequs.html'
})
export class seequsPage {

  @ViewChild(Content) content: Content;
  datas = {

  };
  loading: any;
  hideWhen:any = true;

  comment: any = [];

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, private navParams: NavParams, public userService: UserService, public popoverCtrl: PopoverController) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    this.getque();
  }

  //获取问答数据
  getque() {
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/seequedata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.navParams.get('id'), {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.datas = res.json()[0];
        if(this.datas["uid"] == this.userService._user._id){
          this.hideWhen = false;
          //this.showWhen = false;
        }
        
        this.getquecomment();
      });


  }

  //获取问答数据
  getquecomment() {
    let url = "http://www.devonhello.com/cfdk/see_comment_chart";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.navParams.get('id') + "&type=1", {
      headers: headers
    })
      .subscribe((res) => {

        if (res.json() != "0") {
          this.comment = res.json();
        }
        this.loading.dismiss();
      });


  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      datas: this.datas,
      type: 1 + ''
    });

    popover.present({
      ev: ev
    });
  }

  presentPopover2(ev) {

    let popover = this.popoverCtrl.create(PopoverPage2, {
      datas: this.datas,
      type: 1 + ''
    });

    popover.present({
      ev: ev
    });
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

  opencomment(id, index) {
    if (this.userService._user._id) {
      this.navCtrl.push(writecommentPage, {
        type: 1 + '',
        fid: this.comment[index]['uid'],
        fhead: this.comment[index]['uhead'],
        fname: this.comment[index]['uname'],
        ftext: this.comment[index]['utext'],
        artid: this.datas['_id'],
        utid: this.comment[index]['uid'],
        nid: id
      });
    } else {
      this.navCtrl.push(loginPage);
    }
  }


  ionViewDidLeave(){
    this.loading.dismiss();
  }

}
