import { Injectable } from '@angular/core';

@Injectable()
export class ContactData {

	_data:any = [];
	_num:any = 0;
	othat:any = null;

	constructor() {

	}

	//设置未读数
	setNum(Num){
		this._num = Num;
		alert("未读数："+this._num);
	}

	//设置会话列表
	setList(data){
		this._data = data;
	}

	setThat(that){
		this.othat = that;
	}

}