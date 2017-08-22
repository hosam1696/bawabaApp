// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";


// Req Pages
import {Transportation} from "../transportation/transportation"

@IonicPage()
@Component({
    selector: 'page-university',
    templateUrl: 'university.html',
})
export class University {


    showLoader: boolean = true;
    university: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public api: API,
        public users: Users,
        public toastCtrl: ToastController
    ) {

        //get Univirsities
        this.users.getTaxList('9').then((data) => {
            this.showLoader = false;
            this.university = data;
            console.log('data', data);
        });
    }

    goTransportation(univId,univName) {
        let temp = {
            cityId: this.navParams.get('cityId'),
            cityName: this.navParams.get('cityName'),
            distId: this.navParams.get('distId'),
            distName: this.navParams.get('distName'),
            univId: univId,
            univName: univName
        };
             console.log('temp', temp);
        this.navCtrl.push(Transportation,temp);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {


    }



}
