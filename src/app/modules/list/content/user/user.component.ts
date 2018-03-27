import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';

import {Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {IContent} from '../iContent.component';
import {AppConfig} from '@app/app-config';
import {UserSearchResult} from '@app/models/search-result-user.model';
import {UserService} from '@app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, IContent, OnDestroy {
  isLoggedIn: boolean;
  public noImage = AppConfig.USER_NO_IMAGE;
  @Input() user: UserSearchResult;
  private subscriptions: Subscription[] = [];

  constructor(@Inject('environment') private environment,
              private userService: UserService,
              private router: Router) {

  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.loggedIn.subscribe(value => this.isLoggedIn = value.signedIn)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onActionButton() {
    alert('conectar');
  }

  getActionButtonText(): string {
    return 'conectar';
  }

  getLoginUrl(): string {
    return `${this.environment.api_url}/login`;
  }

  onTitle() {
    this.router.navigate(['/wall/user', this.user.id]);
  }
}
