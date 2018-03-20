import {BrowserModule} from '@angular/platform-browser';
import {APP_ID, Inject, NgModule, PLATFORM_ID} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {isPlatformBrowser} from '@angular/common';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'ui'}),
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              @Inject(APP_ID) private appId: string) {
    const platform = isPlatformBrowser(this.platformId) ? 'browser' : 'server';
    console.log('Corriendo desde el', platform);
  }
}
