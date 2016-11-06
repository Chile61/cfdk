import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
import { toutiaoHotListPage } from '../toutiaoHotList/toutiaoHotList';
import { videoPage } from '../video/video';


declare var $: any;
declare var Swiper: any;
declare var RongCloudLibPlugin: any;
declare var SHA1: any;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public oSwiper = null;
  public oUser = null;

  //融云配置变量
	public rand: any;
	public now: any;
	public token: any;

  public headers: Headers;

  constructor(public navCtrl: NavController, public http: Http) {
      
  }

  //初始化融云
  RongCloudLibPlugin_init(){
    var _that = this;
    RongCloudLibPlugin.init({
      appKey: "sfci50a7c59yi"},
    function(ret, err){
      if (ret.status == 'error'){
        alert(err.code);
      }else{
        
        _that.gettoken();
      }
        
    });
  }

  //生成token
  gettoken(){
    
    var time = (Date.now() / 1000);
    
		this.rand = Math.ceil(Math.random() * 10000000);
    
		this.now = parseInt(time.toString());
    

		this.headers = new Headers({
			"Content-Type": "application/x-www-form-urlencoded",
			"App-Key": "sfci50a7c59yi",
			"Nonce": this.rand.toString(),
			"Timestamp": this.now.toString(),
			"Signature": SHA1("7yPJfy1ssm" + this.rand.toString() + this.now.toString())
		});

    

    let url = "https://api.cn.rong.io/user/getToken.json";
		this.http.post(url, "userId=1&name=root&portraitUri", {
				headers: this.headers
			})
			.subscribe((res) => {
				this.token = res.json()["token"];

				
				this.RCconnect();
			});
  }

  //融云连接服务器
	RCconnect() {
    
		RongCloudLibPlugin.connect({
				token: this.token
			},
			(ret, err) => {
				if(ret.status == 'success') {
					alert(ret.result.userId);
					this.RCsetOnReceiveMessageListener();
				}
			});
	}

  //设置融云监听
	RCsetOnReceiveMessageListener() {
		RongCloudLibPlugin.setOnReceiveMessageListener((ret, err) => {
			alert(JSON.stringify(ret.result.message));
		})
	}

  //打开养生头条
  pushtoutiaoPage(){
    this.navCtrl.push(toutiaoPage);
  }

  //打开热门养生头条
  pushtoutiaoHotListPage(){
    this.navCtrl.push(toutiaoHotListPage);
  }

  //打开视频
  pushvideoPage(){
    this.navCtrl.push(videoPage);
  }


  ionViewDidEnter() {

    if (this.oSwiper == null) {

      this.RongCloudLibPlugin_init();

      this.oSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
      });

      this.oUser = new Swiper('.swiper-container-user', {
        slidesPerView: 4,
        paginationClickable: true,
        slidesPerGroup: 4,
        spaceBetween: 6
      });

      
    }

  }

}
