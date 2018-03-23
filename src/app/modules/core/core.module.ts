import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';

import {environment} from '@env/environment';
import {SharedModule} from '@app/modules/shared/shared.module';
import {ApiService, OfferService, SearchService, UserService, UtilsService} from '@app/services/index.services';
import {ParametricsService} from '@app/modules/core/services/parametrics.service';


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
    UserService,
    ParametricsService
  ]
})
export class CoreModule {
}
