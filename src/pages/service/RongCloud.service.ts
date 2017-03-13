import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

declare var RongCloudLibPlugin: any;
declare var SHA1: any;
@Injectable()
export class RongCloudService {

	headers: Headers;

	//融云配置变量
	rand: any;
	now: any;
	token: any;
	Signature:any;

	constructor(public http: Http) {
		//alert(SHA1);
	}


	//初始化融云
	RongCloudLibPlugin_init(_id: any, _name: any) {
		var _that = this;
		RongCloudLibPlugin.init({
			appKey: "sfci50a7sqzqi"
		}, (ret, err)=> {
				if (ret.status == 'error') {
					alert(err.code);
				} else {

					_that.gettoken(_id, _name);
				}

			});
	}

	//生成token
	gettoken(_id: any, _name: any) {

		var time = (Date.now() / 1000);

		this.rand = Math.ceil(Math.random() * 10000000);

		this.now = parseInt(time.toString());
		this.Signature = SHA1("c8cPwRTTPpl" + this.rand.toString() + this.now.toString());
		alert(this.Signature);
		alert(this.rand.toString());
		alert(this.now.toString());
		var _that = this;
		this.headers = new Headers({
			"Content-Type": 'application/x-www-form-urlencoded',
			"App-Key": "sfci50a7sqzqi",
			"Nonce": this.rand.toString(),
			"Timestamp": this.now.toString(),
			"Signature": this.Signature
		});



		let url = "https://api.cn.rong.io/user/getToken.json";
		alert(_id.toString());
		alert(_name.toString());
		this.http.post(url, "userId=" + _id.toString() + "&name=" + _name.toString() + "&portraitUri=" + 'http://www.rongcloud.cn/images/logo.png', {
			headers: this.headers
		})
			.subscribe((res) => {
				alert("token-res:"+JSON.stringify(res));
				_that.token = res.json()["token"];


				_that.mRCconnect();
			});
	}

	//融云连接服务器
	mRCconnect() {
		alert(RongCloudLibPlugin.connect);
		var tk = this.token + '';
		var _that = this;
		alert(tk);
		RongCloudLibPlugin.connect({
			token: tk
		}, function(ret, err) {
			alert(ret + "-ret");
			alert(err + "-err");

			if (ret.status == 'success') {
				alert("融云id：" + ret.result.userId);
				_that.RCsetOnReceiveMessageListener();
			}
		});
		
	}

	//设置融云监听
	RCsetOnReceiveMessageListener() {
		RongCloudLibPlugin.setOnReceiveMessageListener((ret, err) => {
			alert(JSON.stringify(ret.result.message));
		})
	}

}
