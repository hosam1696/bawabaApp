// Main Components
import {Component} from '@angular/core';
import {
  IonicPage, NavController, ModalController, NavParams, Events, ActionSheetController,
  ToastController
} from 'ionic-angular';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
import {LocalUser} from "../../app/appconf/app.interfaces";

// Req Pages

enum EWanted {
  Booked,
  Canceled
}

@IonicPage()
@Component({
    selector: 'page-tickets',
    templateUrl: 'tickets.html',
})
export class Tickets {
  noTickets: boolean = false;
  noCancel: boolean = false;

  mytickets: any[] = [];
    UserData:LocalUser;
    loading:boolean = true;
    wantedTickets = 'Booked';
    CancelledTickets: any[];
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public events: Events,
        public actionSheetCtrl: ActionSheetController,
        public modalCtrl: ModalController,
        public api: API,
        public users: Users,
        public toastCtrl: ToastController
    ) {

    }

    ionViewWillEnter() {
        // Run After Page Already Entered

      this.getUserInfo();
    }

    ionViewDidLoad() {
        // Run After Page Already Loaded




    }



    getUserInfo() {
      [this.noTickets, this.noCancel] = Array(2).fill(false);
      this.users.getUserInfo()
        .then(userInfo=>{
          this.UserData = userInfo;
          console.log('Tickets page User Info', this.UserData);



          this.wantedTickets === 'Booked'?this.getTickets():this.getCancelled();
        });
    }

    private async getCancelled() {
      console.log('cancelled Tickets');
      [this.noCancel, this.noTickets] = Array(2).fill(false);

      this.noCancel = true;

    }

    private getTickets():void {
      this.loading = true;
      this.users
        .GetTickets(this.UserData.uid)
        .subscribe(data=>{
          console.log(data);
          if(data.length<=0) {
            this.noTickets = true;

          } else {
            this.mytickets = data;
          }

        }, err=>{
          console.warn(err);
          this.loading = false
        }, ()=> {
          this.loading = false
        })
    }


    private async cancelTicket(ticket): Promise<any> {
      let Token = await this.users.getToken();

      this.users
        .CancelTicket(ticket.nid, Token)
        .subscribe(
          data=>{
          console.log(data);
          if(data[0] == 'Ticket has been deleted succssfully') {
            let index  = this.mytickets.indexOf(ticket);

            this.mytickets.splice(index, 1);

            this.showToast('تم الغاء حجزك بنجاح');
          } else {

            this.showToast('يرجى المحاولة مرة اخرى')

          }


        }, err=>{
          console.warn(err);
            this.showToast('يرجى المحاولة مرة اخرى')
        }, ()=> {

        })
    }

    getDate(ticket: any) {

      let date = (!this.UserData.roles[4])?ticket.bookingTitle:ticket.bookingtitle;
      return date.match(/[0-9]\S*/)[0]
    }
    showToast(message) {
      let toast = this.toastCtrl.create({
        message,
        duration: 1500
      });

      toast.present();
    }
}
