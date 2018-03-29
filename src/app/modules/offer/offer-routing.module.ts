import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {ContainerComponent as UserContainerComponent} from './user/container/container.component';
import {DashboardComponent} from './company/dashboard/dashboard.component';
import {PopoverModule} from 'ngx-bootstrap';
import {NewOfferViewComponent} from './company/new-offer-view/new-offer-view.component';
import {EditOfferViewComponent} from './company/edit-offer-view/edit-offer-view.component';
import {OfferPreviewComponent} from './company/offer-preview/offer-preview.component';
import {DashboardDetailComponent} from './company/timeline/dashboard-detail/dashboard-detail.component';
import {UserTimelineComponent} from './company/timeline/dashboard-detail/user-timeline/user-timeline.component';
import {TestMatchComponent} from './company/timeline/test-match/test-match.component';
import {ResumeUserComponent} from './company/timeline/resume-user/resume-user.component';
import {MyAppliesComponent} from './user/my-applies/my-applies.component';
import {RefineOfferViewComponent} from './company/refine-offer-filters/refine-offer-filters.component';

export const signupRoutes: Routes = [{
  path: 'info',
  children: [
    {
      path: ':code',
      component: UserContainerComponent
    }
  ]
}, {path: 'company-dashboard/:groupId', component: DashboardComponent},
  {path: 'new/:groupId', component: NewOfferViewComponent},
  {path: 'edit/:groupId/:id', component: EditOfferViewComponent},
  {path: 'refine/:groupId', component: RefineOfferViewComponent},
  {path: 'preview/:groupId/:id', component: OfferPreviewComponent},
  {path: 'company-dashboard-detail/:groupId/:offerId', component: DashboardDetailComponent},
  {path: 'company-dashboard-detail/:groupId/:offerId/profile/:profileId', component: UserTimelineComponent},
  {path: 'company-dashboard-detail/:groupId/:offerId/testmatch/:token', component: TestMatchComponent},
  {path: 'company-dashboard-detail/:groupId/:offerId/testmatch/:token/resume/:uid', component: ResumeUserComponent},
  {path: 'my-applies', component: MyAppliesComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(signupRoutes),
    PopoverModule.forRoot()
  ],
  exports: [
    RouterModule
  ]
})
export class OfferRoutingModule {
}
