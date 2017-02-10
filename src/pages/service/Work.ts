import { Injectable } from '@angular/core';

@Injectable()
export class Work {

	public _work = [];

    constructor() {
      for (let x = 0; x < 3; x++) {
       let obj = {};
       //obj["index"] = x;
       obj["img"] = "assets/icon/public/camera.png";
       obj["write"] = "点击输入详细步骤...";
       this._work.push(obj);
     }
  	}

}