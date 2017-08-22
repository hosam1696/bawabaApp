import { LocalUser } from './../../app/appconf/app.interfaces';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ActionSheetController, Events, NavParams} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";

// Req Pages
import {Contactus} from "../contactus/contactus";
import {SendLocation} from "../sendlocation/sendlocation";
//import {PassengerHome} from "../passenger-home/passenger-home";
import {EditProfile} from "../edit-profile/edit-profile";
import {GetLocation} from "../get-location/get-location";
import { CompanyPath } from "../company-path/company-path";


@IonicPage()
@Component({
    selector: 'page-profile',
    templateUrl: 'profile.html',
})
export class ProfilePage {

    section: string = 'two';
    somethings: any = new Array(20);
    user:  LocalUser;
    userLabel: string = '';
    constructor(
        public navCtrl: NavController,
        public events: Events,
        public navParams: NavParams,
        public modalCtrl: ModalController,
        public users: Users,
        public actionSheetCtrl: ActionSheetController
    ) {
      console.log('ionViewDidLoad ProfilePage');
      // this.user={name:''};
        
    }
    async ionViewWillEnter() {
        this.user = await this.users.getUserInfo();
        console.info('UserInfo', this.user);
        
        let userRole = this.user.roles[4];
        
        if (userRole === 'transporter') {
            this.userLabel = this.checkNull(this.user.companyFirstName) + ' ' + this.checkNull(this.user.cmpanyLastName);
        } else if (userRole === 'passenger') {
            this.userLabel = this.checkNull(this.user.firstName) + ' ' + this.checkNull(this.user.familyName);
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
            console.log(data);
        });
    }

    contactus() {
        let ContactusModal = this.modalCtrl.create(Contactus);
        ContactusModal.present();
        ContactusModal.onDidDismiss(data => {
            console.log(data);
        });
    }

    editaccount() {
        let ContactusModal = this.modalCtrl.create(Contactus);
        ContactusModal.present();
        ContactusModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    gobooking() {
        this.navCtrl.push(CompanyPath);
    }
    goEditProfile() {
        let EditProfileModal = this.modalCtrl.create(EditProfile);
        EditProfileModal.present();
        EditProfileModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
    }
    
      locationmodal() {
        let getlocationModal = this.modalCtrl.create(GetLocation);
        getlocationModal.present();
        getlocationModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
        })
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




}
