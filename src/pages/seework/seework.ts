import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, PopoverController, Content, LoadingController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { writecommentPage } from '../writecomment/writecomment';
import { UserService } from '../service/User.service';
import { PopoverPage } from '../PopoverPage/PopoverPage';
import { loginPage } from '../login/login';

declare var PhotoSwipe: any;
declare var PhotoSwipeUI_Default: any;
@Component({
  selector: 'page-seework',
  templateUrl: 'seework.html'
})
export class seeworkPage {
  @ViewChild(Content) content: Content;
  datas = {};
  banner = '';
  gallery: any = null;
  pswpElement: any = null;
  comment: any = [];
  loading: any;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, private navParams: NavParams, public userService: UserService, public popoverCtrl: PopoverController) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
      content: '加载中，稍等...'
    });
    this.getwork();
  }

  //获取作品数据
  getwork() {

    this.loading.present();

    let url = "http://www.devonhello.com/cfdk/seeworkdata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.navParams.get('id'), {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.datas = res.json()[0];
        this.banner = this.datas["ubanner"].img;
        //alert(this.datas["ubanner"].img);
        //this.pswpElementInit();
        //this.gallery.init();
        this.getquecomment();
      });


  }

  doInfinite(infiniteScroll) {

    setTimeout(() => {

      infiniteScroll.complete();
    }, 500);
  }

  pswpElementInit(ind) {

    if (this.pswpElement == null) {
      this.pswpElement = document.querySelectorAll('.pswp')[0];
    }

    // build items array
    var items: any = [
      {
        src: this.banner,
        w: this.datas["ubanner"].width,
        h: this.datas["ubanner"].height,
        title: this.datas["utitle"]
      }
    ];
    var len = this.datas["uimg"].length;
    for (var i = 0; i < len; i++) {
      var objs = {};
      objs["src"] = this.datas["uimg"][i]["img"];
      objs["w"] = this.datas["uimg"][i]["width"];
      objs["h"] = this.datas["uimg"][i]["height"];
      objs["title"] = "步骤 " + (i + 1) + "：" + this.datas["uimg"][i]["write"];
      items.push(objs);
    }

    // define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: ind * 1 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    this.gallery = new PhotoSwipe(this.pswpElement, PhotoSwipeUI_Default, items, options);
    this.gallery.init();
  }

  //获取问答数据
  getquecomment() {
    let url = "http://www.devonhello.com/cfdk/see_comment_chart";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.navParams.get('id') + "&type=2", {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if (res.json() != "0") {
          this.comment = res.json();
        }

        this.loading.dismiss();
      });


  }


  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage, {
      datas: this.datas,
      type: 2 + ''
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
        type: 2 + '',
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

}
