// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ViewController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages


//@IonicPage()
@Component({
    selector: 'page-notifications-detail',
    templateUrl: 'notifications-detail.html',
})
export class NotificationsDetail {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public viewCtrl: ViewController,
        public api: API,
        public users: Users
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }



}
