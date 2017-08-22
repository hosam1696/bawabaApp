// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";

// Req Pages

@IonicPage()
@Component({
  selector: 'page-routes-view',
  templateUrl: 'routes-view.html',
})

export class RoutesViewPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutesViewPage');
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

}
