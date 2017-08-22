import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';

import { Users } from "../../providers/users";
import { API } from "../../providers/api";
import { Components } from "../../providers/components";

import { Signup } from '../signup/signup';
import { ForgetPass } from '../forget-pass/forget-pass';



@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {

  type: any;
  id: any;

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

  goForgetPass(){
    this.navCtrl.push(ForgetPass)
    
  }


  userToken(){
    this.events.publish('user:getToken');
  }

  userLogin() {
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
        let M = error.statusText;
        let D = 2000;
        let P = 'top';
        this.com.Toast(M, D, P);
      });
  }

  userLogout(){
    this.events.publish('user:Logout',this.Token);
    // this.users.testpromise().then((data) => {
    //   console.log(data);
    // });
  }

  userConnect(){
    this.events.publish('user:Connect',this.Token);
  }

}