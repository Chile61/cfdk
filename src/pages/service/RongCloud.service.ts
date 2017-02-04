import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

declare var RongCloudLibPlugin: any;
declare var SHA1: any;
@Injectable()
export class RongCloudService {

    public headers: Headers;
    
    //融云配置变量
	public rand: any;
	public now: any;
	public token: any;

    constructor(public http: Http) {
      
  }

	
    //初始化融云
  RongCloudLibPlugin_init(_id:any,_name:any){
    var _that = this;
    RongCloudLibPlugin.init({
      appKey: "sfci50a7c59yi"},
    function(ret, err){
      if (ret.status == 'error'){
        alert(err.code);
      }else{
        
        _that.gettoken(_id,_name);
      }
        
    });
  }

  //生成token
  gettoken(_id:any,_name:any){
    
    var time = (Date.now() / 1000);
    
		this.rand = Math.ceil(Math.random() * 10000000);
    
		this.now = parseInt(time.toString());
    

		this.headers = new Headers({
			"Content-Type": "application/x-www-form-urlencoded",
			"App-Key": "sfci50a7c59yi",
			"Nonce": this.rand.toString(),
			"Timestamp": this.now.toString(),
			"Signature": SHA1("7yPJfy1ssm" + this.rand.toString() + this.now.toString())
		});

    

    let url = "https://api.cn.rong.io/user/getToken.json";
		this.http.post(url, "userId="+_id+"&name="+_name+"&portraitUri", {
				headers: this.headers
			})
			.subscribe((res) => {
				this.token = res.json()["token"];

				
				this.RCconnect();
			});
  }

  //融云连接服务器
	RCconnect() {
    
		RongCloudLibPlugin.connect({
				token: this.token
			},
			(ret, err) => {
				if(ret.status == 'success') {
					alert("融云id："+ret.result.userId);
					this.RCsetOnReceiveMessageListener();
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