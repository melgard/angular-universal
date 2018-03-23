import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditValuesComponent} from './settings/edit-values/edit-values.component';
import {CountryOffersComponent} from './settings/country-offers/country-offers.component';
import {EditCountryOffersComponent} from './settings/edit-country-offers/edit-country-offers.component';

export const acreditationRoutes: Routes = [
  {path: 'buy', component: CountryOffersComponent},
  {path: 'edit-offers', component: EditCountryOffersComponent},
  {path: 'edit-values', component: EditValuesComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(acreditationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AcreditationRoutingModule {
}
