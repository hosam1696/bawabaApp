// Main Components
import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, AlertController } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";

// Req Pages
import { RoutesNewPage } from "../routes-new/routes-new";

@IonicPage()
@Component({
  selector: 'page-routes',
  templateUrl: 'routes.html',
})
export class Routes {

  userRoutes:any;
  noData:any = true;

  constructor(
    public navCtrl: NavController,
    public modalCtrl: ModalController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public api: API,
    public users: Users
  ) {
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded 
    this.users.getUserRoutes(0).then((data) => {
      this.noData = false;
      this.userRoutes = data;
    });   
  }

  openRoute(r_uuid){
    this.users.getNode(r_uuid).then((data) => {
      console.log(data);
    });
  }

  newRoute(){
    let newRouteModal = this.modalCtrl.create(RoutesNewPage);
    newRouteModal.present();
  }



}
