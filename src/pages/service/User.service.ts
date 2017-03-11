import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { NavController } from 'ionic-angular';
import { RongCloudService } from '../service/RongCloud.service';
import { seecontPage } from '../seecont/seecont';

declare var window;
declare var JPushPlugin;
@Injectable()
export class UserService {

	public _user: any = {
		uname: "游客"
	};

	isInitJP = false;
	nav: NavController;

	constructor(public rongCloudService: RongCloudService) {

	}

	setnav(nav) {
		this.nav = nav;
		//alert(this.nav);
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

		var _that = this;

		//启动极光推送
		if (window.plugins && window.plugins.jPushPlugin && !this.isInitJP) {
			this.isInitJP = true;
			window.plugins.jPushPlugin.init();
			window.plugins.jPushPlugin.isPushStopped(function (result) {
				if (result == 0) {
					// 开启
					//alert("开启");

					window.plugins.jPushPlugin.setAlias(id + "");

					//监听点击状态栏通知
					document.addEventListener("jpush.openNotification", (event) => {
						//alert(JSON.stringify(event));
						//alert(event["extras"]["cn.jpush.android.EXTRA"]);
						var jpdata = event["extras"]["cn.jpush.android.EXTRA"];

						_that.nav.push(seecontPage, {
							type: jpdata["type"],
							_id: jpdata["_id"],
							artid: jpdata["artid"],
						});


					}, false)

				} else {
					// 关闭
					alert("关闭");
				}
			})

		}



	}



}