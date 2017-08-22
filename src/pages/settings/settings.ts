// Main Components
import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController } from 'ionic-angular';

// Providers
import { Users } from "../../providers/users";
import { API } from "../../providers/api";

// Req Pages
import { Contactus } from "../contactus/contactus";
import { ProfilePage } from "../profile/profile";
import { Complaints } from "../complaints/complaints";
import { EditProfile } from "../edit-profile/edit-profile";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  name:any;
  mail:any;
  uid:any;
  role:any;
  Token:any;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public api: API,
    public users: Users
  ) {
  }

  ionViewDidEnter() {
    // Run After Page Already Entered
    Promise.all([
      this.users.getUserInfo(),
      this.users.getToken()
    ]).then((data) => {
      console.log(data);
      this.Token = data[0].token;
      this.name = data[0].name;
      this.uid = data[0].uid;
      this.mail = data[0].mail
      if (data[0].rid == 4) this.role = 'Transporter';
      else if (data[0].rid == 5) this.role = 'Passenger';
    })
  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
    Promise.all([
      this.users.getToken().then((val) => {
        this.Token = val;
      })
    ]).then(() => {
      console.log('current token='+this.Token);
    });
  }

  Logout() {
    this.events.publish('user:Logout',this.Token);
  }

  changeLang(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Choose Language',
      buttons: [
        {
          text: 'Arabic',
          handler: () => {
            this.events.publish('lang:Changed',('ar'));
          }
        },
        {
          text: 'English',
          handler: () => {
            this.events.publish('lang:Changed',('en'));
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  }

  contactus(){
    let ContactusModal = this.modalCtrl.create(Contactus, { uid: this.uid });
    ContactusModal.present();
    ContactusModal.onDidDismiss(data => {
      console.log(data);
    });
  }

  goProfile(){
    this.navCtrl.push(ProfilePage);
  }
  goComplaints(){
    this.navCtrl.push(Complaints);
  }
    goEditProfile() {
        let EditProfileModal = this.modalCtrl.create(EditProfile);
        EditProfileModal.present();
        EditProfileModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    
}
