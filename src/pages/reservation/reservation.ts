// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController,ViewController, NavParams, ToastController, AlertController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {Components} from "../../providers/components";
import {LocalUser} from "../../app/appconf/app.interfaces";
import {Signup} from "../signup/signup";
import {Login} from "../login/login";

// Req Pages


//@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class Reservation {
  loggedUserData: LocalUser;
  transporterRoute: any;
  username: string = '';
  phone: string = '';
  showLoader: boolean = false;
  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public api: API,
              public users: Users,
              public components: Components,
              public alertCtrl: AlertController,
              public toastCtrl: ToastController) {

    this.transporterRoute = this.navParams.get('route');

    console.log('reservation Route Details', this.transporterRoute);

  }

  ionViewDidEnter() {
    // Run After Page Already Entered

  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
    this.users.getUserInfo()
      .then(userData => {
        console.log(userData);
        this.loggedUserData = userData;
        this.username = userData.name;
        this.phone = userData.phoneNumber;
      }).catch(noUserErr=>{
        console.log('No user is logging limit services availabele', noUserErr)
    })


  }

  async ConfirmBooking() {

    if (this.loggedUserData) {
      this.showLoader = true;
      let userToken = await this.users.getToken();

      let ticketData = {
        uid: this.loggedUserData.uid,
        name: this.username,
        mobile: this.phone,
        route_id: this.transporterRoute.Nid
      };

      this.users
        .BookTicket(ticketData, userToken)
        .subscribe(res => {
          console.log(res);
          if (res.status) {
            this.showToast('تم حجز النذكرة',()=>{
              this.navCtrl.pop();
            })
          }
        }, err => {
          console.warn(err.json());
          this.showToast('يرجى المحاولة مرة اخرى');
          this.showLoader = false;
        }, () => {
          this.showLoader = false;
        })

    } else {
        let alert = this.alertCtrl.create({
          title: 'تسجيل الدخول',
          message: 'يرجى تسجيل الدخول لحجز تذكرة',
          buttons: [{
              text: 'تسجيل الدخول',
              handler: ()=> {
                this.navCtrl.setRoot(Login);
              }
            }, {
            text: 'تسجيل حساب جديد',
              handler: ()=> {
              this.navCtrl.push(Signup);
              }
            }
          ]
        }).present();
    }


  }


  showToast(msg, callback?: any) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 1500
    });
    toast.onDidDismiss(callback);

    toast.present();
  }



}
