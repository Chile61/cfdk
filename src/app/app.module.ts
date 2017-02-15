import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
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
import { loginPage } from '../pages/login/login';
import { registerPage } from '../pages/register/register';
import { sendqusPage } from '../pages/sendqus/sendqus';
import { sendchartPage } from '../pages/sendchart/sendchart';
import { sendworkPage } from '../pages/sendwork/sendwork';
import { writeworkPage } from '../pages/writework/writework';
import { seequsPage } from '../pages/seequs/seequs';
import { seeworkPage } from '../pages/seework/seework';
import { seechartPage } from '../pages/seechart/seechart';
import { searchPage } from '../pages/search/search';
import { slidesPage } from '../pages/slides/slides';
import { rankingPage } from '../pages/ranking/ranking';


import { RongCloudService } from '../pages/service/RongCloud.service';
import { UserService } from '../pages/service/User.service';
import { Work } from '../pages/service/Work';
import { ContactData } from '../pages/service/ContactData';


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
    loginPage,
    registerPage,
    sendqusPage,
    sendchartPage,
    sendworkPage,
    slidesPage,
    writeworkPage,
    seequsPage,
    seeworkPage,
    searchPage,
    rankingPage,
    seechartPage,
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
    loginPage,
    registerPage,
    sendqusPage,
    sendchartPage,
    sendworkPage,
    slidesPage,
    writeworkPage,
    seequsPage,
    seeworkPage,
    searchPage,
    rankingPage,
    seechartPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, RongCloudService, UserService, Work, ContactData]
})
export class AppModule {}
