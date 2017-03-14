import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { seeworkPage } from '../seework/seework';
import { UserService } from '../service/User.service';
import { Headers, Http } from '@angular/http';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class searchPage {

  items:any=[];

  constructor(public navCtrl: NavController, public userService: UserService, public http: Http) {
    userService.setnav(this.navCtrl);
    
  }

  //
  ionInput(ev: any) {
    if(ev.target.value){
      //alert(ev.target.value);
      this.items = [];
      this.search(ev.target.value);
    }
    
  }

  search(val){
    var url = "http://www.devonhello.com/cfdk/search";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    this.http.post(url, "name="+val+"&len="+this.items.length, {
      headers: headers
    })
      .subscribe((res) => {
        //alert(JSON.stringify(res.json()));
        this.items = res.json();
      });
  }

  //查看菜谱
  openwork(index) {
    
    this.navCtrl.push(seeworkPage,{
      id:this.items[index]['_id']
    });
  }
}
