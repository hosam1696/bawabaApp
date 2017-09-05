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
import {LocalUser} from "../../app/appconf/app.interfaces";
import {Signup} from "../signup/signup";
import {TermsPage} from "../terms/terms";

import {SocialSharing} from '@ionic-native/social-sharing';

//@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class Settings {

  name:any;
  email:any;
  uid:any;
  role:any;
  Token:any;
  userInfo: any;
  logOutSpinner: boolean = false;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public actionSheetCtrl: ActionSheetController,
    public modalCtrl: ModalController,
    public api: API,
    public users: Users,
    private social: SocialSharing
  ) {
  }

  ionViewDidEnter() {
    // Run After Page Already Entered

      this.FillUserInfo();

  }

  ionViewDidLoad() {
    // Run After Page Already Loaded
    Promise.all([
      this.users.getToken(),
      this.users.getUserInfo()
    ]).then((data) => {
      this.Token = data[0];
      let  userInfo = data[1];
      this.userInfo = userInfo;
      console.log('settings promise resolve');
      console.group();

      console.info(this.Token, userInfo)
    });
  }

  Logout() {

    this.logOutSpinner = true;

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


  FillUserInfo() {
    this.users.getUserInfo()
      .then((data:LocalUser)=>{
        this.name = data.name;
        this.email = data.email;
        this.uid  = data.uid;
        this.role = data.roles[4]?'transporter':'passenger';
      })
      .catch(err=>{
        console.warn(err, '\n', 'No Local User in Storage');

      })
  }
  contactus(){
    let ContactusModal = this.modalCtrl.create(Contactus, { constactData: {uid: this.uid, name: this.name, email: this.email }});
    ContactusModal.present();
    ContactusModal.onDidDismiss(data => {
      console.log('Data from Modal',data);
      this.FillUserInfo();

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

  shareApp() {

    this.social.share('حمل تطبيق بوابة النقل من خلال هذه الروابط','http://is4.mzstatic.com/image/thumb/Purple18/v4/14/7c/cc/147ccc54-5384-f17e-85ab-152e5420b59f/source/175x175bb.jpg', 'https://goo.gl/W1eeRU')
    .then((data)=> {
      console.log(data);
    }
  )

    /*
    let actions = this.actionSheetCtrl.create({
      title: 'مشاركة عبر',
      buttons: [
        {
          icon: 'facebook',
          text: 'فيسبوك',
          handler: () => {
            console.log('share with facebook');

            //TODO: Detect user platform type
            this.social.shareViaFacebook('حمل تطبيق بوابة النقل من خلال هذه الروابط', 'http://is4.mzstatic.com/image/thumb/Purple18/v4/14/7c/cc/147ccc54-5384-f17e-85ab-152e5420b59f/source/175x175bb.jpg', 'https://goo.gl/W1eeRU').then(data => {
              console.log(data);
            })
              .catch(err => {
                console.warn(err);
              })
          }
        }, {
          icon: 'twitter',
          text: 'تويتر',
          handler: () => {

            console.log('share with twitter');
            this.social.shareViaTwitter('حمل تطبيق بوابة النقل من خلال هذه الروابط', 'http://is4.mzstatic.com/image/thumb/Purple18/v4/14/7c/cc/147ccc54-5384-f17e-85ab-152e5420b59f/source/175x175bb.jpg', 'https://goo.gl/W1eeRU').then(data => {
              console.log(data);
            })
              .catch(err => {
                console.warn(err);
              })
          }
        }
      ]
    });

    actions.present();

    */
  }

    toSignup() {
    this.navCtrl.push(Signup)
    }
  toLogin() {
    this.navCtrl.setRoot(Signup)
  }

  toTerms() {
    this.navCtrl.push(TermsPage)
  }
}
