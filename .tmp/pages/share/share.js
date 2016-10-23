import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var SharePage = (function () {
    function SharePage(navCtrl) {
        this.navCtrl = navCtrl;
        this.pet = "new1";
    }
    SharePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-share',
                    templateUrl: 'share.html'
                },] },
    ];
    /** @nocollapse */
    SharePage.ctorParameters = [
        { type: NavController, },
    ];
    return SharePage;
}());
