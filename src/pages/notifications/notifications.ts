// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages
import {NotificationsDetail} from '../notifications-detail/notifications-detail';


//@IonicPage()
@Component({
    selector: 'page-notifications',
    templateUrl: 'notifications.html',
})
export class Notifications {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
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
        NotificationsDetail() {
        let NotificationsDetailModal = this.modalctrl.create(NotificationsDetail);
        NotificationsDetailModal.present();
        NotificationsDetailModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })

    }



}
