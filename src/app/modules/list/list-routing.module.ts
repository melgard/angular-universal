import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ListContainerComponent} from './list-container/list-container.component';
import {FilteredContainerComponent} from './filtered-container/filtered-container.component';

export const listRoutes: Routes = [
  {
    path: '',
    component: ListContainerComponent
  }, {
    path: ':filteringEntity',
    component: FilteredContainerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(listRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class ListRoutingModule {
}
