import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {MainLayoutComponent} from './main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', loadChildren: 'app/modules/home/home.module#HomeModule'},
      // {path: 'signup', loadChildren: 'app/modules/signup/signup.module#SignupModule'},
      // {path: 'company', loadChildren: 'app/modules/company/company.module#CompanyModule'},
      {path: 'list', loadChildren: 'app/modules/list/list.module#ListModule'},
      // {path: 'offer', loadChildren: 'app/modules/offer/offer.module#OfferModule'},
      // {path: 'wall', loadChildren: 'app/modules/wall/wall.module#WallModule'},
    ]
  }
];

export const MainLayoutRoutingModule: ModuleWithProviders = RouterModule.forChild(routes);
