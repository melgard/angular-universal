import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MainLayoutComponent} from './main-layout.component';
import {MainLayoutRoutingModule} from './main-layout.routing';
import {FormsModule} from '@angular/forms';
// import { SharedModule } from '../modules/shared/shared.module';
import {Ng4GeoautocompleteModule} from 'ng4-geoautocomplete';
import {CoreModule} from '@app/modules/core/core.module';
import {SharedModule} from '@app/modules/shared/shared.module';

// import { CoreModule } from '../modules/core/core.module';

@NgModule({
  imports: [
    CommonModule,
    CoreModule,
    SharedModule,
    Ng4GeoautocompleteModule.forRoot(),
    FormsModule,
    MainLayoutRoutingModule
  ],
  declarations: [
    MainLayoutComponent,
  ],
  providers: []
})
export class MainLayoutModule {
}
