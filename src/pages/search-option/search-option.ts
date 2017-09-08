// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages


//@IonicPage()
@Component({
    selector: 'page-search-option',
    templateUrl: 'search-option.html',
})
export class SearchOption {
    AllUniversity: any;
    AllDistricts: any;
    AllCities: any;
    CityModel:any;
    DistrictModel:any;
    UniversityModel:any;
  showDistrictsLoader:boolean =false;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public api: API,
        public users: Users
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
      this.users.getTaxList('7')
        .then(cities=> {
          this.AllCities = cities
        })
      /*this.users.getTaxList(9) // university
        .then(res=>{
          console.log('Universities in Search',res);
        });

      this.users.getTaxList(5) //districts
        .then(res=>{
          console.log('Districts In search',res);
        });*/

    }

  cityChange(val) {

      if (val != this.CityModel) {
        console.log('Value changed',val);
        this.CityModel = val;
        this.showDistrictsLoader = true;
        this.users.getDistrictsByCity(val.split(',')[0])

          .subscribe(data => {
            console.log(data);
            this.AllDistricts = data;
            this.showDistrictsLoader = false
          });

        this.users.getUniversitiesByCity(val.split(',')[0])

          .subscribe(data => {
            console.log(data);
            this.AllUniversity = data;

          })

      }

  }

    dismiss(city, university , district) {

      console.log(this.CityModel, this.UniversityModel, this.DistrictModel);
      if (city||university || district) {
        let data:any = {};
        if(city)data['city']=city.split(',')[1];
        if(university)data['university']=university;

        if(district)data['district']=district;

            this.viewCtrl.dismiss(data);
        } else {
            this.viewCtrl.dismiss()
        }

    }


}
