import { Component } from '@angular/core';
import { NavController, ActionSheetController } from 'ionic-angular';
import { Camera } from 'ionic-native';

@Component({
  selector: 'page-sendwork',
  templateUrl: 'sendwork.html'
})
export class sendworkPage {

  title: string = "";
  text: string = "";

  items = [];

  banner = "assets/img2/home_work_3.jpeg";

  isReordering: boolean = false;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
    for (let x = 0; x < 5; x++) {
       this.items.push(x);
     }
  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }

  edit(){
    this.isReordering = !this.isReordering;
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: '图片来源',
      buttons: [
        {
          text: '相册',
          icon:  'images',
          handler: () => {
           
            this.workbanner(0);
          }
        },{
          text: '相机',
          icon:  'camera',
          handler: () => {
            
            this.workbanner(1);
          }
        },{
          text: '取消',
          role: 'cancel',
          ionic: 'close',
          handler: () => {
            
          }
        }
      ]
    });
    actionSheet.present();
  }

  //成品图片
  workbanner(type){
    Camera.getPicture({
      quality:90,
      allowEdit:true,
      sourceType:type,
      correctOrientation:true,
    }).then((imageData) => {
      this.banner = imageData;
      alert(imageData);
    }, (err) => {
    // Handle error
    });
  }

  //发布问题
  send() {
    
  }

}
