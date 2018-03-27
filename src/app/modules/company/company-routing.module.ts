import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {SettingsContainerComponent} from './settings/settings-container/settings-container.component';

export const companyRoutes: Routes = [
  {path: ':groupId/settings', component: SettingsContainerComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild(companyRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CompanyRoutingModule {
}
