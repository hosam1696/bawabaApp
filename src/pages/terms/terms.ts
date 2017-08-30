import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {Users} from "../../providers/users";

/**
 * Generated class for the TermsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-terms',
  templateUrl: 'terms.html',
})
export class TermsPage {
  pageContent: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private users: Users) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsPage');
    this.users.getPageContent(99)
      .subscribe(
        data => {
          console.log(data);
          this.pageContent = data[0];
        })
  }

}
