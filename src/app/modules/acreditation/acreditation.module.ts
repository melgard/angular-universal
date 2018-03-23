import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';

import {AcreditationRoutingModule} from './acreditation-routing.module';
import {EditValuesComponent} from './settings/edit-values/edit-values.component';
import {CountryOffersComponent} from './settings/country-offers/country-offers.component';
import {EditCountryOffersComponent} from './settings/edit-country-offers/edit-country-offers.component';
import {PaymentService} from '@app/services/payment.service';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    HttpClientModule,
    AcreditationRoutingModule
  ],
  declarations: [
    EditValuesComponent,
    CountryOffersComponent,
    EditCountryOffersComponent
  ],
  providers: [
    PaymentService
  ]
})
export class AcreditationModule {
}
