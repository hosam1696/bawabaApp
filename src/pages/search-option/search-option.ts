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
    university: any;
    districts: any;
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

      this.users.getTaxList(9) // university
        .then(res=>{
          console.log('Universities in Search',res);
        });

      this.users.getTaxList(5) //districts
        .then(res=>{
          console.log('Districts In search',res);
        });

    }
    dismiss(university , district) {

        if (university || district) {
            let data = {
                university,
                district
            };

            this.viewCtrl.dismiss(data);
        } else {
            this.viewCtrl.dismiss()
        }

    }


}
