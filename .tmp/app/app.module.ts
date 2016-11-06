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
import { videoPage } from '../pages/video/video';
import { videolistPage } from '../pages/videolist/videolist';


@NgModule({
  declarations: [
    MyApp,
    SharePage,
    ContactPage,
    HomePage,
    TabsPage,
    MePage,
    toutiaoPage,
    toutiaoHotListPage,
    videoPage,
    videolistPage,
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true
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
    videoPage,
    videolistPage,
  ],
  providers: []
})
export class AppModule {}
