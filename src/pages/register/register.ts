import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { Headers, Http } from '@angular/http';
import { NativeStorage } from 'ionic-native';


@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class registerPage {

  sex: string = "0";
  name: string = "";
  password: string = "";
  password2: string = "";

  public headers: Headers;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public http: Http, public alertCtrl: AlertController) {

  }

  //注册
  register(){
    
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    let url = "http://www.devonhello.com/cfdk/register";

    var headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
		this.http.post(url, "uname="+this.name+"&usex="+this.sex+"&upas="+this.password, {
      headers: headers
    })
			.subscribe((res) => {
				
        if( res.json() == "0" ){
          let alert = this.alertCtrl.create({
            title: '提示!',
            subTitle: '用户名已存在，请重新填写!',
            buttons: ['确定']
          });
          alert.present();
          this.name = "";
        }else{
          var datas = res.json()[0];
          NativeStorage.clear();
          NativeStorage.setItem('_user', datas)
          .then(
            () => this.getS(),
            error => alert('Error storing item')
          );

        }

        
        loading.dismiss();
			});

  }

  //
  getS(){
    NativeStorage.getItem('_user')
    .then(
      data => {alert(data._id+"--"+data.uname+"--"+data.usex),this.navCtrl.pop();},
      error => console.error(error)
    );
  }
  

}
