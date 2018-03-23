import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '@app/modules/shared/shared.module';
import {FormsModule} from '@angular/forms';
//Modulos Applicacion
import {CoreModule} from '@app/modules/core/core.module';
import {HomeRoutingModule} from './home-routing.module';
//Modulos de terceros
import {Ng4GeoautocompleteModule} from 'ng4-geoautocomplete';
// Components
import {HomeComponent} from './home.component';
import {HeaderComponent} from '@app/modules/home/components/header/header.component';
import {HomeFilterValueComponent} from '@app/modules/home/components/home-filter-value/home-filter-value.component';
import {HomeContainerComponent} from '@app/modules/home/components/home-container/home-container.component';
import {BePartComponent} from '@app/modules/home/components/home-container/be-part/be-part.component';
import {BirpinSummaryComponent} from '@app/modules/home/components/home-container/birpin-summary/birpin-summary.component';
import {FeaturedJobComponent} from '@app/modules/home/components/home-container/featured-job/featured-job.component';
// Services
import {SearchableService} from '@app/modules/home/services/searchable.service';
import {FeaturedJobService} from '@app/modules/home/components/home-container/featured-job/featured-job.service';
import {BirpinSummaryService} from '@app/modules/home/components/home-container/birpin-summary/birpin-summary.service';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    HomeRoutingModule,
    Ng4GeoautocompleteModule.forRoot(),
    FormsModule
  ],
  declarations: [
    HomeComponent,
    HeaderComponent,
    HomeFilterValueComponent,
    HomeContainerComponent,
    BePartComponent,
    BirpinSummaryComponent,
    FeaturedJobComponent,
  ],
  providers: [
    SearchableService,
    {provide: 'featuredJob', useClass: FeaturedJobService},
    {provide: 'birpinSummary', useClass: BirpinSummaryService},
  ]
})
export class HomeModule {

  constructor() {
  }

}
