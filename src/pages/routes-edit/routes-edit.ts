// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";

// Req Pages

//@IonicPage()
@Component({
  selector: 'page-routes-edit',
  templateUrl: 'routes-edit.html',
})
export class RoutesEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutesEditPage');
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

}
