import { RoutesProvider } from './../../providers/routes';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages

import { Reservation } from '../reservation/reservation';

interface ISerachData {
    cityId: number,
    cityName: string,
    contractId: number,
    contractName: string,
    distId: number,
    distName: string,
    univId: number,
    univName: string,
    vehicleId:number,
    vehicleName: string,
    goAndComeId: number,
    goAndComeName: string
}

//@IonicPage()
@Component({
    selector: 'page-search-results',
    templateUrl: 'search-results.html',
})
export class SearchResults {
    searchData: ISerachData;
    AllSearchedData: any[];
    domain:string;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public api: API,
        public users: Users,
        private routesProvider: RoutesProvider,
    ) {

        this.domain = this.api.url;

        this.searchData = this.navParams.get('searchData');

        console.log('Search Data',this.searchData);

    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        this.users.getSearchResults(
            this.searchData.cityId,
            this.searchData.univId,
          this.searchData.distId
        ).subscribe(data=>{
            console.log(data);

            // map(x=> {return {Nid: x.Nid, title: x.title, Uid: x.Uid, city: x.city, mainImage: x.mainImage.price: x.price}})

            this.AllSearchedData = data;
        }, err=> {
            console.warn(err);
          this.searchData = null;
        })
    }

  ionViewWillLeave() {
    this.events.publish('TransportationunivId', this.searchData.univId)
  }
  goReservation(searchData) {
        this.navCtrl.push(Reservation, {route:searchData} );
  }


  //
    //  goProfile()    {
    //    this.navCtrl.push(ProfilePage)    ;
    //  }


}
