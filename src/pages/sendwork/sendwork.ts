import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, AlertController } from 'ionic-angular';
import { Camera, Transfer } from 'ionic-native';
import { Work } from '../service/Work';
import { writeworkPage } from '../writework/writework';

@Component({
  selector: 'page-sendwork',
  templateUrl: 'sendwork.html'
})
export class sendworkPage {


  title: string = "";
  text: string = "";

  loading = null;

  url = "http://www.devonhello.com/cfdk/upload";

  fileTransfer = new Transfer();

  items = [];
  foods = [];

  banner = "assets/icon/public/camera.png";
  bannerisup = false;

  isReordering: boolean = false;

  constructor(public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public work: Work, public loadingCtrl: LoadingController, public alertCtrl: AlertController) {
    this.init();
  }

  //步骤初始化
  init() {
    this.items = this.work._work;
    let obj = {};
    obj["fname"] = "";
    obj["fnum"] = "";
    this.foods.push(obj);
    this.loading = this.loadingCtrl.create({
      content: '图片上传中，请稍后...'
    });
  }

  reorderItems(indexes) {
    let element = this.items[indexes.from];
    this.items.splice(indexes.from, 1);
    this.items.splice(indexes.to, 0, element);
  }

  edit() {
    this.isReordering = !this.isReordering;
  }

  //填写步骤
  write(index) {
    //alert(index);
    this.navCtrl.push(writeworkPage, {
      index: index,
      write: this.items[index]["write"] == "点击输入详细步骤..." ? "" : this.items[index]["write"]
    });
  }

  //添加步骤图
  addImg(index) {
    this.presentActionSheet(index);
  }

  presentActionSheet(index) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '图片来源',
      buttons: [
        {
          text: '相册',
          icon: 'images',
          handler: () => {
            switch (index) {
              case -1:
                this.workbanner(0);
                break;
              default:
                alert(index);
                this.itembanner(index, 0);
                break;
            }

          }
        }, {
          text: '相机',
          icon: 'camera',
          handler: () => {
            switch (index) {
              case -1:
                this.workbanner(1);
                break;
              default:
                alert(index);
                this.itembanner(index, 1);
                break;
            }

          }
        }, {
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
  itembanner(index, type) {
    Camera.getPicture({
      quality: 90,
      allowEdit: true,
      sourceType: type,
      correctOrientation: true,
    }).then((imageData) => {
      this.work._work[index]["img"] = imageData;
      this.work._work[index]["ishasimg"] = true;
      this.upload(imageData, index);

      alert(this.work._work);
    }, (err) => {
      // Handle error
    });
  }

  //成品图片
  workbanner(type) {
    Camera.getPicture({
      quality: 90,
      allowEdit: true,
      sourceType: type,
      correctOrientation: true,
    }).then((imageData) => {
      this.banner = imageData;
      this.upload(imageData, -1);
    }, (err) => {
      // Handle error
    });
  }

  //添加步骤
  additem() {
    let obj = {};
    //obj["index"] = x;
    obj["img"] = "assets/icon/public/camera.png";
    obj["write"] = "点击输入详细步骤...";
    this.work._work.push(obj);
  }

  //添加食材
  addfood() {
    let obj = {};
    obj["fname"] = "";
    obj["fnum"] = "";
    this.foods.push(obj);
  }

  //删除步骤
  deleitem(index) {
    alert(index);
  }

  //发布问题
  send() {

    this.checkup();

    //alert(JSON.stringify(this.items));
  }

  //j检测图片是否全部上传
  checkup() {

    if (!this.bannerisup && this.banner != "assets/icon/public/camera.png") {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: "成品图上传失败，请重新选择",
        buttons: ['确定']
      });
      alert.present();
      return true;
    }

    if (!this.foods[0]["fname"] || !this.foods[0]["fnum"]) {
      let alert = this.alertCtrl.create({
        title: '提示!',
        subTitle: "食材填写完整，至少一种食材",
        buttons: ['确定']
      });
      alert.present();
      return true;
    }

    for (let i = 0; i < this.items.length; i++) {
      if (!this.work._work[i]["isupload"] && this.work._work[i]["ishasimg"]) {
        let alert = this.alertCtrl.create({
          title: '提示!',
          subTitle: "步骤图第 " + i + 1 + " 张上传失败，请重新选择",
          buttons: ['确定']
        });
        alert.present();
        break;
      }
    }


  }

  upload(dataurl, index) {

    this.loading.present();



    this.fileTransfer.upload(dataurl, this.url, {}).then((data) => {
      //alert(data["response"]);
      alert(index);
      if (index != -1) {
        this.work._work[index]["img"] = "http://7xp2ia.com1.z0.glb.clouddn.com/" + data["response"];
        this.work._work[index]["isupload"] = true;
      } else {
        this.banner = "http://7xp2ia.com1.z0.glb.clouddn.com/" + data["response"];
        this.bannerisup = true;
      }

      alert(JSON.stringify(this.items));
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      alert("出错啦");
    });
  }



}
