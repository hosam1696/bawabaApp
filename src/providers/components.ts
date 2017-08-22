import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class Components {

  toast:any;

  constructor(
    public http: Http,
    public toastCtrl: ToastController
    ) {
    console.log('Hello Components Provider');
  }

  Toast(M,D,P) {
    this.toast = this.toastCtrl.create({
      message: M,
      duration: D,
      position: P
    });

    this.toast.present();
  }

}
