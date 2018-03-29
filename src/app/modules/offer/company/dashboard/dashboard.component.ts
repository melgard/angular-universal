import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {ActivatedRoute} from '@angular/router';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import 'rxjs/add/observable/forkJoin';

import {OfferService, UserService} from '@app/services/index.services';
import {CompanyStat, Offer} from '@app/models/index.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: []
})

@AutoUnsubscribe()
export class DashboardComponent implements OnInit, OnDestroy {
  offers: Offer[] = [];
  stats: CompanyStat[];
  getStatsSub: Subscription;
  getOffersSub: Subscription;
  loading = false;
  groupId = null;

  constructor(public offerService: OfferService,
              private activatedRoute: ActivatedRoute,
              private _userService: UserService) {

  }

  ngOnInit() {

    this.loading = true;

    this.getStatsSub = this.activatedRoute.params.do((params) => {
      this.groupId = params['groupId'];
    }).flatMap(() => {
      return Observable.forkJoin([
        this._userService.getStats(),
        this.offerService.getOffers(this.groupId)
      ]);
    }).subscribe((results) => {
      this.stats = results[0];
      this.offers = results[1];
      this.loading = false;
    });

  }

  getCredits(): number {
    return this._userService.getCredits();
  }

  ngOnDestroy() {
  }

}
