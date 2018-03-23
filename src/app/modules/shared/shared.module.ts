import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {TypeaheadModule} from 'ngx-bootstrap';
import {FileUploadModule} from 'primeng/primeng';
import {HttpModule} from '@angular/http';
import {CustomTypeaheadDirective} from './custom-typeahead/custom-typeahead.directive';
import {FilterByPipe} from './pipes/filter.pipe';
import {LinkyModule} from 'angular-linky';
import {SimpleUploadFileComponent} from './modals/simple-upload-file/simple-upload-file.component';

import {ObservableErrorComponent} from './observable-error/observable-error.component';
import {TrafficLightComponent} from './components/traffic-light/traffic-light.component';
import {RatingsWithStarsComponent} from './components/ratings-with-stars/ratings-with-stars.component';
import {RouterModule} from '@angular/router';
import {ChipComponent} from './components/chip/chip.component';
import {ChipListComponent} from './components/chiplist/chiplist.component';
import {DndModule} from 'ng2-dnd';
import {NavComponent} from '@app/modules/shared/components/nav/nav.component';

// Add shared components, directives and pipes
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //ApiModule, // TODO: descomentar
    FileUploadModule,
    LinkyModule,
    DndModule.forRoot(),
    TypeaheadModule.forRoot(),
    RouterModule
  ],
  entryComponents: [
    SimpleUploadFileComponent
  ],
  declarations: [
    // FooterComponent, // TODO: descomentar
    NavComponent,
    FilterByPipe,
    SimpleUploadFileComponent,
    CustomTypeaheadDirective,
    ObservableErrorComponent,
    TrafficLightComponent,
    RatingsWithStarsComponent,
    ChipComponent,
    ChipListComponent
  ],
  exports: [
    // FooterComponent, // TODO: descomentar
    NavComponent,
    SimpleUploadFileComponent,
    FilterByPipe,
    LinkyModule,
    CommonModule,
    HttpModule,
    //ApiModule, // TODO: descomentar
    FileUploadModule,
    CustomTypeaheadDirective,
    ObservableErrorComponent,
    TrafficLightComponent,
    RatingsWithStarsComponent,
    ChipListComponent
  ]
})
export class SharedModule {
}
