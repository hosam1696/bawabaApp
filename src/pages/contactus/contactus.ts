// Main Components
import { Component } from '@angular/core';
import {IonicPage, NavController, ViewController, NavParams, ToastController} from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";
import { Components } from "../../providers/components";
import {getUserConfigFile} from "@ionic/app-scripts";

// Req Pages

//@IonicPage()
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html',
})
export class Contactus {

  uid:any;
  subject:any;
  message:any;
  userContactData: any;
  userLabel: string;
  constructor(
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public api: API,
    public users: Users,
    public components: Components,
    public toastCtrl: ToastController
  ) {
    this.userContactData = this.navParams.get('contactData');

    console.log('user Contact data', this.userContactData);

    if(this.userContactData.userLabel)
      this.userLabel = this.userContactData.userLabel;
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

  async Send(){
    // console.log(this.api.UserGateway);
    console.log(this.userContactData);
    console.log(this.subject);
    console.log(this.message);

    if (this.subject && this.message && this.message.trim() != ''  && this.subject.trim() != '') {
      console.log(' you have entered the followings', this.message, this.subject);

      let contactData = {
        ...this.userContactData,
        subject: this.subject,
        message: this.message
      };

      this.users
        .contactUs(contactData, await this.users.getToken())
        .subscribe(
          data=> {
            console.log(data);
            this.showToast(data[0], () => {
              this.viewCtrl.dismiss()
            })
          },
          err => {
            console.warn(err.json());
            if (err.json()[0] == "CSRF validation failed") {
              this.users.userToken()
                .map(res => res.json())
                .subscribe(data => {
                  this.users.saveToken(data.Token);
                  this.Send();
                })
            }
          }
        )

    } else {
      if(!this.subject || this.subject.trim() == '') {
        this.showToast('يرجى ادخال موضوع للرسالة')
      } else {
        this.showToast('يرجى ادخال نص للرسالة')
      }
    }
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

  showToast(msg, callback?: any) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });

    toast.onDidDismiss(callback);
    toast.present();
  }

}
