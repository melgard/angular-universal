import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {CoreModule} from '@app/modules/core/core.module';
import {SharedModule} from '@app/modules/shared/shared.module';
import {environment} from '@env/environment';
import {UserService} from '@app/services/index.services';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ui'}),
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    CoreModule,
    SharedModule
  ],
  providers: [
    {provide: 'environment', useValue: environment},
    UserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(this.platformId) ? 'browser' : 'server';
    console.log('Corriendo desde el', platform);
  }
}
