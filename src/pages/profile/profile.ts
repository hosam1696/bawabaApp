import {LocalUser} from './../../app/appconf/app.interfaces';
// Main Components
import {Component} from '@angular/core';
import {
  IonicPage, NavController, ModalController, ActionSheetController, Events, NavParams,
  ToastController
} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";

// Req Pages
import {Contactus} from "../contactus/contactus";
import {SendLocation} from "../sendlocation/sendlocation";
//import {PassengerHome} from "../passenger-home/passenger-home";
import {EditProfile} from "../edit-profile/edit-profile";
import {GetLocation} from "../get-location/get-location";
import {CompanyPath} from "../company-path/company-path";
import {Signup} from "../signup/signup";
import {Login} from "../login/login";
import {InAppBrowser} from "@ionic-native/in-app-browser";


//@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userLogged: boolean;
  section: string = 'two';
  somethings: any = new Array(20);
  user: LocalUser;
  userLabel: string = '';

  constructor(public navCtrl: NavController,
              public events: Events,
              public navParams: NavParams,
              public modalCtrl: ModalController,
              public users: Users,
              public actionSheetCtrl: ActionSheetController,
              public toastCtrl: ToastController,
              public iab: InAppBrowser) {
    console.log('ionViewDidLoad ProfilePage');
    // this.user={name:''};

  }

  async ionViewWillEnter() {

    try { // If user has been logged in

      this.user = await this.users.getUserInfo();

      this.userLogged = true;

      console.info('UserInfo', this.user);

      let userRole = this.user.roles[4];

      this.detectUserLabel()
    } catch (noUserDataErr) {
      this.userLogged = false;
    }

  }

  private detectUserLabel(): void {
    if (this.user.roles[4] === 'transporter') {
      this.userLabel = this.checkNull(this.user.companyFirstName) + ' ' + this.checkNull(this.user.cmpanyLastName);
      if (this.userLabel.trim() == '')
        this.userLabel = this.user.name;
    } else if (this.user.roles[5] === 'passenger') {
      this.userLabel = this.checkNull(this.user.firstName) + ' ' + this.checkNull(this.user.familyName);
      if (this.userLabel.trim() == '')
        this.userLabel = this.user.name;
    }
  }

  async ionViewDidLoad() {
    //let userInfo = await this.users.getUserInfo();
    if (!this.user) {

      this.user = await this.users.getUserInfo();
    } else {

      this.ionViewWillEnter();
    }


  }

  checkNull(name: string): string {
    return name == null ? '' : name;
  }

  sendlocation() {
    let sendlocationModal = this.modalCtrl.create(SendLocation);
    sendlocationModal.present();
    sendlocationModal.onDidDismiss(data => {
      console.log('Modal Data', data);
    });
  }

  contactus() {
    let ContactusModal = this.modalCtrl.create(Contactus, {contactData: {userLabel: this.userLabel}});
    ContactusModal.present();
    ContactusModal.onDidDismiss(data => {
      console.log(data);
    });
  }

  editaccount() {
    let ContactusModal = this.modalCtrl.create(Contactus);
    ContactusModal.present();
    ContactusModal.onDidDismiss(updatedData => {

    })
  }

  gobooking() {
    this.navCtrl.push(CompanyPath);
  }

  goEditProfile() {
    let EditProfileModal = this.modalCtrl.create(EditProfile);
    EditProfileModal.present();
    EditProfileModal.onDidDismiss(updatedData => {
      //TODO update  user info after updating user profile info

      console.log('User Data From Modal', updatedData);
      console.group();
      console.log('is The Data are the same?', JSON.stringify(this.user) == JSON.stringify(updatedData));
      console.groupEnd();


      if (updatedData.uid === this.user.uid && JSON.stringify(this.user) != JSON.stringify(updatedData)) {

        this.user = updatedData;

        this.detectUserLabel()
      }
      console.log('user data from modal', this.user);
    })
  }

//='30.0371616,31.0033728'
  openBrowserMao(maps) {
    console.log(maps);
    if (!maps || maps == 'null,null' || maps == 'undefined,undefined') {
      this.showToast('لم يتم تحديد الموقع على الخريطة')
    } else {

      const url = 'https://www.google.com/maps?q=' + maps + '&z=17&hl=ar';

      const tab = this.iab.create(url);

      tab.show();


      /*let getlocationModal = this.modalCtrl.create(GetLocation);
      getlocationModal.present();
      getlocationModal.onDidDismiss(data => {
          // Saving this info to local storage after updating user profile info
      })*/
    }


  }

  imageActionSheet() {
    let imageactionSheet = this.actionSheetCtrl.create({
      title: 'قم بإختيار صورة',
      buttons: [
        {
          icon: 'folder',
          text: 'تحميل من ملف',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          icon: 'camera',
          text: 'التقاط صورة',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'إلغاء',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    imageactionSheet.present();
  }


  navigateToLogin() {
    this.navCtrl.setRoot(Login)
  }

  navigateToSignup() {
    this.navCtrl.push(Signup)
  }

  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}
