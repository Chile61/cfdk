import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var videolistPage = (function () {
    function videolistPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    videolistPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-videolist',
                    templateUrl: 'videolist.html'
                },] },
    ];
    /** @nocollapse */
    videolistPage.ctorParameters = [
        { type: NavController, },
    ];
    return videolistPage;
}());
