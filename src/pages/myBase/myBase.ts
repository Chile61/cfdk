import { Component } from '@angular/core';
import { NavController, ActionSheetController} from 'ionic-angular';
import { ImagePicker, Camera } from 'ionic-native';

@Component({
  selector: 'page-myBase',
  templateUrl: 'myBase.html'
})
export class myBasePage {
	
	myDate = '2002-09-23T15:03:46.789';

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择头像',
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
	 alert( imageData );
	}, (err) => {
	 // Handle error
	});
  }

  
  
}