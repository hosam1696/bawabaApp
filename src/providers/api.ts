import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class API {

  SystemGateway: any;
  url: any;

  SMSGateway: any;

  userLogin: any;
  userLogout: any;
  userToken: any;
  userConnect: any;
  userRegister: any;
  userProfile: any;

  getCities: any;
  getVehicles: any;
  getContracts: any;
  getShifts: any;
  getGoandCome: any;
  getDistricts: any;
  getUniv: any;
  getTags: any;
  getTaxList: any;

  getRoutes: any;

  getNode: any;
  getTaxonomy: any;

  constructor(public http: Http) {
    console.log('Hello Api Provider');

    this.url = 'http://www.bawabt-alnagel.com/'; // 
    this.SystemGateway = 'http://www.bawabt-alnagel.com/api/v1/'; // System API Link
    this.SMSGateway    = 'http://www.bawabt-alnagel.com/AlBawabh/api/sendSMS.php'; // SMS Gateway

    this.userToken    = this.SystemGateway+'user/token';     // Get Logged user Token
    this.userConnect  = this.SystemGateway+'system/connect'; // Get Logged user Info using CSRF-Token
    this.userLogin    = this.SystemGateway+'user/login';     // Login user using name & pass
    this.userLogout   = this.SystemGateway+'user/logout';    // Logout user using CSRF-Token
    this.userRegister = this.SystemGateway+'user/register';  // Logout user using CSRF-Token
    this.userProfile  = this.SystemGateway+'entity_profile2';// Logout user using CSRF-Token

    this.getCities    = this.SystemGateway+'taxonomy_term?parameters[vid]=7'; // get Cities list no need for Token
    this.getVehicles  = this.SystemGateway+'taxonomy_term?parameters[vid]=2'; // get getVehicles list no need for Token
    this.getContracts = this.SystemGateway+'taxonomy_term?parameters[vid]=4'; // get Contracts list no need for Token
    this.getShifts    = this.SystemGateway+'taxonomy_term?parameters[vid]=3'; // get Shofts list no need for Token
    this.getGoandCome = this.SystemGateway+'taxonomy_term?parameters[vid]=8'; // get Go and Come list no need for Token
    this.getDistricts = this.SystemGateway+'taxonomy_term?parameters[vid]=5'; // get Districts list no need for Token
    this.getUniv      = this.SystemGateway+'taxonomy_term?parameters[vid]=9'; // get Universities list no need for Token
    this.getTags      = this.SystemGateway+'taxonomy_term?parameters[vid]=1'; // get Tags list no need for Token
    this.getTaxList   = this.SystemGateway+'taxonomy_term?parameters[vid]='; // get Taxonomy term List using vid

    this.getRoutes    = this.SystemGateway+'routes'; // get Routes list
    
    this.getNode      = this.SystemGateway+'node/'; // get details of node as routes and booking using uuid
    this.getTaxonomy  = this.SystemGateway+'taxonomy_term/'; // get details info of city,univ,shift_duty using uuid

  }
}
