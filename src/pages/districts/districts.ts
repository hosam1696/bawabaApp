// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
// Req Pages
import {University} from "../university/university";


@IonicPage()
@Component({
    selector: 'page-districts',
    templateUrl: 'districts.html',
})
export class Districts {


    showLoader: boolean = true;
    districts: any;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public api: API,
        public users: Users,
        public toastCtrl: ToastController
    ) {

        // get Districts
        this.users.getTaxList('5').then((data) => {
            this.showLoader = false;
            this.districts = data;
            console.log('data', data);
        });
    }

    gouniversity(distId, distName) {

        let temp = {
            cityId: this.navParams.get('cityId'),
            cityName: this.navParams.get('cityName'),
            distId: distId,
            distName: distName

        };
        console.log('temp', temp);
        this.navCtrl.push(University, temp);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {


    }



}
