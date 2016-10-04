import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  selector: 'page-question',
  templateUrl: 'question.html'
})
export class QuestionPage {

  text="";

  constructor(public navCtrl: NavController, private http: Http) {
  }

  //提交问题
  postQuestion(){
  	let url = "http://www.devonhello.com/cfdk/post_question";

  	let data = {
					uid: 1,
					uhead: "https://avatars1.githubusercontent.com/u/11835988?v=3&s=100",
					uname: "Devon",
					uquestion: this.text,
					ucomment: 0,
					utime: "10-03",
				};

    this.http.post(url,data).subscribe((res) => {

        alert(res.json());
        alert(JSON.stringify(res.json()));
      
      });
  }

}