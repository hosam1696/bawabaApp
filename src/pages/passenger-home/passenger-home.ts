import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
// Main Components
import {Component} from '@angular/core';
import {Events, IonicPage, NavController, NavParams, ToastController,} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {Districts} from "../districts/districts";
import { Push, PushObject, PushOptions} from '@ionic-native/push';

// Req Pages

//@IonicPage()
@Component({
    selector: 'page-passenger-home',
    templateUrl: 'passenger-home.html',
})
export class PassengerHome {

    name: any;
    cityId: any;
    cities: any;
    showLoader: boolean = true;
    pushObject:PushObject;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public api: API,
        public users: Users,
        public toastCtrl: ToastController,
        public events: Events,
        public push: Push,
        public platform: Platform,
        public network: Network
    ) {
        this.cityId=0;
        // get cities
        this.users.getTaxList('7').then((data) => {
          this.showLoader = false;
          this.cities = data;
          console.log('data', data);
        });
    }


    godistricts(id,name) {
        console.log('city id=', id);
        this.cityId=id;
        this.navCtrl.push(Districts, {cityId: id,cityName:name});
    }

    ionViewWillEnter() {

      this.events.subscribe('passengerHomeCityId',(cityId)=>{
        console.log('City Id data from Event (Districts page)', cityId);
        this.cityId = cityId;
      });



      console.log('Your Network Type','font-size: 18px;padding:5px;border-radius: 5px;color: #fff;background-color: brown',this.network.type)



    }

    ionViewDidLoad() {
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
         this.pushObject = this.push.init(options);
        this.users.getUserInfo().then((data) => {
            if(data)
              this.name = data.name;
            console.log('user name', this.name);
        }).catch(noData=>{
          console.log('No User [visitor]', noData)
        })

        this.pushObject.on('notification').subscribe((notification: any) => console.log('Received a notification', notification));
        
        this.registerUserDeviceToken();
    }


    private registerUserDeviceToken():void {

        let platformType = this.platform.is('ios')?'ios':(this.platform.is('windows')?'windows':'android');
          
                   
        this.pushObject.on('registration').subscribe((registration: any) => {
            console.log('Device registered', registration);
            let deviceData = {
                token: registration.token,
                type: platformType
            };

            this.users
                .registerDeviceToken(deviceData)
                .subscribe(res=>{
                    console.log('device data has saved to db',res);
                } , err =>{
                    console.warn(err.json());
                });
            
        });
        
        this.pushObject.on('error').subscribe(error => console.error('Error with Push plugin', error));
                  
    }

    //    WellcomeMsg() {
    //        let toast = this.toastCtrl.create({
    //            message: 'wellcom back ...',
    //            duration: 1000,
    //            position: 'middle'
    //        });
    //        toast.present();
    //    }


}
