import {NgModule} from '@angular/core';
import {SharedModule} from '../../modules/shared/shared.module';
import {ListRoutingModule} from './list-routing.module';

import {FilterComponent} from './filter/filter.component';
import {AdComponent} from './ad/ad.component';
import {ListContainerComponent} from './list-container/list-container.component';
import {ContentComponent} from './content/content.component';
import {FormsModule} from '@angular/forms';
import {UserComponent} from './content/user/user.component';
import {CompanyComponent} from './content/company/company.component';
import {OfferComponent} from './content/offer/offer.component';
import {FilteredContainerComponent} from './filtered-container/filtered-container.component';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    SharedModule,
    ListRoutingModule,
    FormsModule,
    InfiniteScrollModule
  ],
  declarations: [
    FilterComponent,
    AdComponent,
    ListContainerComponent,
    ContentComponent,
    UserComponent,
    CompanyComponent,
    OfferComponent,
    FilteredContainerComponent
  ],
  providers: []
})
export class ListModule {
}
