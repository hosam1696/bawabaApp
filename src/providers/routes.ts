import { Http } from '@angular/http';
import { University } from './../pages/university/university';
import { Injectable } from '@angular/core';


@Injectable()
export class RoutesProvider {

    constructor(private http: Http) {

    }

    getSearchResults(cityId, universityId, vehicleId, routeFrom, contract, goAndCome) {


        return this.http.get('http://www.bawabt-alnagel.com/api/v1/routes?city='+cityId+'&university='+universityId+'&vehicle_type='+vehicleId+'&route_from='+routeFrom+'&contract_period='+contract+'&go_come='+goAndCome).map(serverRes=>serverRes.json());
    }

}