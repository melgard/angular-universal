import {Component, Inject, Input, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {OfferSearchResult} from '@app/models/index.models';
import {IContent} from '@app/modules/list/content/iContent.component';
import {Subscription} from 'rxjs/Subscription';
import {AppConfig} from '@app/app-config';
import {UserService} from '@app/services/user.service';


@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit, IContent, OnDestroy {

  @Input() offer: OfferSearchResult;
  @Input() appliedOfferIds: number[] = [];
  isLoggedIn: boolean;
  public noImage = AppConfig.COMPANY_NO_IMAGE;
  private subscriptions: Subscription[] = [];

  constructor(@Inject('environment') private environment,
              private router: Router,
              private userService: UserService) {
  }

  ngOnInit() {
    this.subscriptions.push(
      this.userService.loggedIn
        .subscribe(value => {
          this.isLoggedIn = value.signedIn;
        })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onSelectOffer() {
    this.router.navigate(['/offer/info', this.offer.id]);
  }

  getLoginUrl() {
    return `${this.environment.api_url}/login`;
  }

  onActionButton() {
    this.router.navigate(['/offer/info', this.offer.id]);
  }

  getActionButtonText(offerId): string {
    return this.appliedOfferIds.findIndex(offId => offId === offerId) === -1
      ? 'ver aviso'
      : 'aviso aplicado';
  }

  getElapsedTime() {
    const date = new Date(this.offer.since);
    const now = new Date();
    const minutes: number = Math.ceil((now.valueOf() - date.valueOf()) / 1000 / 60);
    const hours: number = Math.ceil(minutes / 60);

    const aDay = 1440;

    if (minutes < 60) return `publicado hace ${minutes} minutos`;
    else if (minutes >= 60 && minutes < aDay) {
      return `publicado hace ${hours}hs`;
    }
    if (minutes >= aDay) {
      const days = Math.ceil(hours / 24);
      return `publicado hace ${days} días`;
    }
  }
}
