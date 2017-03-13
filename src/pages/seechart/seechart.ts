import { Component } from '@angular/core';
import { NavController, NavParams, PopoverController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { writecommentPage } from '../writecomment/writecomment';
import { UserService } from '../service/User.service';
import { PopoverPage } from '../PopoverPage/PopoverPage';

declare var PhotoSwipe: any;
declare var PhotoSwipeUI_Default: any;
@Component({
  selector: 'page-seechart',
  templateUrl: 'seechart.html'
})
export class seechartPage {

  datas = {

  };

  gallery:any;
  pswpElement:any = null;
  comment:any = [];

  constructor(public navCtrl: NavController, public http: Http, private navParams: NavParams, public userService: UserService,public popoverCtrl: PopoverController) {
    userService.setnav(this.navCtrl);
    this.getchart();
  }

  presentPopover(ev) {

    let popover = this.popoverCtrl.create(PopoverPage,{
      datas: this.datas,
      type:3+''
    });

    popover.present({
      ev: ev
    });
  }

  //获取问答数据
  getchart() {
    let url = "http://www.devonhello.com/cfdk/seechartdata";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id=" + this.navParams.get('id'), {
      headers: headers
    })
      .subscribe((res) => {
        this.datas = res.json()[0];
        //alert(JSON.stringify(res.json()));
        this.getquecomment();
      });


  }


  pswpElementInit(ind) {
    
    if(this.pswpElement==null){
      this.pswpElement = document.querySelectorAll('.pswp')[0];
    }

    // build items array
    var items:any = [];
    var len = this.datas["uimg"].length;
    for(var i=0; i<len; i++){
        var objs = {};
        objs["src"] = "http://7xp2ia.com1.z0.glb.clouddn.com/"+this.datas["uimg"][i]["img"];
        objs["w"] = this.datas["uimg"][i]["width"];
        objs["h"] = this.datas["uimg"][i]["height"];
        objs["title"] = this.datas["utext"];
       items.push(objs); 
    }

    // define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: ind*1 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    this.gallery = new PhotoSwipe(this.pswpElement, PhotoSwipeUI_Default, items, options);
    this.gallery.init();
  }

  //获取问答数据
  getquecomment(){
    let url = "http://www.devonhello.com/cfdk/see_comment_chart";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "id="+this.navParams.get('id')+"&type=3", {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.comment = res.json();
      });

      
  }


  opencomment(id,index){
    
    this.navCtrl.push(writecommentPage, {
      type: 3+'',
      fid:this.comment[index]['uid'],
      fhead:this.comment[index]['uhead'],
      fname:this.comment[index]['uname'],
      ftext:this.comment[index]['utext'],
      artid: this.datas['_id'],
      utid:this.comment[index]['uid'],
      nid:id
    });
  }

}
