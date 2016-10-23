import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { SharePage } from '../share/share';
import { MePage } from '../me/me';
import { ContactPage } from '../contact/contact';
export var TabsPage = (function () {
    function TabsPage() {
        // this tells the tabs component which Pages
        // should be each tab's root Page
        this.tab1Root = HomePage;
        this.tab2Root = SharePage;
        this.tab3Root = ContactPage;
        this.tab4Root = MePage;
    }
    TabsPage.decorators = [
        { type: Component, args: [{
                    templateUrl: 'tabs.html'
                },] },
    ];
    /** @nocollapse */
    TabsPage.ctorParameters = [];
    return TabsPage;
}());
