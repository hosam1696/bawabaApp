import { LocalUser } from './../../app/appconf/app.interfaces';
// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import { FormGroup, FormBuilder } from "@angular/forms";

// Req Pages
enum IPassengerFields {
    name = 'name',
    mail = 'email',
    lang = 'lang',
    lat = 'lat',
    passenger_first_name = 'firstName',
    passenger_last_name = "familyName",
    passenger_mobile = 'phoneNumber',
    passenger_city = 'city'
}
enum ITransporterFields {
    name = 'name',
    mail = 'email',
    lang = 'lang',
    lat = 'lat',
    transporter_first_name = 'firstName',
    transporter_last_name = "familyName",
    transporter_company_name = 'companyName',
    transporter_mobile = 'companyMobileNumber',
    transporter_logo = 'logo',
    transporter_bank_account_name = 'bankAccountName',
    transporter_iban_number='ibanNumber',
    transporter_bank_name = 'bankName'
}


@IonicPage()
@Component({
    selector: 'page-edit-profile',
    templateUrl: 'edit-profile.html',
})
export class EditProfile {
    user: LocalUser;
    EditProfileForm: FormGroup;
    userType: string;
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


        // consrtuct The form for the First time
        this.EditProfileForm = this.fb.group({
            name: [''],
            mail: [''],
            lang: [''],
            lat: [''],
            pass: [''],
            'passenger': this.fb.group({
                passenger_first_name: [''],
                passenger_last_name: [''],
                passenger_city: [''],
                passenger_mobile: [''],
            }),
            
            'transporter': this.fb.group({
                transporter_first_name: [''],
                transporter_last_name: [''],
                transporter_company_name: [''],
                transporter_mobile: [''],
                transporter_logo: [''],
                transporter_bank_account_name: [''],
                transporter_iban_number:[''],
                transporter_bank_name: ['']
            })
        });

    }

    async ionViewWillEnter() {
 
        // Get user Data from Storage       
        this.user = await this.users.getUserInfo();
        
        this.userType = this.user.roles[5]?'passenger':'transporter';

        console.info('UserInfo', this.user, this.userType);

        
        
        
        this.detectUserForm(this.userType);
        
        let formKeys = Object.keys(this.EditProfileForm.value);

        
        if(this.user) {
            for (let key of formKeys) {

                console.log(key);

                if (this.userType == 'transporter') {
                    if (ITransporterFields[key]=='name'||
                        ITransporterFields[key]=='mail'||
                    ITransporterFields[key]=='lang'||
                    ITransporterFields[key]=='lat'
                    ) {

                        this.EditProfileForm.get(key).setValue(this.user[ITransporterFields[key]]);
                    }
                    else {

                        this.EditProfileForm.get('transporter').get(key).setValue(this.user[ITransporterFields[key]]); 
                    }
                } else {
                    if (IPassengerFields[key]=='name'||
                        IPassengerFields[key]=='mail'||
                    IPassengerFields[key]=='lang'||
                    IPassengerFields[key]=='lat'
                    ) {
                    this.EditProfileForm.get(key).setValue(this.user[IPassengerFields[key]]);
                    } else {
                        this.EditProfileForm.get('passenger').get(key).setValue(this.user[IPassengerFields[key]]);
                    }
                }

            }

        }


    }

    async ionViewDidLoad() {
        // Run After Page Already Loaded
        if (!this.user)
            this.user = await this.users.getUserInfo();
    
        console.log(this.EditProfileForm, 'form value', this.EditProfileForm.value, this.EditProfileForm.controls);
        console.info(this.EditProfileForm.get('transporter').get('transporter_first_name'));
        this.EditProfileForm.valueChanges
            .subscribe(data=>{
                console.log(data);
            })

    }
    dismiss() {
        this.viewCtrl.dismiss();
    }


    submitForm() {
        let { name, uid ,token} = this.user;
        let profileData = {
            ...this.trimUnChangedValues(this.EditProfileForm.value[this.userType]),
            ...{ name, uid }
        };

        console.log('submit form', this.EditProfileForm.value, profileData);

        console.log('trimmed value', this.trimUnChangedValues(this.EditProfileForm.value[this.userType]));

        
        this.users
            .editProfile(profileData, token)
            .subscribe(res => {
                console.log('response from Editing User',res);
            })
            
    }

    private trimUnChangedValues(formValue):object {
        
        console.log(formValue);

        let isNull = (val)=> {
            // Object.prototype.toString.call(val) == "[object Null]"
            return (Object.prototype.toString.call(val) == "[object Null]")?true:false;
        }

        let objKeys = Object.keys(formValue);

        for (let key of objKeys) {

            if(isNull(formValue[key])) {
                //console.log(formValue[key], key, 'is null');
                delete formValue[key]
            }  else {
                //console.log(key, ' has a value');
            }

        }

        return formValue;
    }

    private detectUserForm(userType) {
        let reverseUser = userType == 'passenger'?'transporter':'passenger';
        this.EditProfileForm.removeControl(reverseUser);

        console.log('the Form is', this.EditProfileForm);

    }

    private isNull(val):boolean {
        return (Object.prototype.toString.call(val) == "[object Null]")?true:false;
    }

}
