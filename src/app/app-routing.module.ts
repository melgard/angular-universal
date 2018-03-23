import {RouterModule, Routes} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    loadChildren: 'app/layouts/main-layout/main-layout.module#MainLayoutModule'
  }
];

export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes, {});
