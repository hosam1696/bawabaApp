import {LocalUser} from './../../app/appconf/app.interfaces';
// Main Components
import {Component} from '@angular/core';
import {
  IonicPage, NavController, ModalController, ViewController, NavParams, Events, ActionSheetController,
  ToastController
} from 'ionic-angular';


import {Storage} from '@ionic/storage';
// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {getUpdatedAppNgModuleContentWithDeepLinkConfig} from "@ionic/app-scripts/dist/deep-linking/util";
import {MapsModal} from "../mapsmodal";

// Req Pages

let IcommonFields;
(function (IcommonFields) {
  IcommonFields[IcommonFields["name"] = "name"] = "name";
  IcommonFields[IcommonFields["mail"] = "email"] = "mail";
  IcommonFields[IcommonFields["current_pass"] = "current password"] = "current_pass";
  IcommonFields[IcommonFields["lang"] = "lang"] = "lang";
  IcommonFields[IcommonFields["lat"] = "lat"] = "lat";
})(IcommonFields || (IcommonFields = {}));
let IPassengerFields;
(function (IPassengerFields) {

  IPassengerFields[IPassengerFields["passenger_first_name"] = 'firstName'] = "passenger_first_name";
  IPassengerFields[IPassengerFields["passenger_last_name"] = "familyName"] = "passenger_last_name";
  IPassengerFields[IPassengerFields["passenger_mobile"] = 'phoneNumber'] = "passenger_mobile";
  IPassengerFields[IPassengerFields["passenger_city"] = 'city'] = "passenger_city";
})(IPassengerFields || (IPassengerFields = {}));

let ITransporterFields;
(function (ITransporterFields) {

  ITransporterFields[ITransporterFields["transporter_first_name"] = 'companyFirstName'] = "transporter_first_name";
  ITransporterFields[ITransporterFields["transporter_last_name"] = "cmpanyLastName"] = "transporter_last_name";
  ITransporterFields[ITransporterFields["transporter_company_name"] = 'companyName'] = "transporter_company_name";
  ITransporterFields[ITransporterFields["transporter_mobile"] = 'companyMobileNumber'] = "transporter_mobile";
  ITransporterFields[ITransporterFields["transporter_logo"] = 'logo'] = "transporter_logo";
  ITransporterFields[ITransporterFields["transporter_bank_account_name"] = 'bankAccountName'] = "transporter_bank_account_name";
  ITransporterFields[ITransporterFields["transporter_iban_number"] = 'ibanNumber'] = "transporter_iban_number";
  ITransporterFields[ITransporterFields["transporter_bank_name"] = 'bankName'] = "transporter_bank_name";
})(ITransporterFields || (ITransporterFields = {}));


