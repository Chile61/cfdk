import { Injectable } from '@angular/core';
import { Transfer, FileOpener } from 'ionic-native';
import { Headers, Http } from '@angular/http';

declare var cordova: any;
@Injectable()
export class UpdateService {

	VersionCode: any = '';
	fileTransfer;
	constructor(public http: Http) {
		this.fileTransfer = new Transfer();
		//this.init();
	}

	//下载最新版本
	download() {

		let url = 'http://www.devonhello.com/upload/cfdk/cfdk.apk';
		this.fileTransfer.download(url, cordova.file.externalApplicationStorageDirectory + 'cfdk.apk').then((entry) => {
			//alert('download complete: ' + entry.toURL());

			//打开apk
			FileOpener.open(
				entry.toURL(),
				'application/vnd.android.package-archive'
			);


		}, (error) => {
			// handle error
			alert('error: ' + error);
		});
	}

}