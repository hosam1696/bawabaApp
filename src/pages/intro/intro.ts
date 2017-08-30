import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';

import { Login } from '../login/login';
import { Signup } from '../signup/signup';

import { API } from '../../providers/api';

//@IonicPage()
@Component({
  selector: 'page-intro',
  templateUrl: 'intro.html',
})
export class Intro {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public api: API,
    public events: Events
  ) {
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
  }

  changeLang(lang){
    this.events.publish('lang:Changed', lang);
  }

  goLogin(type,id){
    this.navCtrl.push(Login,{
      type: type,
      id: id
    });
  }

  goSignup(){
    this.navCtrl.push(Signup);
  }

}
