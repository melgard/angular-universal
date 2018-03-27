import {Component, OnInit} from '@angular/core';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
  styles: []
})
export class AppComponent implements OnInit {

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.userService.fetchUser();
  }

}
