import { Headers, Http } from '@angular/http';
import { NavController } from 'ionic-angular';
export declare class HomePage {
    navCtrl: NavController;
    http: Http;
    oSwiper: any;
    oUser: any;
    rand: any;
    now: any;
    token: any;
    headers: Headers;
    constructor(navCtrl: NavController, http: Http);
    RongCloudLibPlugin_init(): void;
    gettoken(): void;
    RCconnect(): void;
    RCsetOnReceiveMessageListener(): void;
    pushtoutiaoPage(): void;
    pushtoutiaoHotListPage(): void;
    pushvideoPage(): void;
    ionViewDidEnter(): void;
}
