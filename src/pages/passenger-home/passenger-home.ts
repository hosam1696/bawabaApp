// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController, } from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {Districts} from "../districts/districts";


// Req Pages

@IonicPage()
@Component({
    selector: 'page-passenger-home',
    templateUrl: 'passenger-home.html',
})
export class PassengerHome {

    name: any;
    cityId: any;
    cities: any;
    showLoader: boolean = true;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public api: API,
        public users: Users,
        public toastCtrl: ToastController
    ) {
this.cityId=0;
// get cities 
        this.users.getTaxList('7').then((data) => {
            this.showLoader = false;
            this.cities = data;
            console.log('data', data);
        });
    }


    godistricts(id,name) {
        console.log('city id=', id);
        this.cityId=id;
        this.navCtrl.push(Districts, {cityId: id,cityName:name});
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
        console.log('this.cityId',this.cityId);

    }

    ionViewDidLoad() {

        Promise.all([this.users.getUserInfo()]).then((data) => {
            this.name = data[0].user.name;
        });


    }

    //    WellcomeMsg() {
    //        let toast = this.toastCtrl.create({
    //            message: 'wellcom back ...',
    //            duration: 1000,
    //            position: 'middle'
    //        });
    //        toast.present();
    //    }


}
