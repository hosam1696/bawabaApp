// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, Loading, LoadingController, NavParams, AlertOptions, ToastController, ModalController, AlertController, Events} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {DragulaService} from 'ng2-dragula/ng2-dragula';
import {Storage} from '@ionic/storage';

// Req Pages
import {SearchOption} from '../search-option/search-option';
import {AddPath} from '../add-path/add-path';
import {EditPath} from '../edit-path/edit-path';



//@IonicPage()
@Component({
    selector: 'page-transporter-home',
    templateUrl: 'transporter-home.html',
})
export class TransporterHome {
    loading: Loading;
    name: any;
    uid: any;
    routes: any;
    myInfo: any;
    Token: any;
    alertOptions: AlertOptions;
    showLoader: boolean = true;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public modalctrl: ModalController,
        public events: Events,
        public alert: AlertController,
        public toastCtrl: ToastController,
        public alertCtrl: AlertController,
        public storage: Storage,
        public loadingCtrl: LoadingController,
        public api: API,
        public users: Users,

    ) {



    }



    ionViewDidEnter() {
        // Run After Page Already Entered

    }

    ionViewDidLoad() {
        // Run After Page Already Loaded
        Promise.all([
            this.users.getToken().then((val) => {
                this.Token = val;
            })
        ]).then(() => {
            console.log('current token=' + this.Token);
        });
        this.users.getUserInfo().then((data) => {
            console.log('myInfo', data);
            this.myInfo = data;

            console.log('data.user.uid', data.uid);
            //setTimeout(function(){
            this.getRoutesByUserId(data.uid);
            //  },2000);

        });

    }

    getRoutesByUserId(uId) {
        console.log('uId', uId);

        this.users.getUserRoutes(uId).then((data) => {
            this.showLoader = false;
            this.routes = data;
            console.log('data', data);
        });
    }
    searchoption() {
        let searchoptionModal = this.modalctrl.create(SearchOption);
        searchoptionModal.present();
        searchoptionModal.onDidDismiss(data => {
            // filter and search paths based onn the search modal

            console.log(data);
        })
    }
    addpathmodal() {
        let addpathModal = this.modalctrl.create(AddPath);
        addpathModal.present();
        addpathModal.onDidDismiss(data => {
            console.log(' data', data);
            if (data) {
                this.routes.unshift(data);
            }


            console.log('  this.routes', this.routes);
        })

    }
    editpathmodal(nId) {
        console.log('nId', nId);
        let editpathModal = this.modalctrl.create(EditPath, {nId: nId});
        editpathModal.present();
        editpathModal.onDidDismiss(data => {
            // Saving this info to local storage after updating user profile info
            console.log(' data', data);
            if (data) {
                let foundedIndex = this.routes.findIndex((obj) => {return obj.Nid == data.Nid});

                console.log('Index of repeated route', foundedIndex);

                this.routes[foundedIndex] = data;
            }
        })

    }
    deletepathmodal(route) {

        console.log('route', route);
        let routeIndex = this.routes.indexOf(route);
        console.log('routeIndex', routeIndex);
       let alert = this.alertCtrl.create({
            title: 'حذف مسار ',
            message: 'هل انت متأكد من رغبتك فى حذف المسار ؟',
            buttons: [
                {
                    text: 'الغاء',
                    handler: (data) => {

                    }
                },
                {
                    text: 'حذف',
                    handler: () => {

                        this.loading = this.loadingCtrl.create({
                            content: 'جارى حذف المسار ...',
                        });
                        this.loading.present();
                        this.users.deletePath(route.Nid, this.Token)
                            .map(res => res.json()).subscribe(data => {
                                //                    this.submitload = false;
                                console.log('data', data);
                                this.routes.splice(routeIndex, 1);
                                this.loading.dismissAll();
                                this.showToast('تم حذف المسار بنجاح ');
                                this.decreaseRoutesNum();
                            }, (err) => {
                                this.showToast('الرجاء المحاولة فى وقت لاحق')
                            });
                    }
                }
            ]
        });

      alert.present();


    }
    decreaseRoutesNum() {
      this.storage.get('userInfo')
        .then(data=>{
          data.numberOfRoutes--;
          this.storage.set('userInfo',data);
        })
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

}
