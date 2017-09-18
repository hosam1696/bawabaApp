import { Injectable } from '@angular/core';
import { RequestOptions, Headers, Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { API } from "./api";
import { Events } from 'ionic-angular';

import { Storage } from '@ionic/storage';
import {Observable} from "rxjs/Observable";

@Injectable()
export class Users {

  X_CSRF_Token: any;
  userInfo: any;
  callback: any = true;

  constructor(
    public http: Http,
    public events: Events,
    public storage: Storage,
    public api: API
  ) {



  }

  saveToken(data) {

    this.storage
      .set('userToken', data)
      .then(() => {
        console.log('userToken Updated:' + data);
      })

  }

  // Creating User Proccess -> Sending main info then
  // get created user id and save session and token after that
  // sending request to saving his profile data using csrf token

  userRegister(name, mail, pass, role) {
    // Building Data in JSON Format
    let data = JSON.stringify({
      name: name,
      mail: mail,
      conf_mail: mail,
      pass: pass,
      user_roles: role
    });

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.userRegister, data, options);
  }

  userProfile(role, uid, first_name, last_name, company_name, mobile_number, city, Token) {

    let data;
    // Building Data in JSON Format
    if (role == 4) {
      data = JSON.stringify({
        type: 'transporter_profile',
        uid: uid,
        field_first_name: {
          und: [{
            value: first_name
          }]
        },
        field_last_name: {
          und: [{
            value: last_name
          }]
        },
        field_company_name: {
          und: [{
            value: company_name
          }]
        },
        field_mobile_number: {
          und: [{
            value: mobile_number
          }]
        },
      });
    } else if (role == 5) {
      data = JSON.stringify({
        type: 'passenger_profile',
        uid: uid,
        field_first_name: {
          und: [{
            value: first_name
          }]
        },
        field_last_name: {
          und: [{
            value: last_name
          }]
        },
        field_city: {
          und: [{
            value: city
          }]
        },
        field_mobile_number: {
          und: [{
            value: mobile_number
          }]
        },
      });
    }

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': Token
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.userProfile, data, options);
  }

  getUserData(Link) {
    //let data = JSON.stringify({uid});
    return this.http.get(Link);
  }

  UserStorage(userDataInfo):Promise<boolean> {
    return Promise.all([
      this.storage.set('isLogin', true),
      this.storage.set('userInfo', userDataInfo),
    ]).then(confirmSaving => {
      console.info('[isLogin, userInfo] are stored in storage successfully after login');   
      return true;
      }).catch(storingErr => {
      return false
    })
  }

  LogoutUser() {
    let me = this;
    return new Promise((resolve, reject) => {
      this.storage.set('isLogin', false);
      this.storage.remove('userInfo');
      this.storage.remove('userAddress');
      console.log('Storage updated');
      resolve(true);
    });
  }

  getUserInfo() {
    return this.storage.get('userInfo');
  }

  getToken() {
    return this.storage.get('userToken');
  }




  async test(msg) {
    this.storage.ready().then(() => {
      this.storage.set('TestingAsync', msg);
    });
    await this.storage.get('TestingAsync').then((val) => {
      return val;
    });
  }

  isUserLogin() {
    return this.storage.get('isLogin');
  }

  sendMessage(Link, uid, mestitle, mesbody) {
    //let apiKey = 'sendMessage';
    //let data = JSON.stringify({apiKey,uid,mestitle,mesbody});
    //return this.http.post(Link,data);
    return false;
  }


  userLogin(name, pass) {
    // Building Data in JSON Format
    let data = JSON.stringify({
      name: name,
      pass: pass
    });

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.userLogin, data, options);
  }

  contactUs(contactData, Token) {
   // www.bawabt-alnagel.com/api/v1/contact-us/send

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': Token
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    let body = JSON.stringify(contactData);

    return this.http.post(this.api.SystemGateway+'contact-us/send', body, options).map(res=>res.json());

  }

  userToken() {
    // Building Data in JSON Format
    let data = JSON.stringify({});

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.userToken, data, options);
  }

  userConnect(Token) {
    // Building Data in JSON Format
    let data = JSON.stringify({Token});

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': Token,
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.userConnect, data, options).map(res=>res.json());
  }

  testpromise() {
    return new Promise(function (resolve, reject) {
      // Building Data in JSON Format
      let data = JSON.stringify({});

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-CSRF-Token': 'zpAb0S4Rzb0-I99OtHS1kGMLCMvQhK0COy5AYj_kEVk',
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

      this.http.post(this.api.userLogout, data, options)
        .map(res => res.json()).subscribe(data => {
          resolve(data)
        }, error => {
          reject(error)
        })
    })
  }

  userLogout(Token) {
    // Building Data in JSON Format
    let data = JSON.stringify({});

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': Token,
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.userLogout, data, options);
  }

  getCities() {
    let me = this;
    return new Promise((resolve, reject) => {
      // vid=7 > City vucablory id

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

      this.http.get(this.api.getCities, options)
        .subscribe((data) => {
          resolve(data.json());
        }, (err) => {
          reject(err);
        });
    });
  }
  getUniv() {
    let me = this;
    return new Promise((resolve, reject) => {
      // vid=7 > City vucablory id

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

      this.http.get(this.api.getUniv, options)
        .subscribe((data) => {
          resolve(data.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  editProfile(profileData, token) {
    let data = JSON.stringify(profileData);

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': token,
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.SystemGateway + 'users/edit', data, options).map(res => res.json());
  }

  addPath(temp,Token) {


   let data = JSON.stringify(temp);

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
          'X-CSRF-Token': Token,
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

    return  this.http.post(this.api.SystemGateway+'add-node',data, options)


  }
   updatePath(temp,Token) {

   let data= JSON.stringify(temp);

// let data={'nid':temp.nid,'titlew':temp.title}
      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
          'X-CSRF-Token': Token,
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

    return  this.http.post(this.api.SystemGateway+'route/edit',data, options)


  }
   deletePath(nid,Token) {

    let data={"nid":nid}

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
          'X-CSRF-Token': Token,
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

    return  this.http.post(this.api.SystemGateway+'route/delete',data, options)


  }
  getTaxList(vid) {

    // using vid
    // 1 : Tags , 2: Vehicles , 3 : Shifts , 4 : Contracts , 5 : Districts
    // 7 : Cities , 8 : Go and Come , 9 : Univirsities

    return new Promise((resolve, reject) => {
      let Link = this.api.getTaxList+vid;
      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

      this.http.get(Link, options)
        .subscribe((data) => {
          resolve(data.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getDistrictsByCity(cityId: number): Observable<any> {

    return this.http.get(this.api.SystemGateway + 'get-districts?city=' + cityId).map(res => res.json());

  }

  getUniversitiesByCity(cityId: number): Observable<any> {

    return this.http.get(this.api.SystemGateway + 'get-universities?city=' + cityId).map(res => res.json());

  }

  getUserRoutes(userId) {

      let Link = this.api.getRoutes;
      // uid=? > user id &parameters[uid]=?
      if (userId != 0) {
        Link = Link + '?user_id=' + userId;
      }
      return this.getData(Link);

  }
  getRouteInfo(nId){
       let Link = this.api.getRoutes+ '?route_id=' + nId;

      return this.getData(Link);
  }
  getData(Link) {
    return new Promise((resolve, reject) => {

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

      this.http.get(Link, options)
        .subscribe((data) => {
          resolve(data.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getNode(uuid: any = null) {
    return new Promise((resolve, reject) => {
      let Link = this.api.getNode;
      // uuid=? > node uuid node/???-??-????-???
      if (uuid != null) {
        Link = Link + uuid;
      }

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

      this.http.get(Link, options)
        .subscribe((data) => {
          resolve(data.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getTaxonomy(uuid: any = null) {
    return new Promise((resolve, reject) => {
      let Link = this.api.getTaxonomy;
      // uuid=? > taxonomy_term uuid taxonomy_term/???-??-????-???
      if (uuid != null) {
        Link = Link + uuid;
      }

      // Building Headers
      let headers = new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      });

      // Building Options
      let options = new RequestOptions({
        headers: headers,
        withCredentials: true
      });

      this.http.get(Link, options)
        .subscribe((data) => {
          resolve(data.json());
        }, (err) => {
          reject(err);
        });
    });
  }


  getSearchResults(cityId, universityId, routeFrom) {


    return this.http.get('http://www.bawabt-alnagel.com/api/v1/routes?city=' + cityId + '&university=' + universityId + '&route_from=' + routeFrom).map(serverRes => serverRes.json());
  }


  BookTicket(ticketData, Token) {

    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': Token,
    });


    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    let body = JSON.stringify(ticketData);

    return this.http.post(this.api.SystemGateway+'ticket/add',body, options ).map(res=>res.json());
  }

  GetTickets(user_id, Token) {
    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': Token,
    });

    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.get(this.api.SystemGateway+'get-tickets?uid='+user_id, options).map(response=>response.json());
  }

  GetCancelledTickets() {

  }


  CancelTicket(ticketId,Token) {
    // Building Headers
    let headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'X-CSRF-Token': Token,
    });


    // Building Options
    let options = new RequestOptions({
      headers: headers,
      withCredentials: true
    });

    return this.http.post(this.api.SystemGateway+'ticket/cancel',JSON.stringify({nid:ticketId}), options).map(response=>response.json());


  }

  getPageContent(pageId) {
    return this.http.get(this.api.SystemGateway + 'load-page?nid=' + pageId).map(res => res.json());
  }


  getUserIP() {
    return this.http.get('http://ipv4.myexternalip.com/json').map(res => res.json());
  }

  getUserLocationInfoByIp(ip) {
    return (ip) ? this.http.get('http://ipinfo.io/' + ip).map(res => res.json()) : null;
  }

registerDeviceToken(deviceData) {
   // Building Headers
   let headers = new Headers({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  });


  // Building Options
  let options = new RequestOptions({
    headers: headers,
    withCredentials: true
  });

  let body = JSON.stringify(deviceData);

  return this.http.post(this.api.SystemGateway+'push_notifications', body, options).map(res=>res.json());

  
}

}


