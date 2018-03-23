import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {SharedModule} from '../shared/shared.module';

import {environment} from '@env/environment';
import {SearchService} from '@app/services/search/search.service';

import {UserService} from '@app/services/user.service';
import {ApiService} from '@app/services/api.service';
import {UtilsService} from '@app/services/utils.service';
import {OfferService} from '@app/services/offer.service';

// Add services providers and app.module only used components.
@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule
  ],
  declarations: [],
  exports: [],
  providers: [
    {provide: 'environment', useValue: environment},
    UserService,
    SearchService,
    ApiService,
    UtilsService,
    OfferService,
    UserService, /*
    ParametricsService*/
  ]
})
export class CoreModule {
}
