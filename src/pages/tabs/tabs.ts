import {Component, ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Tabs } from "ionic-angular/navigation/nav-interfaces";
import { Login } from '../login/login';
import { Signup } from '../signup/signup';
import { TransporterHome } from '../transporter-home/transporter-home';
import { PassengerHome } from '../passenger-home/passenger-home';
import { Routes } from '../routes/routes';
import { Settings } from '../settings/settings';
import { Tickets } from '../tickets/tickets';
import { ProfilePage } from '../profile/profile';
import { Notifications } from '../notifications/notifications';

import { Users } from "../../providers/users";

//@IonicPage()
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  @ViewChild('tabs') MainTabs:Tabs;
  isTransporter: any = false;
  isPassenger: any = false;
  isAdmin: any = false;
  TransporterTab1:any;
  TransporterTab2:any;
  TransporterTab3:any;
  TransporterTab4:any;
  TransporterTab5:any;
  PassengerTab1:any;
  PassengerTab2:any;
  PassengerTab3:any;
  PassengerTab4:any;
  PassengerTab5:any;
  AdminTab1:any;
  Token: any;
  isVistor:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public users: Users
  ) {
  }

  ionViewDidLoad() {
    console.log('Tabs Loaded');
    Promise.all([
      this.users.getToken().then((val) => {
        this.Token = val;
      }),
      this.getUserType()
    ]).then(() => {
      console.log('current token='+this.Token);
    });

    console.log('tabs viewdidload')
  }

  ionViewDidEnter(){
    console.log('tabs viewdidenter')
  }

  getUserType() {
    this.users.getUserInfo()
      .then((data) => {
      if (data&&data.roles[4] == 'transporter') {
        this.isTransporter = true ;
        // Transporter Tabs
        this.TransporterTab1 = TransporterHome; // Routes
        this.TransporterTab2 = ProfilePage; // ProfilePage
        this.TransporterTab3 = Tickets; // Tickets
        this.TransporterTab4 = Notifications;   // notification
        this.TransporterTab5 = Settings;   // Settings

      } else if (data&&data.roles[5] == 'passenger') {
        this.isPassenger = true ;
        // Passenger Tabs
        this.PassengerTab1 = PassengerHome; // Home
        this.PassengerTab2 = ProfilePage; // ProfilePage
        this.PassengerTab3 = Tickets; // Tickets
        this.PassengerTab4 = Notifications; // notification
        this.PassengerTab5 = Settings; // Settings
      } else if (data&&data.roles[3] == 'administrator') {
        this.AdminTab1 = Settings;
      } else {
        this.isVistor = true ;
        // Passenger Tabs
        this.PassengerTab1 = PassengerHome; // Home
        this.PassengerTab2 = ProfilePage; // ProfilePage
        this.PassengerTab3 = Settings; // Tickets
      }
    }).catch(noData=>{

      console.log('Nodata', noData);
      this.isVistor = true ;
      this.MainTabs.select(0,{isNavRoot:true}, true);
      console.log(this.isVistor);
      // Passenger Tabs
      this.PassengerTab1 = PassengerHome; // Home
      this.PassengerTab2 = ProfilePage; // ProfilePage
      this.PassengerTab3 = Settings; // Tickets

    })

  }

}
