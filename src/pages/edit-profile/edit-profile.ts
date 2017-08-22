import { LocalUser } from './../../app/appconf/app.interfaces';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import { FormGroup, FormBuilder } from "@angular/forms";

// Req Pages


@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfile {
    user: LocalUser;
    EditProfileForm: FormGroup;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public api: API,
        public users: Users,
        public fb: FormBuilder
    ) {

        this.EditProfileForm = this.fb.group({
            name: [''],
            passenger_first_name: [''],
            passenger_last_name: [''],
            passenger_company_name: [''],
            passenger_mobile: ['']
        });

    }

    async ionViewWillEnter() {

        
        this.user = await this.users.getUserInfo();


        console.info('UserInfo', this.user);

        let formKeys = Object.keys(this.EditProfileForm.value);

        this.EditProfileForm = this.fb.group({
            name: [this.user.name],
            passenger_first_name: [this.user.firstName],
            passenger_last_name: [this.user.familyName],
            passenger_company_name: [this.user.companyName],
            passenger_mobile: [this.user.phoneNumber]
        });
        
    }

    async ionViewDidLoad() {
        // Run After Page Already Loaded
        if (!this.user)
            this.user = await this.users.getUserInfo();
            

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }


    submitForm() {
        let { name, uid ,token} = this.user;
        let profileData = {
            ...this.EditProfileForm.value,
            ...{ name, uid }
        };

        console.log('submit form', this.EditProfileForm.value);

        
        this.users
            .editProfile(profileData, token)
            .subscribe(res => {
                console.log(res);
            })

    }

}
