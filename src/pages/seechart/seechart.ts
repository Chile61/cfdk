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
        alert(JSON.stringify(res.json()));
        this.datas = res.json()[0];
        this.pswpElementInit();
      });


  }

  doInfinite(infiniteScroll) {
    this.gallery.init();
    setTimeout(() => {

      infiniteScroll.complete();
    }, 500);
  }

  pswpElementInit() {
    var pswpElement = document.querySelectorAll('.pswp')[0];

    // build items array
    var items = [
      {
        src: 'https://placekitten.com/600/400',
        w: 600,
        h: 400
      },
      {
        src: 'https://placekitten.com/1200/900',
        w: 1200,
        h: 900
      }
    ];

    // define options (if needed)
    var options = {
      // optionName: 'option value'
      // for example:
      index: 0 // start at first slide
    };

    // Initializes and opens PhotoSwipe
    this.gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
    
  }

}
