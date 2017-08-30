// Main Components
import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";

// Req Pages

//@IonicPage()
@Component({
  selector: 'page-routes-new',
  templateUrl: 'routes-new.html',
})

export class RoutesNewPage {

  routeTitle: any;
  routeFrom: any;
  routeTo: any;
  routeVehicle: any;
  routeSeats: any;
  routeAvailSeats: any;
  cities: any;
  vehicles: any;
  routepricem: any;
  routepricet: any;
  platenumber: any;

  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    public users: Users
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RoutesNewPage');
    this.users.getTaxList(7).then((data) => {
      this.cities = data;
    });
    this.users.getTaxList(2).then((data) => {
      this.vehicles = data;
    });
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
