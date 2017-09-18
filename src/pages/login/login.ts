import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events, Config, ToastController } from 'ionic-angular';

import { Users } from "../../providers/users";
import { API } from "../../providers/api";
import { Components } from "../../providers/components";

import { Signup } from '../signup/signup';
import { ForgetPass } from '../forget-pass/forget-pass';
import { TabsPage } from "../tabs/tabs";
import { PassengerHome } from "../passenger-home/passenger-home";
import { Network } from "@ionic-native/network";



//@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  type: any;
  id: any;

  username: any;
  password: any;
  loginload: boolean = false;
  Token: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: API,
    public users: Users,
    public com: Components,
    public alertCtrl: AlertController,
    public events: Events,
    private config: Config,
    public network: Network,
    private toastCtrl: ToastController
  ) {

  }

  ionViewDidLoad() {

    this.users
      .getToken()
      .then((val) => {
        this.Token = val;
        console.log('current token=' + this.Token);
      })

  }

  goSignup() {
    this.navCtrl.push(Signup);
  }

  goForgetPass() {
    this.navCtrl.push(ForgetPass)

  }


  userToken() {
    this.events.publish('user:getToken');
  }

  userLogin() {
    console.log('user network type', this.network.type);
    if (this.network.type != 'none') {
      this.loginload = true;
      this.users
        .userLogin(this.username, this.password)
        .map(res => res.json())
        .subscribe(data => {
          console.log(data);
          this.Token = data.token;
          Promise.all([
            this.events.publish('user:Login', data),
            this.events.publish('user:getToken', this.Token)
          ]);
        }, error => {
          let errMsg = error.json()[0];
          console.log(errMsg);
          this.loginload = false;
          if (errMsg && errMsg.match('غير مفعل أو ممنوع.')) {
            this.showToast(errMsg.replace(/\<.*\>(.*)\<\/em\>/g, '$1'));
          } else {

            let M = errMsg;
            let D = 2000;
            let P = 'top';
            this.com.Toast(M, D, P);
          }


        }, () => {
          this.loginload = true;
        });
    } else {
      this.showToast('يرجى الاتصال بالانترنت')
    }

  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
  userLogout() {
    this.events.publish('user:Logout', this.Token);
    // this.users.testpromise().then((data) => {
    //   console.log(data);
    // });
  }

  userConnect() {
    this.events.publish('user:Connect', this.Token);
  }


  skipLogging() {
    this.navCtrl.setRoot(TabsPage)
  }
}
