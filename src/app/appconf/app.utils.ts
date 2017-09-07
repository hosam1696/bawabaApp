


import {Injectable} from "@angular/core";
import {Network} from "@ionic-native/network";

@Injectable()

export class AppUtils {
  constructor(private network : Network) {}

  public get IsConnected():boolean {
    return this.network.type != 'none';
  }

  public OnConnection(userOnlineCallback:any, userDisconnectedCallbak?:any) { // user is connected to the internet

    userOnlineCallback();  // the connection callback function to be invoked

    if (userDisconnectedCallbak) {
      this.network
        .onDisconnect() // after a while he disconnected to the internet
        .subscribe(data=> {
          userDisconnectedCallbak()  // the connection callback function to be invoked
        })
    }


  }

  public watchOnConnect(nextCallBack:any, errCallBack?:any, CompleteCallBack?:any) {
    this.network
      .onConnect()
      .subscribe(
        connection => {
          nextCallBack();
        },
        err => {
          console.warn(err.json());
          errCallBack&&errCallBack();
        }, () =>{
          CompleteCallBack&&CompleteCallBack();
        })
  }

  public watchOnDisConnect(nextCallBack:any, errCallBack?:any, CompleteCallBack?:any) {
    this.network
      .onConnect()
      .subscribe(
        connection => {
          nextCallBack();
        },
        err => {
          console.warn(err.json());
          errCallBack&&errCallBack();
        }, () =>{
          CompleteCallBack&&CompleteCallBack();
        })
  }

}
