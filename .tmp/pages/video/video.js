import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var videoPage = (function () {
    function videoPage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    videoPage.decorators = [
        { type: Component, args: [{
                    selector: 'page-video',
                    templateUrl: 'video.html'
                },] },
    ];
    /** @nocollapse */
    videoPage.ctorParameters = [
        { type: NavController, },
    ];
    return videoPage;
}());
