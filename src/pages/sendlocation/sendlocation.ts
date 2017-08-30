// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {Components} from "../../providers/components";

// Req Pages


//@IonicPage()
@Component({
    selector: 'page-sendlocation',
    templateUrl: 'sendlocation.html',
})
export class SendLocation {

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public api: API,
        public users: Users,
        public components: Components
    ) {
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
    }

    dismiss() {
        this.viewCtrl.dismiss();
    }
}
