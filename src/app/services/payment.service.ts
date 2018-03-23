import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import {environment} from '@env/environment';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class PaymentService {

  constructor(private http: HttpClient) {
  }

  getCountryOffers(country: string): Observable<object> {
    return this.http.get(environment.back_mercadopago + 'payment-service?country=' + country);
  }

  getAllCountryOffers(): Observable<object> {
    return this.http.get(environment.back_mercadopago + 'payment-service/all-offers');
  }

  upsertCountryOffers(countryOffer: object): Observable<object> {
    return this.http.post(environment.back_mercadopago + 'payment-service', countryOffer, httpOptions);
  }

  getValues(): Observable<object> {
    return this.http.get(environment.back_mercadopago + 'payment-service/values');
  }

  upsertValues(values: object): Observable<object> {
    console.log('upsertValues');
    return this.http.post(environment.back_mercadopago + 'payment-service/values', values);
  }
}
