import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController } from 'ionic-angular';
import { ImagePicker, Camera } from 'ionic-native';

@Component({
  selector: 'page-tips',
  templateUrl: 'tips.html'
})
export class TipsPage {
  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, private loadingCtrl: LoadingController) {
  }

  send(){

  	let loading = this.loadingCtrl.create({
			content: 'Please wait...'
		});

	loading.present();

	setTimeout(() => {
	    loading.dismiss();
	  }, 4000);
   }

   popView(){
   	this.navCtrl.pop();
   }


  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '添加图片',
      buttons: [
        {
          text: '打开相册',
          role: 'destructive',
          icon:	'md-images',
          handler: () => {
            this.addImg();
          }
        },{
          text: '打开相机',
          role: 'destructive',
          icon:	'md-camera',
          handler: () => {
            this.openCamera();
          }
        },{
          text: '取消',
          role: 'cancel',
          icon:	'md-close',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }


  addImg(){

	ImagePicker.getPictures({}).then((results) => {
	  for (var i = 0; i < results.length; i++) {
	      alert('Image URI: ' + results[i]);
	  }
	}, (err) => { });

  }

  openCamera(){
  	Camera.getPicture({}).then((imageData) => {
	 // imageData is either a base64 encoded string or a file URI
	 // If it's base64:
	 let base64Image = 'data:image/jpeg;base64,' + imageData;
	}, (err) => {
	 // Handle error
	});
  }

}