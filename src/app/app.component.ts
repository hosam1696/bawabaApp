import { Login } from './../pages/login/login';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from 'ng2-translate';

import { Users } from "../providers/users";

import { TabsPage } from '../pages/tabs/tabs';
// import { HomePage } from '../pages/home/home';
// import { ListPage } from '../pages/list/list';
// import { Intro } from '../pages/intro/intro';
// import { Signup } from '../pages/signup/signup';
// import { TransporterHome } from '../pages/transporter-home/transporter-home';
// import { PassengerHome } from '../pages/passenger-home/passenger-home';
// import { Routes } from '../pages/routes/routes';
// import { RoutesNew } from '../pages/routes-new/routes-new';
// import { RoutesEdit } from '../pages/routes-edit/routes-edit';
// import { Settings } from '../pages/settings/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  textDir: any;
  userLogin: any = false;
  loader: any;
  Token: any;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public loadingCtrl: LoadingController,
    public translate: TranslateService,
    public events: Events,
    public users: Users
  ) {
    Promise.all([
      this.initializeApp(),
      this.users.getToken()
    ]).then((data) => {
      this.events.publish('user:Connect',data[1]);
    },error => {
      console.log('error');
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      //this.statusBar.styleDefault();
      //this.splashScreen.hide();
    });

    // this language will be used as a fallback when a translation isn't found in the current language
    this.translate.setDefaultLang('ar');
    this.textDir = 'rtl';

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    //this.translate.use('ar');

    //this is to determine the text direction depending on the selected language
    this.events.subscribe('lang:Changed', (lang) => {
      if (lang == 'ar') {
        this.textDir = 'rtl';
      } else {
        this.textDir = 'ltr';
      }
      // Change Global Lang to Selected one
      this.translate.use(lang);
    });

    // This Event Listen for User Login-Logout
    this.events.subscribe('user:Login', (data) => {
      Promise.all([this.users.UserStorage(data)]).then(() => {
        this.checkSession();
      })
    });

    this.events.subscribe('user:Register', (data) => {
      this.getToken();
    });

    this.events.subscribe('user:Session', (data) => {
      this.checkSession();
    });

    this.events.subscribe('user:getToken', () => {
      this.getToken();
    });

    this.events.subscribe('user:Logout', (data) => {
      Promise.all([this.userLogout(data)]).then(() => {
      });
    });

    this.events.subscribe('user:Connect', (data) => {
      this.userConnect(data);
    });

  }

  checkSession() {
      console.log('check session');
    this.users.isUserLogin().then((val) => {
      console.log('val',val);
      (val)?this.nav.setRoot(TabsPage):this.nav.setRoot(Login)
    });
  }

  AuthLoading() {
    this.loader = this.loadingCtrl.create({
      content: 'Authenticating',
      spinner: 'crescent',
      duration: 3500
    });

    this.loader.present();


  }

  userLogout(Token) {
    this.users.userLogout(Token)
      .map(res => res.json()).subscribe(data => {
        console.log('data');
        console.log(data);
        this.users.LogoutUser().then(() => {

          this.events.publish('user:getToken');
          this.events.publish('user:Session');
        });
      }, error => {
        console.log('error');
        console.log(error);
      })
  }

  userConnect(Token){
    console.log('Token:'+Token);

    this.users
      .userConnect(Token)
      .subscribe(({user})=>{
        console.log('%c%s','font-size: 20px;color:green;','User connect Data [app component file line 151]', user);
        if (user.uid === 0) { // no login user
          this.nav.setRoot(Login);
        } else {
          this.nav.setRoot(TabsPage);
        }
      }, err => {
        console.log('%c%s','font-size: 20px;color:red;','User connect Data [app component file line 153]', err.json());
        this.nav.setRoot(Login);
      });
/*

    Promise.all([
      this.users.userConnect(Token)
    ]).then((data) => {
      data[0].map(res => res.json()).subscribe(data => {

        console.log('user id', data, data.user.uid);
        if(data.user.uid == 0) {
          this.nav.setRoot(Login);
        } else {
          this.events.publish('user:Session');
        }
      }, error => {
        console.log('Stablishing connection failed');
        this.nav.setRoot(Login);
      })
    });*/
  }

  getToken() {
    this.users.userToken()
      .map(res => res.json()).subscribe(data => {
        console.log('data');
        console.log(data);
        this.Token = data.token;
        Promise.all([
          this.users.saveToken(this.Token)
        ]).then(()=>{
          console.log('Done');
        });
      }, error => {
        console.log('error');
        console.log(error);
      })
  }
}
