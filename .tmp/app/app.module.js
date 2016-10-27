import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { SharePage } from '../pages/share/share';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MePage } from '../pages/me/me';
import { toutiaoPage } from '../pages/toutiao/toutiao';
import { toutiaoHotListPage } from '../pages/toutiaoHotList/toutiaoHotList';
export var AppModule = (function () {
    function AppModule() {
    }
    AppModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        MyApp,
                        SharePage,
                        ContactPage,
                        HomePage,
                        TabsPage,
                        MePage,
                        toutiaoPage,
                        toutiaoHotListPage,
                    ],
                    imports: [
                        IonicModule.forRoot(MyApp, {
                            tabsHideOnSubPages: true
                        })
                    ],
                    bootstrap: [IonicApp],
                    entryComponents: [
                        MyApp,
                        SharePage,
                        ContactPage,
                        HomePage,
                        TabsPage,
                        MePage,
                        toutiaoPage,
                        toutiaoHotListPage,
                    ],
                    providers: []
                },] },
    ];
    /** @nocollapse */
    AppModule.ctorParameters = [];
    return AppModule;
}());
