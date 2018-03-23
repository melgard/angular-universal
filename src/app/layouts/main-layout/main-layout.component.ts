import {Component} from '@angular/core';

@Component({
  selector: 'app-pages',
  template: `
    <app-navbar></app-navbar>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class MainLayoutComponent {

  constructor() {
  }


}
