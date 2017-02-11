import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen, NativeStorage } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { slidesPage } from '../pages/slides/slides';

import { UserService } from '../pages/service/User.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,public userService: UserService) {
    NativeStorage.getItem('_onlyone')
			.then(
				data => {
					this.rootPage = TabsPage;
				},
				error => {
					this.rootPage = slidesPage;
          NativeStorage.setItem('_onlyone', 1)
            .then(
            () => {
              //alert("设置成功");
            },
            error => alert('Error storing item')
          );
				}
			);
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
