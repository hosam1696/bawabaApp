import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { Users } from "../../providers/users";
import { API } from "../../providers/api";
import { Components } from "../../providers/components";

import { Signup } from '../signup/signup';
import { Login } from '../login/login';


//@IonicPage()
@Component({
  selector: 'page-forget-pass',
  templateUrl: 'forget-pass.html',
})
export class ForgetPass {

  type: any;
  id: any;
  headerimg: any;
  username:any;
  password:any;
  loginload:any;
  Token:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: API,
    public users: Users,
    public com: Components,
    public alertCtrl: AlertController,
    public events: Events
  ) {
    this.loginload = false ;
  }

  ionViewDidEnter(){
    console.log('enter');
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    console.log('load');
    // Run After Page Already Loaded
    this.headerimg = '../assets/img/ba_logo.png';

    Promise.all([
      this.users.getToken().then((val) => {
        this.Token = val;
      })
    ]).then(() => {
      console.log('current token='+this.Token);
    });
  }

  goSignup(){
    this.navCtrl.push(Signup);
  }

  gologin(){
    this.navCtrl.setRoot(Login);
  }


  userConnect(){
    this.events.publish('user:Connect',this.Token);
  }

}
