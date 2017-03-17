import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { ContactData } from '../service/ContactData';

declare var RongCloudLibPlugin: any;
declare var SHA1: any;
declare var RongIMClient: any;
declare var RongIMLib: any;
@Injectable()
export class RongCloudService {

	headers: Headers;

	//融云配置变量
	rand: any;
	now: any;
	token: any;
	Signature: any;

	constructor(public http: Http, public contactData: ContactData) {

	}


	webRongIMClient() {
		RongIMClient.init("sfci50a7sqzqi");
		var _that = this;
		RongIMClient.setConnectionStatusListener({
			onChanged: function (status) {
				switch (status) {
					//链接成功
					case RongIMLib.ConnectionStatus.CONNECTED:
						//alert('链接成功');

						_that.webgetRemoteConversationList();
						break;
					//正在链接
					case RongIMLib.ConnectionStatus.CONNECTING:
						//alert('正在链接');
						break;
					//重新链接
					case RongIMLib.ConnectionStatus.DISCONNECTED:
						//alert('断开连接');
						break;
					//其他设备登录
					case RongIMLib.ConnectionStatus.KICKED_OFFLINE_BY_OTHER_CLIENT:
						alert('其他设备登录');
						break;
					//网络不可用
					case RongIMLib.ConnectionStatus.NETWORK_UNAVAILABLE:
						alert('网络不可用');
						break;
				}
			}
		});


		// 消息监听器
		RongIMClient.setOnReceiveMessageListener({
			// 接收到的消息
			onReceived: function (message) {
				// 判断消息类型
				switch (message.messageType) {
					case RongIMClient.MessageType.TextMessage:
						// 发送的消息内容将会被打印
						alert(message.content.content);
						_that.webgetTotalUnreadCount();
						_that.webgetRemoteConversationList();
						break;
				}
			}
		});
	};

	//获取某回话的未读数
	webgetUnreadCount(targetId) {
		RongIMClient.getInstance().getUnreadCount(0, targetId, {
			onSuccess: function (count) {
				//alert("count:" + count);
			},
			onError: function (error) {
			}
		});
	}

	//获取历史信息
	webgetRemoteHistoryMessages(targetId, count) {
		RongIMLib.RongIMClient.getInstance().getRemoteHistoryMessages(0, targetId, null, count, {
			onSuccess: function (list, hasMsg) {
				alert(list);
				//list 历史消息数组，hasMsg为boolean值，如果为true则表示还有剩余历史消息可拉取，为false的话表示没有剩余历史消息可供拉取。
			},
			onError: function (error) {
				//getRemoteHistoryMessages error
			}
		});
	}

	//获取会话列表
	webgetRemoteConversationList() {
		var _that = this;
		RongIMClient.getInstance().getRemoteConversationList({
			onSuccess: function (list) {
				//list 会话列表
				alert("会话列表:" + JSON.stringify(list));
				_that.contactData.setList(list);
				_that.webgetTotalUnreadCount();
			},
			onError: function (error) {
				//getRemoteConversationList error
			}
		}, null);
	}

	//发送信息
	websendMessage(targetId, content, extra) {
		alert(content);
		// 定义消息类型,文字消息使用 RongIMLib.TextMessage
		var msg = new RongIMLib.TextMessage({ content: content+'', extra: extra });
		//或者使用RongIMLib.TextMessage.obtain 方法.具体使用请参见文档
		//var msg = RongIMLib.TextMessage.obtain("hello");
		var conversationtype = 0; //RongIMLib.ConversationType.PRIVATE; // 私聊
		//var targetId = "xxx"; // 目标 Id
		RongIMClient.getInstance().sendMessage(conversationtype, targetId+'', msg, {
			// 发送消息成功
			onSuccess: function (message) {
				//message 为发送的消息对象并且包含服务器返回的消息唯一Id和发送消息时间戳
				alert("Send successfully");
			},
			onError: function (errorCode, message) {
				var info = '';
				switch (errorCode) {
					case RongIMLib.ErrorCode.TIMEOUT:
						info = '超时';
						break;
					case RongIMLib.ErrorCode.UNKNOWN_ERROR:
						info = '未知错误';
						break;
					case RongIMLib.ErrorCode.REJECTED_BY_BLACKLIST:
						info = '在黑名单中，无法向对方发送消息';
						break;
					case RongIMLib.ErrorCode.NOT_IN_DISCUSSION:
						info = '不在讨论组中';
						break;
					case RongIMLib.ErrorCode.NOT_IN_GROUP:
						info = '不在群组中';
						break;
					case RongIMLib.ErrorCode.NOT_IN_CHATROOM:
						info = '不在聊天室中';
						break;
					default:
						//info = x;
						break;
				}
				alert('发送失败:' + info);
			}
		}
		);
	}

