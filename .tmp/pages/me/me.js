import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
export var MePage = (function () {
    function MePage(navCtrl) {
        this.navCtrl = navCtrl;
    }
    MePage.decorators = [
        { type: Component, args: [{
                    selector: 'page-me',
                    templateUrl: 'me.html'
                },] },
    ];
    /** @nocollapse */
    MePage.ctorParameters = [
        { type: NavController, },
    ];
    return MePage;
}());