//@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfile {
  user: LocalUser;
  EditProfileForm: FormGroup;
  userType: string;
  Token: string;
  showSpinner: boolean = false;
  MapAddress: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              public events: Events,
              public actionSheetCtrl: ActionSheetController,
              public modalCtrl: ModalController,
              public api: API,
              public users: Users,
              public fb: FormBuilder,
              public toastCtrl: ToastController,
              public storage: Storage) {


    // consrtuct The form for the First time
    this.EditProfileForm = this.fb.group({
      name: [''],
      mail: [''],
      lang: [''],
      lat: [''],
      current_pass: ['', Validators.required],
      pass: [''],
      InsurePass: ['', this.insurePass],
      'passenger': this.fb.group({
        passenger_first_name: [''],
        passenger_last_name: [''],
        passenger_city: [''],
        passenger_mobile: [''],
      }),

      'transporter': this.fb.group({
        transporter_first_name: ['firstname'],
        transporter_last_name: [''],
        transporter_company_name: [''],
        transporter_mobile: [''],
        transporter_logo: [''],
        transporter_bank_account_name: [''],
        transporter_iban_number: [''],
        transporter_bank_name: ['546']
      })
    });

  }

  async ionViewWillEnter() {

    // Get user Data from Storage

    this.user = await this.users.getUserInfo();
    this.Token = await  this.users.getToken();
    this.MapAddress = await  this.storage.get('userAddress');
    this.userType = this.user.roles[5] ? 'passenger' : 'transporter';

    console.info('UserInfo', this.user, this.userType, this.Token);


//        console.log('transporter first name value',this.EditProfileForm.get('transporter').get('transporter_first_name').value);

    this.detectUserForm(this.userType);

    let formKeys = Object.keys(this.EditProfileForm.value);

    console.log('form Keys ', formKeys);
    if (this.user) {
      for (let key of formKeys) {
        console.log(key);

        if (key === 'name' || key === 'mail' || key === 'lang' || key === 'lat') {
          this.EditProfileForm.get(key).setValue(this.user[IcommonFields[key]]);
        } else if (key == 'pass') {
          continue
        } else if (key === 'transporter') {
          console.log(key);
          for (let trans of Object.keys(this.EditProfileForm.get('transporter').value)) {
            this.EditProfileForm.get('transporter').get(trans).setValue(this.user[ITransporterFields[trans]])
          }
          //;
        } else if (key === 'passenger') {
          console.log(key);
          for (let trans of Object.keys(this.EditProfileForm.get('passenger').value)) {
            this.EditProfileForm.get('passenger').get(trans).setValue(this.user[IPassengerFields[trans]])
          }

        } else {
          console.log('final else key didn\'t detext');
        }


      }

    }


  }


  async ionViewDidLoad() {
    // Run After Page Already Loaded
    if (!this.user)
      this.user = await this.users.getUserInfo();

    console.log(this.EditProfileForm, 'form value', this.EditProfileForm.value, this.EditProfileForm.controls);
    //console.info(this.EditProfileForm.get('transporter').get('transporter_first_name'));
    this.EditProfileForm.valueChanges
      .subscribe(data => {
        console.log(data);
      })

  }

  private insurePass(input: FormControl): { [s: string]: boolean } {


    if (!input.root || !input.root.value) {
      return null;
    }
    const exactMatch = input.root.value.pass === input.value;

    return exactMatch ? null : {uninsured: true};
  }

  async dismiss() {

    this.viewCtrl.dismiss(await this.users.getUserInfo());
  }


  submitForm() {

    if (this.EditProfileForm.valid && this.EditProfileForm.touched) {
      this.showSpinner = true;
      let {uid, token} = this.user;
      let commonFormValues: any = {
        uid,
        name: this.EditProfileForm.value.name,
        current_pass: this.EditProfileForm.value.current_pass
      };
      console.log('common form Value', commonFormValues);
      if (this.EditProfileForm.value.lat) commonFormValues.lat = this.EditProfileForm.value.lat;
      if (this.EditProfileForm.value.lang) commonFormValues.lang = this.EditProfileForm.value.lang;
      if (this.EditProfileForm.value.mail) commonFormValues.mail = this.EditProfileForm.value.mail;
      if (this.EditProfileForm.value.pass) commonFormValues.pass = this.EditProfileForm.value.pass;

      let profileData = {
        ...this.trimUnChangedValues(this.EditProfileForm.value[this.userType]),
        ...commonFormValues
      };

      console.log('submit form', this.EditProfileForm.value, profileData);

      console.log('trimmed value', this.trimUnChangedValues(this.EditProfileForm.value[this.userType]));


      this.users
        .editProfile(profileData, token)
        .subscribe(res => {
          console.log('response from Editing User', res);
          if (res.uid || res.name) {
            this.storage.set('userInfo', res);
            this.storage.set('userAddress', this.MapAddress);
            this.showToast('تم تعديل البيانات الشخصية بنجاح');
            this.EditProfileForm.get('current_pass').setValue('');
          }


        }, err => {
          console.warn(err);
          this.showSpinner = false;
          let error = err.json();
          if (error[0] == 'you\'ve entered a Wrong Password') {
            this.showToast('كلمة المرور الحالية غير صحيحة')
          } else {
            this.showToast('يرجى المحاولة مرة اخرى')
          }


        }, () => {
          this.showSpinner = false;
        })
    } else {
      this.showSpinner = false;
      console.warn('UnValid Form', this.EditProfileForm.errors, this.EditProfileForm);

      let formKeys = Object.keys(this.EditProfileForm.value);
      for (let key of formKeys) {
        if (this.EditProfileForm.get(key).hasError('required')) {
          if (key == 'current_pass')
            this.showToast('يرجى ادخال كلمة المرور الحالية');
          else
            this.showToast('you have to enter ' + IcommonFields[key]);
        } else if (this.EditProfileForm.get(key).hasError('insurePass')) {
          this.showToast('كلمات المرور غير متطابقة');
        }
      }


    }


  }

  private trimUnChangedValues(formValue): object {

    console.log(formValue);

    let isNull = (val) => {
      // Object.prototype.toString.call(val) == "[object Null]"
      return (Object.prototype.toString.call(val) == "[object Null]") ? true : false;
    };

    let objKeys = Object.keys(formValue);

    for (let key of objKeys) {

      if (isNull(formValue[key]) || !formValue[key]) {
        //console.log(formValue[key], key, 'is null');
        delete formValue[key]
      } else {
        //console.log(key, ' has a value');
      }

    }

    return formValue;
  }

  private detectUserForm(userType) {
    let reverseUser = userType == 'passenger' ? 'transporter' : 'passenger';
    this.EditProfileForm.removeControl(reverseUser);

    console.log('the Form is', this.EditProfileForm);

  }

  private isNull(val): boolean {
    return (Object.prototype.toString.call(val) == "[object Null]") ? true : false;
  }

  openMaps() {

    let modal = this.modalCtrl.create(MapsModal, {
      initData: {
        lat: this.EditProfileForm.value.lat,
        lng: this.EditProfileForm.value.lang
      }
    });

    modal.onDidDismiss(data => {
      console.log('Data from close', data);
      if (data) {
        this.EditProfileForm.get('lat').setValue(data.latitude);
        this.EditProfileForm.get('lang').setValue(data.longitude);

        if (data.address)
          this.MapAddress = data.address
      }

    });

    modal.present();


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
