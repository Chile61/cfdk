import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NavController, ModalController, LoadingController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
import { toutiaoHotListPage } from '../toutiaoHotList/toutiaoHotList';
import { toutiaoListPage } from '../toutiaoList/toutiaoList';
import { videolistPage } from '../videolist/videolist';
import { searchPage } from '../search/search';
import { rankingPage } from '../ranking/ranking';
import { UserService } from '../service/User.service';
import { seeworkPage } from '../seework/seework';
import { seecontPage } from '../seecont/seecont';
import { MedataPage } from '../medata/medata';


declare var $: any;
declare var Swiper: any;
declare var window;
declare var JPushPlugin;
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',

})
export class HomePage {

  public oSwiper = null;
  public oUser = null;
  alias: string = '111';
  msgList: Array<any> = [];
  work:any = [];
  art:any = [];
  user:any = [];
  loading:any;
  myinfiniteScroll = true;

  public headers: Headers;

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public http: Http, public modalCtrl: ModalController, public userService: UserService) {
    //this.RongCloudS.RongCloudLibPlugin_init();
    //this.initJPush();
    this.loading = this.loadingCtrl.create({
			content: '加载中，稍等...'
		});
    userService.setpage(seecontPage);
    userService.setnav(this.navCtrl);
    this.gethotart();
    
    
  }

  //获取最热头条
  gethotart(){

    this.loading.present();
    
    let url = "http://www.devonhello.com/cfdk/indexarticlelist";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "", {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.art = res.json();
        //this.getquecomment();
        this.getuser();
      });

      
  }

  //获取人气推荐
  getuser(){
    let url = "http://www.devonhello.com/cfdk/indexuserlist";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "", {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.user = res.json();

        setTimeout(()=>{
          this.oUser = new Swiper('.swiper-container-user', {
            slidesPerView: 4,
            paginationClickable: true,
            slidesPerGroup: 4,
            spaceBetween: 6
          });
        },1800);

        //this.getquecomment();
        this.getwork();
      });

      
  }

  //获取最热作品
  getwork(){

    if(!this.myinfiniteScroll){
      this.loading.dismiss();
      return true;
    }

    let url = "http://www.devonhello.com/cfdk/indexworklist";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');

    this.http.post(url, "len="+this.work.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        if(res.json()!="0"){
          this.work = this.work.concat(res.json());
        }else{
          this.myinfiniteScroll = false;
          alert("到底了...");
        }
        
        this.loading.dismiss();
        
      });

      
  }



  //打开菜谱分类／搜索
  pushsearchPage() {
    this.navCtrl.push(searchPage);
  }

  //查看作品详情
  openwork(id) {
    this.navCtrl.push(seeworkPage,{
      id:id
    });
  }

  //打开养生头条
  pushtoutiaoPage(index) {
    alert(index);
    alert(this.art[index]["_id"]);
    this.navCtrl.push(toutiaoPage,{
      id:this.art[index]["_id"]
    });
  }

  //打开排名
  pushrankingPage() {
    this.navCtrl.push(rankingPage);
  }

  //打开热门养生头条
  pushtoutiaoHotListPage() {
    this.navCtrl.push(toutiaoHotListPage);
  }

  //打开养生头条
  pushtoutiaoListPage() {
    this.navCtrl.push(toutiaoListPage);
  }

  //打开视频
  pushvideoPage() {
    this.navCtrl.push(videolistPage);
  }

  //打开ta资料
  openTA(index){
    let modal = this.modalCtrl.create(MedataPage,{
      id:this.user[index]["_id"]
    });
    modal.present();
  }


  ionViewDidEnter() {

    if (this.oSwiper == null) {

      //this.RongCloudLibPlugin_init();


      this.oSwiper = new Swiper('.swiper-container', {
        loop: true,
        autoplay: 5000,
        autoplayDisableOnInteraction: false,
        // 如果需要分页器
        pagination: '.swiper-pagination',
      });

    }

  }

  doInfinite(infiniteScroll) {
    
    this.loading.present();
    this.getwork();
    infiniteScroll.complete();
  }

}
