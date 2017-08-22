// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, AlertController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages
import {SearchOption} from '../search-option/search-option';



//import { Reservation } from '../reservation/reservation';


@IonicPage()
@Component({
    selector: 'page-company-path',
    templateUrl: 'company-path.html',
})
export class CompanyPath {
    x: any;
    y: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
        public alertCtrl: AlertController,
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

    searchoption() {
        let searchoptionModal = this.modalctrl.create(SearchOption);
        searchoptionModal.present();
        searchoptionModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }

}



