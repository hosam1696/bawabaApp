// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";

// Req Pages


@IonicPage()
@Component({
  selector: 'page-default-page',
  templateUrl: 'default-page.html',
})
export class DefaultPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public api: API,
    public users: Users
  ) {
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
  }

}
