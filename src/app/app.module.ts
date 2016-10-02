import { NgModule } from '@angular/core';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MePage } from '../pages/me/me';
import { myBasePage } from '../pages/myBase/myBase';
import { SharePage } from '../pages/share/share';
import { MyPopOverPage } from '../pages/pop/pop';
import { QuestionPage } from '../pages/question/question';
import { TipsPage } from '../pages/tips/tips';
import { sendWorkPage } from '../pages/sendWork/sendWork';
import { QuestionInPage } from '../pages/question_in/question_in';
import { TipsInPage } from '../pages/tips_in/tips_in';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MePage,
    myBasePage,
    SharePage,
    MyPopOverPage,
    TipsPage,
    QuestionPage,
    sendWorkPage,
    QuestionInPage,
    TipsInPage,

  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    MePage,
    myBasePage,
    SharePage,
    MyPopOverPage,
    TipsPage,
    QuestionPage,
    sendWorkPage,
    QuestionInPage,
    TipsInPage,

  ],
  providers: []
})
export class AppModule {}
