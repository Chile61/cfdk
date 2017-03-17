import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { SharePage } from '../share/share';
import { MePage } from '../me/me';
import { ContactPage } from '../contact/contact';
import { UserService } from '../service/User.service';
import { ContactData } from '../service/ContactData';


@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = HomePage;
  tab2Root: any = SharePage;
  tab3Root: any = ContactPage;
  tab4Root: any = MePage;

  _num:any = 0;

  constructor(public userService: UserService,public contactData: ContactData) {
    //this.userService.clear();
    var _that = this;
    
    setTimeout(() => {
      _that.userService.getStorage();
      //_that._num = _that.contactData._num;
      
    }, 2000);
    
  }
}
