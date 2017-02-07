import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ImagePicker } from 'ionic-native';

@Component({
  selector: 'page-sendchart',
  templateUrl: 'sendchart.html'
})
export class sendchartPage {

  text: string = "";
  hideWhen: any = false;
  images:any[] = [];

  constructor(public navCtrl: NavController) {
    
  }

  //调价图片
  addImg(){

    var _that = this;
    
    ImagePicker.getPictures({
    maximumImagesCount: 3 - _that.images.length,
    quality: 90,
    width: 880,
    height: 880
  }).then((results) => {
      
      for (var i = 0; i < results.length; i++) {
          //alert('Image URI: ' + results[i]);
          _that.images.push( results[i] );
      }
      if( _that.images.length == 3 ){
        _that.hideWhen = true;
      }
    }, (err) => { });
  }

  //发布心情
  send() {
    
  }

}
