import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {SharedModule} from '@app/modules/shared/shared.module';
import {ApiService, OfferService, SearchService, UtilsService} from '@app/services/index.services';
import {ParametricsService} from '@app/services/parametrics.service';


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
    SearchService,
    ApiService,
    UtilsService,
    OfferService,
    ParametricsService
  ]
})
export class CoreModule {
}
