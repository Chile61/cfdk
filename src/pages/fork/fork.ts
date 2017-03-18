import { Component, ViewChild } from '@angular/core';
import { NavController, LoadingController, Content, ModalController } from 'ionic-angular';
import { UserService } from '../service/User.service';
import { Headers, Http } from '@angular/http';
import { MedataPage } from '../medata/medata';


@Component({
  selector: 'page-fork',
  templateUrl: 'fork.html'
})
export class forkPage {
  @ViewChild(Content) content: Content;

  loading:any;
  arr:any = [];

  constructor(public loadingCtrl: LoadingController, public navCtrl: NavController, public userService: UserService, public http: Http, public modalCtrl: ModalController) {
    userService.setnav(this.navCtrl);
    this.loading = this.loadingCtrl.create({
			content: '加载中，稍等...'
		});
    this.getdata();
  }

  getdata(){
    this.loading.present();
    let url = "http://www.devonhello.com/cfdk/myfork";

      var headers = new Headers();
      headers.append('Content-Type', 'application/x-www-form-urlencoded');
      
      this.http.post(url, "id="+ this.userService._user._id, {
        headers: headers
      })
      .subscribe((res) => {
          //alert(JSON.stringify(res.json()));
          this.arr = res.json();
          this.loading.dismiss();
        });
  
  }

  openta(id){
    let modal = this.modalCtrl.create(MedataPage,{
      id:id
    });
    modal.present();
  }

  //点击到顶部
  tapEvent(e) {
    this.content.scrollToTop();
  }

  ionViewDidLeave(){
    this.loading.dismiss();
  }

}
