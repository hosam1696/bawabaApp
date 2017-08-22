// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages
import {SearchResults} from "../search-results/search-results";

@IonicPage()
@Component({
    selector: 'page-transportation',
    templateUrl: 'transportation.html',
})
export class Transportation {


    showLoader: boolean = true;

    vehicles: any;
    contracts: any;
    goAndComes: any;
    goAndComeId: any;
    vehicleId: any;
    contractId: any;
    temp: any
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public api: API,
        public users: Users
    ) {

        //get Vehicles
        this.users.getTaxList('2').then((data) => {
            this.showLoader = false;
            this.vehicles = data;
            console.log('data', data);
        });

        //get Contracts
        this.users.getTaxList('4').then((data) => {
            this.showLoader = false;
            this.contracts = data;
            console.log('data', data);
        });

        //get Go and Come
        this.users.getTaxList('8').then((data) => {
            this.showLoader = false;
            this.goAndComes = data;
            console.log('data', data);
        });
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded

    }

    setValue( value) {
        this.temp = {name: value};
        console.log('value',value);
    }
    goresults() {

        this.temp = {
            cityId: this.navParams.get('cityId'),
            cityName: this.navParams.get('cityName'),
            distId: this.navParams.get('distId'),
            distName: this.navParams.get('distName'),
            univId: this.navParams.get('univId'),
            univName: this.navParams.get('univName'),
            vehicleId: this.vehicleId,
            contractId: this.contractId,
            goAndComeId: this.goAndComeId
        };
        console.log(' this.vehicleId', this.vehicleId);
        console.log('this.contractId', this.contractId);
        console.log('this.goAndComeId', this.goAndComeId);
        console.log('temp', this.temp);
        this.navCtrl.push(SearchResults, this.temp);
    }


}
