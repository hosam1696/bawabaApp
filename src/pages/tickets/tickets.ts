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
import {tick} from "@angular/core/testing";

// Req Pages

enum EWanted {
  Booked,
  Canceled
}

//@IonicPage()
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
  CancelledTickets: any[] = [];
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
      console.log('No API cancelled Tickets');
      [this.noCancel, this.noTickets] = Array(2).fill(false);

      this.noCancel = true;

    }

    private getTickets(event?:any):void {

      [this.noCancel, this.noTickets] = Array(2).fill(false);
      this.users
        .GetTickets(this.UserData.uid, this.UserData.token)
        .subscribe(data=>{
          console.log(data);
          if(data.length<=0) {
            this.noTickets = true;

          } else {
            this.mytickets = [];
            this.CancelledTickets = [];
            data.forEach(ticket => { // seperate cancelled tickets from reserved tickets

              //console.log(ticket);

              if (ticket.status == 'pending' || ticket.status == 'Pending'||ticket.status == 'Paid') {

                console.log(this.mytickets.indexOf(ticket), ticket.status);

                this.mytickets.push(ticket);

                console.log('Not Cancelled Tickets ',this.mytickets);

              } else if (ticket.status == 'cancelled' || ticket.status == 'Cancelled' || ticket.status == 'CancelledTicket' || ticket.status == 'cancelledTicket') {

                console.log(this.CancelledTickets.indexOf(ticket));

                if(this.CancelledTickets.indexOf(ticket) == -1)
                  this.CancelledTickets.push(ticket);
              } else {
                /*if(this.mytickets.indexOf(ticket) == -1)
                  this.mytickets.push(ticket);*/
              }
            });

          }

        }, err=>{
          console.warn(err.json());
          event && event.complete();
          this.loading = false
        }, ()=> {
          this.loading = false;
          event && event.complete();
        })
    }


    private async cancelTicket(ticket): Promise<any> {
      let Token = await this.users.getToken();

      this.users
        .CancelTicket(ticket.nid, Token)
        .subscribe(
          data=>{
          console.log(data);
          if (data[0] == "Ticket has been canceled succssfully") {
            let index  = this.mytickets.indexOf(ticket);

            this.mytickets.splice(index, 1);

            this.showToast('تم الغاء حجزك بنجاح');
          } else {
            console.log(data);
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
