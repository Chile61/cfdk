import { Injectable } from '@angular/core';

@Injectable()
export class Work {

  public _work = [];

  constructor() {
    this.init();

  }

  init() {

    this._work = [];

    for (let x = 0; x < 3; x++) {
      let obj = {};
      //obj["index"] = x;
      obj["img"] = "assets/icon/public/camera.png";
      obj["write"] = "点击输入详细步骤...";
      obj["ishasimg"] = false;
      obj["isupload"] = false;
      obj["width"] = 0;
      obj["height"] = 0;
      this._work.push(obj);
    }
  }

}