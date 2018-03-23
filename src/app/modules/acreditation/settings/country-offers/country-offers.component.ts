import {Component, OnInit} from '@angular/core';
import {PaymentService} from '@app/services/payment.service';


@Component({
  selector: 'app-country-offers',
  templateUrl: './country-offers.component.html',
  styleUrls: []
})
export class CountryOffersComponent implements OnInit {

  countryOffers = [];
  values = {};
  url = 'https://www.mercadopago.com/mla/checkout/start?pref_id=296685205-06ef6811-cf1a-4e09-b0e5-4d0fc8624910';

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.getCountryOffers();
    this.getValues();
  }

  getCountryOffers() {
    this.paymentService.getCountryOffers('COL')
      .subscribe(result => this.getCountryOffersSuccess(result), error => this.getCountryOffersError(error));
  }

  getValues() {
    this.paymentService.getValues()
      .subscribe(result => this.getValuesSucces(result), error => this.getValuesError(error));
  }

  getCountryOffersSuccess(result) {
    this.countryOffers = result[0].offers;
  }

  getCountryOffersError(error) {
    console.log(error);
  }

  getValuesSucces(result) {
    this.values = result[0];
  }

  getValuesError(error) {

  }
}
