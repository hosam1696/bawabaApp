// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";
import { Components } from "../../providers/components";

// Req Pages

//@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class Contactus {

  uid:any;
  mestitle:any;
  mesbody:any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: API,
    public users: Users,
    public components: Components
  ) {
    this.uid = navParams.get('userId');
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
    // console.log(this.api.UserGateway);
    console.log(this.uid);
    console.log(this.mestitle);
    console.log(this.mesbody);
    // this.users.sendMessage(this.api.UserGateway,this.uid,this.mestitle,this.mesbody)
    // .map(response => response.json()).subscribe(data => {
    //   if(data.status == 'success'){
    //     let M = 'Your Message Sent';
    //     let D = 3000;
    //     let P = 'top';
    //     this.components.presentToast(M,D,P);
    //     this.dismiss(data);

    //   } else {
    //     let M = 'Error Happened';
    //     let D = 3000;
    //     let P = 'top';
    //     this.components.presentToast(M,D,P);
    //   }
    // });

//     Promise.all([this.users.sendMessage(this.api.UserGateway,this.uid,this.mestitle,this.mesbody)]).then((data) => {
//         if(data[0]==true){
//         let M = 'Your Message Sent';
//         let D = 3000;
//         let P = 'top';
//         this.components.presentToast(M,D,P);
//         this.dismiss(data);

//       } else {
//         let M = 'Error Happened';
//         let D = 3000;
//         let P = 'top';
//         this.components.presentToast(M,D,P);
//       }
//     });
   }

//   dismiss(data) {
//    this.viewCtrl.dismiss(data);
//  }

}
