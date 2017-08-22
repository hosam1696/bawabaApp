// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages

import { Reservation } from '../reservation/reservation';


@IonicPage()
@Component({
    selector: 'page-search-results',
    templateUrl: 'search-results.html',
})
export class SearchResults {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
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


  goReservation() {
        this.navCtrl.push(Reservation);
    } 
    

    //     
    //  goProfile()    {
    //    this.navCtrl.push(ProfilePage)    ;
    //  }


}
