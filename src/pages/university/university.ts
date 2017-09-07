// Main Components
import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController,} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";


// Req Pages
import {Transportation} from "../transportation/transportation"
import {SearchResults} from "../search-results/search-results";
import {AppUtils} from "../../app/appconf/app.utils";

//@IonicPage()
@Component({
  selector: 'page-university',
  templateUrl: 'university.html',
})
export class University {

  isOnline:boolean = true;
  showLoader: boolean = true;
  university: any;
  UnivId: number;
  cityId: number;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public api: API,
              public users: Users,
              public toastCtrl: ToastController,
              public events: Events,
              public appUtils: AppUtils
              ) {


    this.cityId = this.navParams.get('cityId');


    //get Univirsities
    /*this.users.getTaxList('9').then((data) => {
        this.showLoader = false;
        this.university = data;
        console.log('data', data);
    });*/
  }

  goTransportation(univId, univName) {
    let temp = {
      cityId: this.navParams.get('cityId'),
      cityName: this.navParams.get('cityName'),
      distId: this.navParams.get('distId'),
      distName: this.navParams.get('distName'),
      univId: univId,
      univName: univName
    };
    console.log('temp', temp);
    this.navCtrl.push(SearchResults, {searchData: temp});
  }


  getUniversities() {
    this.users.getUniversitiesByCity(this.cityId)
      .subscribe(
        uniData => {

          console.log('Universityies in City ', uniData);

          this.university = uniData;

        }, err => {
          this.showLoader = false;
          console.warn(err.json())
        }, () => {
          this.showLoader = false;
        });

  }
  ionViewWillEnter() {
    // Run After Page Already Entered


    this.events.subscribe('TransportationunivId', (univId) => {
      this.UnivId = univId
    })
  }

  ionViewDidLoad() {
    if (this.appUtils.IsConnected) {

      this.appUtils.OnConnection(
        ()=> {
          this.getUniversities()
        },()=> {
          this.isOnline = false;
          this.appUtils.watchOnConnect(()=> { // watch when the user will be connected
            this.isOnline = true;
          })
        }
      )

    } else {
      this.isOnline = false;
    }

  }

  ionViewWillLeave() {
    console.warn('you are about to leave this page [University Page]');
    this.events.publish('UniversityDistId', this.navParams.get('distId')); // send Dist Id to Districts page
  }


}
