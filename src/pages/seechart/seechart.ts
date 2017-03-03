import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Headers, Http } from '@angular/http';

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

  constructor(public navCtrl: NavController, public http: Http, private navParams: NavParams) {
    this.getchart();
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
      });


  }

  doInfinite(infiniteScroll) {
    this.gallery.init();
    setTimeout(() => {

      infiniteScroll.complete();
    }, 500);
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

}
