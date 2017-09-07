import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Events, LoadingController, AlertController, ToastController, ActionSheetController} from 'ionic-angular';

import {Components} from "../../providers/components";

import {SMS} from "../../providers/sms";
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {Login} from "../login/login";

//@IonicPage()
@Component({
    selector: 'page-signup',
    templateUrl: 'signup.html',
})
export class Signup {
    error: any
    step: any;
    randcode: any;
    // Step 1
    mobile: any;
    CountryCode: any;
    spinner: any;
    // Step 2
    vercode: any;
    // Select option
    selectOptions: any;
    MembershipType: any;
    role: any;
    // Signup Information
    name: any;
    mail: any;
    password: any;
    repassword: any;
    city: any;
    cities: any;
    signupload: any = false;
    // Profile Fields
    first_name: any = null;
    last_name: any = null;
    city_id: any = null;
    company_name: any = null;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public alertCtrl: AlertController,
        public toastCtrl: ToastController,
        public actionSheetCtrl: ActionSheetController,
        public loadingCtrl: LoadingController,
        public events: Events,
        public api: API,
        public sms: SMS,
        public com: Components,
        public users: Users
    ) {
        this.error = false;
        this.step = 1;
        this.randcode = '8816';
        this.CountryCode = '966';
        this.city = 'Riyadh';
        this.mobile = '';
        this.vercode = '';
        this.MembershipType = 'Passenger';
        this.role = 5;
        console.log('Step :' + this.step);
    }

    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
    }

    Step1() {
        this.step = 1;
    }

    Step6(MembershipType) {
        this.spinner = 1;
        this.step = 6;

        this.role = (MembershipType == 'Passenger') ? "5" : "4";
        this.MembershipType = MembershipType;
        console.log(MembershipType);
    }


    goSignin() {
        this.navCtrl.push(Login);
    }

    Step2() {

        this.spinner = 1;
        console.log(this.mobile);
        if (!this.mobile) {
            this.error = true;
            let toast = this.toastCtrl.create({
                message: 'يرجى ادخال رقم الجوال',
                duration: 2000,
                position: 'top'
            });
            toast.present();
            this.spinner = 0;
        } else {
            this.error = false;
        }
        console.log(this.error);
        if (!this.error) {

            console.log(this.mobile);
            console.log(this.api.SMSGateway);
            console.log(this.CountryCode + this.mobile);

            this.spinner = 0;
            this.step = 2;
            let response = this.sms.SignupCode(this.api.SMSGateway, this.CountryCode + this.mobile);
            response.map(res => res.json())
                .subscribe(data => {
                    this.randcode = data.code;
                    console.log(data.code);
                    this.spinner = 0;
                    this.step = 2;
                },
                error => {

                })
        }
    }

    Step3() {
        console.log(this.vercode);
        if (this.vercode == this.randcode) {
            this.step = 3;

        } else {
            let toast = this.toastCtrl.create({
                message: 'كود التفعيل غير صحيج',
                duration: 3000,
                position: 'top'
            });
            toast.present();
        }


    }

    PrintCityID() {
        console.log(this.city_id);
    }

    Step4() {
        this.signupload = true;

        console.log('Signup information');
        console.log('Name:' + this.name);
        console.log('Email:' + this.mail);
        console.log('Mobile:' + this.mobile);

        console.log('Password:' + this.password);
        console.log('RePassword:' + this.repassword);



        console.log('this.role:' + this.role);


        if (this.password != this.repassword) {
            let toast = this.toastCtrl.create({
                message: 'يرجى التأكد من تطابق كلمة المرور',
                duration: 2000,
                position: 'top'
            });
            toast.present();
            this.signupload = false;
        } else if (!this.name && this.role == 4) {
            let toast = this.toastCtrl.create({
                message: 'يرجى إدخال  اسم الشركة',
                duration: 2000,
                position: 'top'
            });
            toast.present();
            this.signupload = false;
        } else if (!this.name) {
            let toast = this.toastCtrl.create({
                message: 'يرجى إدخال  اسم بالكامل',
                duration: 2000,
                position: 'top'
            });
            toast.present();
            this.signupload = false;
        } else if (!this.mail) {
            let toast = this.toastCtrl.create({
                message: 'يرجى إدخال البريد الإلكترونى',
                duration: 2000,
                position: 'top'
            });
            toast.present();
            this.signupload = false;
        } else {
            this.users.userRegister(this.name, this.mail, this.password, this.role)
                .map(res => res.json())
                .subscribe(data => {
                    console.log('User Created');
                    console.log(data);
                    Promise.all([
                        this.events.publish('user:Register')
                    ]).then(() => {
                        console.log('getting token');
                        this.users.userToken()
                            .map(res => res.json()).subscribe(val => {
                                console.log('current token = ' + val.token);
                                let Token = val.token;
                                this.users.userProfile(this.role, data.uid, this.first_name, this.last_name, this.company_name, this.mobile, this.city_id, Token)
                                    .map(res => res.json()).subscribe(data => {
                                        this.signupload = false;
                                        console.log('Profile Updated');
                                        console.log(data);
                                        this.users.userLogout(Token)
                                            .map(res => res.json()).subscribe(data => {
                                                this.users.LogoutUser();
                                                this.users.userLogin(this.name, this.password)
                                                    .map(res => res.json()).subscribe(data => {
                                                        console.log(data);
                                                        let Token = data.token;
                                                        Promise.all([
                                                            this.events.publish('user:Login', data)
                                                        ]).then((data) => {
                                                            this.navCtrl.pop();
                                                        });
                                                    }, error => {
                                                        let M = error.statusText;
                                                        let D = 3000;
                                                        let P = 'top';
                                                        this.com.Toast(M, D, P);
                                                    });
                                            });
                                    }, error => {
                                        console.log(error);
                                        console.log('error while updating user profile');
                                    });
                            }, error => {
                                console.log(error)
                                console.log('error while getting token');
                            })
                    });

                }, error => {
                    console.log(error);
                    let errors = error.json()['form_errors'];
                    let errorsKeys = Object.keys(errors);

                    this.showToast(errors[errorsKeys[0]]);
                    console.log('Error while creating user');
                });
        }
    }

    showToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 2000,
            position: 'top'
        });
        toast.present();
    }


}
