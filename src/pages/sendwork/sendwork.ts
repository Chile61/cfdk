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

  banner = "assets/icon/public/camera.png";

  isReordering: boolean = false;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController) {
    this.init();
  }

  //步骤初始化
  init(){
    for (let x = 0; x < 3; x++) {
       let obj = {};
       //obj["index"] = x;
       obj["img"] = "assets/icon/public/camera.png";
       obj["write"] = "点击输入详细步骤...";
       this.items.push(obj);
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

  //填写步骤
  write(index){
    alert(index);
  }

  //添加步骤图
  addImg(index){
    this.presentActionSheet(index);
  }

  presentActionSheet(index) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '图片来源',
      buttons: [
        {
          text: '相册',
          icon:  'images',
          handler: () => {
            switch (index) {
              case -1:
                this.workbanner(0);
                break;
              default:
                alert(index);
                this.itembanner(index,0);
                break;
            }
            
          }
        },{
          text: '相机',
          icon:  'camera',
          handler: () => {
            switch (index) {
              case -1:
                this.workbanner(1);
                break;
              default:
                alert(index);
                this.itembanner(index,1);
                break;
            }
            
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

  //item
  itembanner(index,type){
    Camera.getPicture({
      quality:90,
      allowEdit:true,
      sourceType:type,
      correctOrientation:true,
    }).then((imageData) => {
      this.items[index]["img"] = imageData;
      alert(imageData);
    }, (err) => {
    // Handle error
    });
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

  //添加步骤
  additem(){
    let obj = {};
    //obj["index"] = x;
    obj["img"] = "assets/icon/public/camera.png";
    obj["write"] = "点击输入详细步骤...";
    this.items.push(obj);
  }

  //删除步骤
  deleitem(index){
    alert(index);
  }

  //发布问题
  send() {
    alert(JSON.stringify(this.items));
  }

}
