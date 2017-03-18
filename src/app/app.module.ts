import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { SharePage } from '../pages/share/share';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { MePage } from '../pages/me/me';
import { mycollPage } from '../pages/mycoll/mycoll';
import { settingPage } from '../pages/setting/setting';
import { forkPage } from '../pages/fork/fork';
import { MedataPage } from '../pages/medata/medata';
import { toutiaoPage } from '../pages/toutiao/toutiao';
import { toutiaoHotListPage } from '../pages/toutiaoHotList/toutiaoHotList';
import { toutiaoListPage } from '../pages/toutiaoList/toutiaoList';
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
import { chartPage } from '../pages/chart/chart';
import { writecommentPage } from '../pages/writecomment/writecomment';
import { mysendPage } from '../pages/mysend/mysend';
import { seecontPage } from '../pages/seecont/seecont';
import { PopoverPage } from '../pages/PopoverPage/PopoverPage';
import { PopoverPage2 } from '../pages/PopoverPage2/PopoverPage2';


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
    chartPage,
    toutiaoListPage,
    writecommentPage,
    mysendPage,
    seecontPage,
    MedataPage,
    PopoverPage,
    PopoverPage2,
    settingPage,
    forkPage,
    mycollPage,
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
    chartPage,
    toutiaoListPage,
    writecommentPage,
    mysendPage,
    seecontPage,
    MedataPage,
    PopoverPage,
    PopoverPage2,
    settingPage,
    forkPage,
    mycollPage,
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, ContactData, RongCloudService, UserService, Work]
})
export class AppModule {}
