// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, ModalController, ToastController, ViewController, NavParams, Events, ActionSheetController} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";

// Req Pages


@IonicPage()
@Component({
    selector: 'page-edit-path',
    templateUrl: 'edit-path.html',
})
export class EditPath {
    routeInfo: any;
    showLoader: boolean = true;
    districts: any;
  universities: any;
    vehicles: any;
    contracts: any;
    goAndComes: any;
    temp: any;
    error: any;
    Token: any;
    myInfo: any;
    submitload: any;
    cities: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public viewCtrl: ViewController,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public toastCtrl: ToastController,
        public api: API,
        public users: Users
    ) {



        Promise.all([
            this.users.getToken().then((val) => {
                this.Token = val;
            })
        ]).then(() => {
            console.log('current token=' + this.Token);
        });

        console.log(navParams.get('nId'));
        this.getRouteInfoByUserId(navParams.get('nId'));

        this.users.getTaxList('7')
        .then(data=>{
            this.cities = data;
        });

        //get cities
      /*this.users.getTaxList('5').then((data) => {

          this.districts = data;
          console.log('data', data);
      });
      // get Univirsities
      this.users.getTaxList('9').then((data) => {

          this.universities = data;
          console.log('data', data);
      });*/
        // get vehicles
        this.users.getTaxList('2').then((data) => {

            this.vehicles = data;
            console.log('data', data);
        });
        // get contracts
        this.users.getTaxList('4').then((data) => {

            this.contracts = data;
            console.log('data', data);
        });
        // get go_and_come
        this.users.getTaxList('8').then((data) => {

            this.goAndComes = data;
            console.log('data', data);
        });


    }

    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {


    }

  /*
  ngDoCheck() {

    console.log(this.temp);

    if (this.temp&&this.temp.field_city === this.routeInfo.field_city.und.tid) {
      console.log('you have not changed the city value');
      this.temp.field_route_from = '';
      this.temp.field_route_university_to = '';
    } else if(this.temp&&this.temp.field_city != this.routeInfo.field_city.und.tid){
      console.log('you have changed the city value');
      this.getCityUnivs()
    }
  }

  */

  cityChange(event) {
    console.log(event);
  }
    dismiss() {
        this.viewCtrl.dismiss();
    }

  changedCityValue(cityId) {
    console.log('change value', cityId);
    if (this.temp.field_city == cityId) {
      console.log('you have not changed the city value');
    } else {
      this.temp.field_city = cityId;
      this.districts = null;
      this.universities = null;
      this.users.getDistrictsByCity(cityId)

        .subscribe(data => {
          console.log(data);
          this.districts = data;
        });

      this.users.getUniversitiesByCity(cityId)

        .subscribe(data => {
          console.log(data);
          this.universities = data;
        })
    }

  }


    getRouteInfoByUserId(nId) {
        console.log('nId', nId);

        this.users.getRouteInfo(nId).then((data) => {
            this.showLoader = false;
            this.routeInfo = data[0];
            this.temp = {
                nid: nId,
                title: this.routeInfo.title,
                "field_city": this.routeInfo.field_city.und.tid,
                "field_route_from": this.routeInfo.field_route_from.und.tid
                ,
                "field_route_university_to": this.routeInfo.field_route_university_to.und.tid
                ,
                "field_vehicle_type": this.routeInfo.field_vehicle_type.und.tid
                ,
                "field_contract_period": this.routeInfo.field_contract_period.und.tid
                ,
                "field_go_and_come": this.routeInfo.field_go_and_come.und.tid
                ,
                "field_price": this.routeInfo.price
                ,


            };
            console.log('data', data);
            console.log('temp', this.temp);


          this.getCityUnivs();


        });
    }
    updatePath() {
        console.log('title', this.temp);

        if (!this.temp.title) {

            this.showToast('يرجى ادخال عنوان المسار ');
        }
        else if (!this.temp.field_route_from) {

            this.showToast('يرجى تحديد المدينة ');
        }
        else if (!this.temp.field_route_university_to) {

            this.showToast('يرجى تحديد الجامعة ');
        } else if (!this.temp.field_vehicle_type) {

            this.showToast('يرجى تحديد نوع المركبة ');
        } else if (!this.temp.field_contract_period) {

            this.showToast('يرجى تحديد مدة العقد ');
        } else if (!this.temp.field_go_and_come) {

            this.showToast('يرجى تحديد نوع الطلب ');
        } else if (!this.temp.field_price) {

            this.showToast('يرجى إدخال السعر ');
        }
        else {
            this.submitload = true;
            this.users.updatePath(this.temp, this.Token)
                .map(res => res.json()).subscribe(data => {
                    console.log('data', data);
                    this.submitload = false;
                    this.showToast('تم تعديل المسار بنجاح ');
                    this.viewCtrl.dismiss(data);
                },err=>{
              this.submitload = false;
            });
        }
    }
    showToast(msg, dur = 2000) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: dur,
            position: 'top',
            showCloseButton: true,
            closeButtonText: 'x'
        });



        toast.present();
    }


  getCityUnivs() {
    this.users.getDistrictsByCity(this.temp.field_city)
      .subscribe(data => {
        console.log('Districts', data);
        this.districts = data;
      });
    this.users.getUniversitiesByCity(this.temp.field_city)

      .subscribe(data => {
        console.log('Universites', data);
        this.universities = data;
      })
  }


    editimageActionSheet() {
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
