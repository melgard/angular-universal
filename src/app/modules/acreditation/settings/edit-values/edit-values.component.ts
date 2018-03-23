import {Component, OnInit} from '@angular/core';

import {PaymentService} from '@app/services/payment.service';

@Component({
  selector: 'app-edit-values',
  templateUrl: './edit-values.component.html',
  styleUrls: []
})
export class EditValuesComponent implements OnInit {

  values = {};

  constructor(private paymentService: PaymentService) {
  }

  ngOnInit() {
    this.getValues();
  }

  getValues() {
    this.paymentService.getValues()
      .subscribe(result => this.getValuesSucces(result), error => this.getValuesError(error));
  }

  upsertValues() {
    this.paymentService.upsertValues(this.values)
      .subscribe(result => this.upsertValuesSucces(result), error => this.upsertValuesError(error));
  }

  getValuesSucces(result) {
    this.values = result[0];
    console.log(this.values);
  }

  getValuesError(error) {
    console.log(error);
  }

  upsertValuesSucces(result) {
    console.log(result);
  }

  upsertValuesError(error) {
    console.log(error);
  }
}