	//获取未读数
	webgetTotalUnreadCount() {
		var _that = this;
		RongIMClient.getInstance().getTotalUnreadCount({
			onSuccess: function (count) {
				//alert("count:" + count);
				_that.contactData.setNum(count);
			},
			onError: function (error) {
			}
		});

	}


	//初始化融云
	RongCloudLibPlugin_init(_id: any, _name: any) {

		this.webRongIMClient();
		this.gettoken(_id, _name);
	}


	//生成token
	gettoken(_id: any, _name: any) {

		var time = (Date.now() / 1000);

		this.rand = Math.ceil(Math.random() * 10000000);

		this.now = parseInt(time.toString());
		this.Signature = SHA1("c8cPwRTTPpl" + this.rand.toString() + this.now.toString());
		//alert(this.Signature);
		//alert(this.rand.toString());
		//alert(this.now.toString());
		var _that = this;
		this.headers = new Headers({
			"Content-Type": 'application/x-www-form-urlencoded',
			"App-Key": "sfci50a7sqzqi",
			"Nonce": this.rand.toString(),
			"Timestamp": this.now.toString(),
			"Signature": this.Signature
		});



		let url = "https://api.cn.rong.io/user/getToken.json";
		var postdata = "userId=" + _id.toString() + "&name=" + _name.toString() + "&portraitUri=" + "http://www.rongcloud.cn/images/logo.png";
		//alert(_id.toString());
		//alert(_name.toString());
		//alert(postdata);
		this.http.post(url, postdata, {
			headers: this.headers
		})
			.subscribe((res) => {
				//alert("token-res:" + JSON.stringify(res));
				_that.token = res.json()["token"];
				//alert("token:" + _that.token);

				_that.mRCconnect(_that.token);
				//_that.RCsetOnReceiveMessageListener();
			});
	}

	//融云连接服务器
	mRCconnect(token) {
		//alert("token-2:" + token);
		// 连接融云服务器。
		RongIMClient.connect(token, {
			onSuccess: function (userId) {
				//alert("Login successfully." + userId);
			},
			onTokenIncorrect: function () {
				alert('token无效');
			},
			onError: function (errorCode) {
				var info = '';
				switch (errorCode) {
					case RongIMLib.ErrorCode.TIMEOUT:
						info = '超时';
						break;
					case RongIMLib.ErrorCode.UNKNOWN_ERROR:
						info = '未知错误';
						break;
					case RongIMLib.ErrorCode.UNACCEPTABLE_PaROTOCOL_VERSION:
						info = '不可接受的协议版本';
						break;
					case RongIMLib.ErrorCode.IDENTIFIER_REJECTED:
						info = 'appkey不正确';
						break;
					case RongIMLib.ErrorCode.SERVER_UNAVAILABLE:
						info = '服务器不可用';
						break;
				}
				alert(errorCode);
			}
		});
	}


	//清除指定用户未读消息数
	webclearUnreadCount(targetId) {
		RongIMClient.getInstance().clearUnreadCount(0, targetId, {
			onSuccess: function (isClear) {
				alert(isClear);
			},
			onError: function () {
			}
		});
	}

	//返回用户信息，获取用户指定会话
	webgetConversation(targetId): any {
		RongIMClient.getInstance().getConversation(0, targetId, {
			onSuccess: function (conver) {
				//成功 conver 为Conversation对象
				alert(JSON.stringify(conver));
				return conver;
			},
			onError: function (error) {
				//失败
			}
		});
	}

	//发送信息－快捷发送内容
	websendTextMessaget(targetId, text) {
		alert(targetId);
		alert(text);
		RongIMLib.RongIMClient.getInstance().sendTextMessage(0, targetId+'', text+'', {
			onSuccess: function (data) {
				alert(JSON.stringify(data));
				//=> data {messageUId:"消息唯一Id",timestamp:"发送消息时间戳"}
				alert("SendTextMessage Successfully");
			},
			onError: function (errorcode) {
				alert("SendTextMessage,errorcode:" + errorcode);
			}
		});
	}


}
