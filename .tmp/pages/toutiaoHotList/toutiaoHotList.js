import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { toutiaoPage } from '../toutiao/toutiao';
export var toutiaoHotListPage = (function () {
    function toutiaoHotListPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    //打开养生头条
    toutiaoHotListPage.prototype.pushtoutiaoPage = function () {
        this.navCtrl.push(toutiaoPage);
    };
    toutiaoHotListPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-toutiaoHotList',
                    templateUrl: 'toutiaoHotList.html'
                },] },
    ];
    /** @nocollapse */
    toutiaoHotListPage.ctorParameters = [
        { type: NavController, },
    ];
    return toutiaoHotListPage;
}());
