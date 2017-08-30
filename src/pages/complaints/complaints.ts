// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, ModalController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages
import {ComplaintsReply} from "../complaints-reply/complaints-reply";
//import { ComplaintsReply } from '..complaints-reply/complaints-reply';

//@IonicPage()
@Component({
    selector: 'page-complaints',
    templateUrl: 'complaints.html',
})
export class Complaints {
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalCtrl: ModalController,
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

    goComplaintsReply() {
        //        this.navCtrl.push(ComplaintsReply);
        let ComplaintsReplyModal = this.modalCtrl.create(ComplaintsReply);
        ComplaintsReplyModal.present();
        ComplaintsReplyModal.onDidDismiss(data => {
            console.log(data);
        });
    }

}
