import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-questionIn',
  templateUrl: 'question_in.html'
})
export class QuestionInPage {
	
	id;
	Qus={
		"name":"",
		"head":"",
		"qus":"",
		"comment":"",
		"time":"",    
	};
	PL;

  constructor(public navCtrl: NavController, private navParams: NavParams, private http: Http) {
  	 this.id = navParams.get('id');
  	 this.getQus();
  	 this.getPL();
  }

  //获取问题内容
  getQus(){
  	let url = "http://www.devonhello.com/cfdk/qus_all/"+this.id;
    this.http.get(url).subscribe((res) => {

        this.Qus = res.json()[0];
      
      });
  }

  //获取评论
  getPL(){
  	let url = "http://www.devonhello.com/cfdk/qus_pl/"+this.id;
    this.http.get(url).subscribe((res) => {

        this.PL = res.json();
      
      });
  }

}