// Main Components
import {API} from "../../providers/api";
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";

// Req Pages
import {SearchResults} from "../search-results/search-results";

//@IonicPage()
@Component({
    selector: 'page-transportation',
    templateUrl: 'transportation.html',
})
export class Transportation {


    showLoader: boolean = true;
    loginload:boolean = false;
    vehicles: any;
    contracts: any;
    goAndComes: any;
    goAndCome: any;
    vehicle: any;
    contract: any;
  temp: any;
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


  ionViewWillLeave() {
    console.warn('you are about to leave this page [University Home]');
    this.events.publish('TransportationunivId', this.navParams.get('univId'));
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
            vehicleId: this.vehicle.split(',')[0],
            vehicleName: this.vehicle.split(',')[1],
            contractId: this.contract.split(',')[0],
            contractName: this.contract.split(',')[1],
            goAndComeId: this.goAndCome.split(',')[0],
            goAndComeName: this.goAndCome.split(',')[1]
        };
        console.log(' this.vehicle', this.vehicle);
        console.log('this.contractId', this.contract);
        console.log('this.goAndComeId', this.goAndCome);
        console.log('temp', this.temp);
        this.navCtrl.push(SearchResults, {searchData: this.temp});
    }


}
