import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';


import {Subscription} from 'rxjs/Subscription';
import {IContent} from '../iContent.component';
import {AppConfig} from '@app/app-config';
import {CompanySearchResult} from '@app/models/index.models';
import {UserService} from '@app/services/index.services';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit, IContent, OnDestroy {
  isLoggedIn: boolean;
  public noImage = AppConfig.COMPANY_NO_IMAGE;
  @Input() company: CompanySearchResult;
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

  getActionButtonText(): string {
    return 'seguir';
  }

  getLoginUrl(): string {
    return `${this.environment.api_url}/login`;
  }

  onActionButton() {
    alert('seguir');
  }

  onTitle() {
    this.router.navigate(['/wall/company', this.company.id]);
  }
}
