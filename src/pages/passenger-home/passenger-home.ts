import {Component} from '@angular/core';
import {Platform, Events, NavController, NavParams, ToastController,} from 'ionic-angular';
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {Districts} from "../districts/districts";
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {Network} from "@ionic-native/network";


//@IonicPage()
@Component({
  selector: 'page-passenger-home',
  templateUrl: 'passenger-home.html',
})
export class PassengerHome {
  isOnline: boolean = true;
  name: string;
  cityId: number = 0;
  cities: any;
  showLoader: boolean = true;
  pushObject: PushObject;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public api: API,
      public users: Users,
      public toastCtrl: ToastController,
      public events: Events,
      public push: Push,
      public platform: Platform,
      public network: Network) {

  }


  ionViewWillEnter() {

    this.events.subscribe('passengerHomeCityId', (cityId) => {
      console.log('City Id data from Event (Districts page)', cityId);
      this.cityId = cityId;
    });

    console.log('%c%s', 'font-size: 18px;padding:5px;border-radius: 5px;color: #fff;background-color: brown', 'Your Network Type',this.network.type)

  }

  ionViewDidLoad() {

    if (this.network.type ) {


      this.getCities();  // Get Available Cities

      this.getUserInfo(); // Get Stored User Info

      this.network
        .onDisconnect()
        .subscribe(data=> {
          this.Online = false;
          this.network
            .onConnect()
            .subscribe(
              connection => {
                console.info(connection);
                this.Online = true;
                this.getCities();
                this.getUserInfo(); // check if there is a user data stored in Storage
              },
              err => {
                console.warn(err.json());
              })
        })

    } else { // detect if the user is not connected to WIFI
      this.Online = false;

      this.network
        .onConnect()
        .subscribe(
          connection => {
            console.info(connection);
            this.Online = true;
            this.getCities();
            this.getUserInfo(); // check if there is a user data stored in Storage
            },
            err => {
              console.warn(err.json());
          })
    }

    /*
    this.network

      .onchange()
      .subscribe(
        dataForm=>{
          console.log('network change value' ,dataForm);
      })*/

  }

  private registerUserDeviceToken(): void {
    const options: PushOptions = {
      android: {
        senderID: '12345679'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {},
      browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
      }
    };

    let platformType = this.platform.is('ios') ? 'ios' : (this.platform.is('windows') ? 'windows' : 'android');

    this.pushObject = this.push.init(options);

    this.pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));

    this.pushObject.on('registration').subscribe((registration: any) => {
      console.log('Device registered', registration);
      let deviceData = {
        token: registration.token,
        type: platformType
      };

      this.users
        .registerDeviceToken(deviceData)
        .subscribe(res => {
          console.log('device data has saved to db', res);
        }, err => {
          console.warn(err.json());
        });

    });

    this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));

  }

  private getCities():void {
    // get cities
    this.users.getTaxList('7')
      .then((data) => {
        this.showLoader = false;
        this.cities = data;
        console.log('data', data);
    });
  }

  private set Online(isOnlineStatus: boolean) {
    this.isOnline = isOnlineStatus
  }

  private getUserInfo():void {
    this.users
      .getUserInfo() // Check if there is a logged in user
      .then((userData) => {

        if (userData) this.name = userData.name;

        console.log('user name', this.name);

        this.registerUserDeviceToken();

      }).catch(noData => {
      console.log('No User [visitor]', noData)
    });
  }

  godistricts(id, name) {
    console.log('city id=', id);
    this.cityId = id;
    this.navCtrl.push(Districts, {cityId: id, cityName: name});
  }

}
