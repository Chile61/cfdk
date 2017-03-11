import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { RongCloudService } from '../service/RongCloud.service';

declare var window;
declare var JPushPlugin;
@Injectable()
export class UserService {

	public _user: any = {
		uname: "游客"
	};

	isInitJP = false;

	constructor(public rongCloudService: RongCloudService) {

	}

	//设置缓存
	getStorage() {

		NativeStorage.getItem('_user')
			.then(
			data => {
				alert("缓存：" + data._id + "--" + data.uname + "--" + data.usex);
				this._user = data;

				this.rongCloudService.RongCloudLibPlugin_init(this._user._id, this._user._name);
				this.initJPush(this._user._id);
			},
			error => { }
			);
	}

	update(obj: any) {
		this.clear();
		NativeStorage.setItem('_user', obj)
			.then(
			() => {
				//alert("设置成功");
				this.initJPush(this._user._id);
			},
			error => alert('Error storing item')
			);
	}

	//clear
	clear() {
		NativeStorage.clear();
	}
initJPush(id) {


//启动极光推送
    if (window.plugins && window.plugins.jPushPlugin && !this.isInitJP) {
			this.isInitJP = true;
      window.plugins.jPushPlugin.init();
      window.plugins.jPushPlugin.isPushStopped(function (result) {
        if (result == 0) {
          // 开启
          alert("开启");

          window.plugins.jPushPlugin.setAlias(id+"");


          document.addEventListener("jpush.openNotification", (event) => {
            alert(JSON.stringify(event));
          }, false)

        } else {
          // 关闭
          alert("关闭");
        }
      })

    }

    

  }



}