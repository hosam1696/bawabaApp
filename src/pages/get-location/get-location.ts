// Main Components
import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, ViewController, } from 'ionic-angular';
import {GoogleMaps, GoogleMap, GoogleMapsEvent, LatLng, CameraPosition, MarkerOptions, Marker} from '@ionic-native/google-maps';

// Providers
import {Users} from "../../providers/users";
import {API} from "../../providers/api";
// Req Pages


//@IonicPage()
@Component({
    selector: 'page-get-location',
    templateUrl: 'get-location.html',
})
export class GetLocation {
    element: any;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
//        private googleMaps: GoogleMaps,
        public viewCtrl: ViewController,
        public api: API,
        public users: Users,

    ) {

    }


    ngAfterViewInit() {
        this.loadMap();
        console.log('Map is ready!');

    }
    loadMap() {
        //
//        let element: HTMLElement = document.getElementById('map');
        //
//        let map: GoogleMap = this.googleMaps.create(element);
        //
        //        // listen to MAP_READY event
        //        // You must wait for this event to fire before adding something to the map or modifying it in anyway
//        map.one(GoogleMapsEvent.MAP_READY).then(
//            () => {
//                console.log('Map is ready!22');
//                //                // Now you can add elements to the map like the marker
//            }
//        );
        //
        //        // create LatLng object
        //        let ionic: LatLng = new LatLng(43.0741904, -89.3809802);
        //
        //        // create CameraPosition
        //        let position: CameraPosition = {
        //            target: ionic,
        //            zoom: 18,
        //            tilt: 30
        //        };
        //
        //        // move the map's camera to position
        //        map.moveCamera(position);
        //
        //        // create new marker
        //        let markerOptions: MarkerOptions = {
        //            position: ionic,
        //            title: 'Ionic'
        //        };
        //
        ////        const marker: Marker = map.addMarker(markerOptions)
        ////            .then((marker: Marker) => {
        ////                marker.showInfoWindow();
        ////            });
    }
    //


    ionViewDidEnter() {
        // Run After Page Already Entered
    }

    ionViewDidLoad() {


    }
    dismiss() {
        this.viewCtrl.dismiss();
    }



}
