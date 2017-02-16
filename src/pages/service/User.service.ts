import { Injectable } from '@angular/core';
import { NativeStorage } from 'ionic-native';
import { RongCloudService } from '../service/RongCloud.service';

@Injectable()
export class UserService {

	public _user: any = {
		uname: "游客"
	};

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

			},
			error => alert('Error storing item')
			);
	}

	//clear
	clear() {
		NativeStorage.clear();
	}


}