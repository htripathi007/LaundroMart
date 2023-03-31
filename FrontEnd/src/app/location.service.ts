import { Injectable } from '@angular/core';
import * as countrycitystatejson from '../../node_modules/country-state-city';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private countryData = countrycitystatejson;
  
  getStatesByCountry(countryShotName: string) {
    return this.countryData.State.getStatesOfCountry('IN');
  }

  getCitiesByState(country: string, state: string) {
    return this.countryData.City.getCitiesOfState('IN',state)
  }
}
