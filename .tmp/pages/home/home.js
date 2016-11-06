import { Component } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { NavController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
import { toutiaoHotListPage } from '../toutiaoHotList/toutiaoHotList';
import { videoPage } from '../video/video';
export var HomePage = (function () {
    function HomePage(navCtrl, http) {
        this.navCtrl = navCtrl;
        this.http = http;
        this.oSwiper = null;
        this.oUser = null;
    }
    //初始化融云
    HomePage.prototype.RongCloudLibPlugin_init = function () {
        var _that = this;
        RongCloudLibPlugin.init({
            appKey: "sfci50a7c59yi" }, function (ret, err) {
            if (ret.status == 'error') {
                alert(err.code);
            }
            else {
                _that.gettoken();
            }
        });
    };
    //生成token
    HomePage.prototype.gettoken = function () {
        var _this = this;
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
        var url = "https://api.cn.rong.io/user/getToken.json";
        this.http.post(url, "userId=1&name=root&portraitUri", {
            headers: this.headers
        })
            .subscribe(function (res) {
            _this.token = res.json()["token"];
            _this.RCconnect();
        });
    };
    //融云连接服务器
    HomePage.prototype.RCconnect = function () {
        var _this = this;
        RongCloudLibPlugin.connect({
            token: this.token
        }, function (ret, err) {
            if (ret.status == 'success') {
                alert(ret.result.userId);
                _this.RCsetOnReceiveMessageListener();
            }
        });
    };
    //设置融云监听
    HomePage.prototype.RCsetOnReceiveMessageListener = function () {
        RongCloudLibPlugin.setOnReceiveMessageListener(function (ret, err) {
            alert(JSON.stringify(ret.result.message));
        });
    };
    //打开养生头条
    HomePage.prototype.pushtoutiaoPage = function () {
        this.navCtrl.push(toutiaoPage);
    };
    //打开热门养生头条
    HomePage.prototype.pushtoutiaoHotListPage = function () {
        this.navCtrl.push(toutiaoHotListPage);
    };
    //打开视频
    HomePage.prototype.pushvideoPage = function () {
        this.navCtrl.push(videoPage);
    };
    HomePage.prototype.ionViewDidEnter = function () {
        if (this.oSwiper == null) {
            this.RongCloudLibPlugin_init();
            this.oSwiper = new Swiper('.swiper-container', {
                loop: true,
                autoplay: 5000,
                autoplayDisableOnInteraction: false,
                // 如果需要分页器
                pagination: '.swiper-pagination',
            });
            this.oUser = new Swiper('.swiper-container-user', {
                slidesPerView: 4,
                paginationClickable: true,
                slidesPerGroup: 4,
                spaceBetween: 6
            });
        }
    };
    HomePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-home',
                    templateUrl: 'home.html'
                },] },
    ];
    /** @nocollapse */
    HomePage.ctorParameters = [
        { type: NavController, },
        { type: Http, },
    ];
    return HomePage;
}());
