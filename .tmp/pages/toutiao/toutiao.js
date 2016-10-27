import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var toutiaoPage = (function () {
    function toutiaoPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    toutiaoPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-toutiao',
                    templateUrl: 'toutiao.html'
                },] },
    ];
    /** @nocollapse */
    toutiaoPage.ctorParameters = [
        { type: NavController, },
    ];
    return toutiaoPage;
}());
