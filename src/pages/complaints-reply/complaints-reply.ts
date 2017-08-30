// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";

// Req Pages

//@IonicPage()
@Component({
  selector: 'page-complaints-reply',
  templateUrl: 'complaints-reply.html',
})
export class ComplaintsReply {


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: API,
    public users: Users,
  ) {
  }

  ionViewDidEnter(){
    // Run After Page Already Entered
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  Send(){

   }


}
