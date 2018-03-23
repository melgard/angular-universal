import {Component, OnInit} from '@angular/core';

import {PaymentService} from '../../../../services/payment.service';

@Component({
  selector: 'app-edit-country-offers',
  templateUrl: './edit-country-offers.component.html',
  styleUrls: []
})
export class EditCountryOffersComponent implements OnInit {

  allCountryOffers = [];
  currentOffer = {
    offers: [
      {},
      {},
      {},
      {},
      {}
    ]
  };

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.getAllCountryOffers();
  }

  getAllCountryOffers() {
    this.paymentService.getAllCountryOffers()
      .subscribe(result => this.getAllCountryOffersSuccess(result), error => this.getAllCountryOffersError(error));
  }

  getCountryOffers(country) {
    this.paymentService.getCountryOffers(country)
      .subscribe(result => this.getCountryOffersSuccess(result), error => this.getCountryOffersError(error));
  }

  upsertCountryOffers() {
    this.paymentService.upsertCountryOffers(this.currentOffer)
      .subscribe(result => this.upsertCountryOffersSuccess(result), error => this.upsertCountryOffersError(error));
  }

  getAllCountryOffersSuccess(result) {
    this.allCountryOffers = result;
  }

  getAllCountryOffersError(error) {
    console.log(error);
  }

  getCountryOffersSuccess(result) {
    this.currentOffer = result[0];
    console.log(result[0]);
  }

  getCountryOffersError(error) {
    console.log(error);
  }

  upsertCountryOffersSuccess(result) {
    console.log(result);
  }

  upsertCountryOffersError(error) {
    console.log(error);
  }
}
