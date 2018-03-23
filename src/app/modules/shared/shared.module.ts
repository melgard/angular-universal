import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {HttpModule} from '@angular/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
// Modulos propios
import {ApiModule} from '@app/api/api.module';
// Modulos de terceros
import {DndModule} from 'ng2-dnd';
import {LinkyModule} from 'angular-linky';
import {FileUploadModule} from 'primeng/primeng';
import {TypeaheadModule} from 'ngx-bootstrap';
// Componentes
import {NavComponent} from './components/nav/nav.component';
import {FooterComponent} from './components/footer/footer.component';
import {ChipComponent} from './components/chip/chip.component';
import {ChipListComponent} from './components/chiplist/chiplist.component';
import {TrafficLightComponent} from './components/traffic-light/traffic-light.component';
import {RatingsWithStarsComponent} from './components/ratings-with-stars/ratings-with-stars.component';
import {SimpleUploadFileComponent} from './modals/simple-upload-file/simple-upload-file.component';
import {ObservableErrorComponent} from './observable-error/observable-error.component';
//Directivas
import {CustomTypeaheadDirective} from './custom-typeahead/custom-typeahead.directive';
//Pipes
import {FilterByPipe} from './pipes/filter.pipe';


// Services



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ApiModule,
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
    FooterComponent,
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
    FooterComponent,
    NavComponent,
    SimpleUploadFileComponent,
    FilterByPipe,
    LinkyModule,
    CommonModule,
    HttpModule,
    ApiModule,
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
