import {Component, Input, OnInit} from '@angular/core';
import {OfferService} from '@app/services/index.services';
import {Offer} from '@app/models/index.models';
import {ActivatedRoute, Router} from '@angular/router';
import {itemsAnimated} from '../../../../shared/animations/animations';

@Component({
  selector: 'app-offers-table',
  templateUrl: './offers-table.component.html',
  styleUrls: ['./offers-table.component.scss'],
  animations: [itemsAnimated]
})
export class OffersTableComponent implements OnInit {

  @Input('offers') offers: Offer[];
  loading = false;
  groupId = null;

  constructor(public offerService: OfferService, public router: Router, private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      this.groupId = params['groupId'];
    });

  }

  selectOffer(offer) {
    this.router.navigate(['/offer/company-dashboard-detail/', this.groupId, offer.id]);
  }

  pauseOffer(offer) {
    this.loading = true;
    const sub = this.offerService.pauseOffer(offer, this.groupId).subscribe((_) => {
      offer.paused = true;
      this.loading = false;
      sub.unsubscribe();
    });
  }

  resumeOffer(offer) {
    this.loading = true;
    const sub = this.offerService.resumeOffer(offer, this.groupId).subscribe((_) => {
      offer.paused = false;
      this.loading = false;
      sub.unsubscribe();
    });
  }

  deleteOffer(offer) {
    this.loading = true;
    const sub = this.offerService.deleteOffer(offer, this.groupId).subscribe((_) => {
      offer.deletedAt = new Date();
      this.loading = false;
      sub.unsubscribe();
    });

  }

  getOffers() {
    return this.offers.filter((offer: Offer) => {
      return !offer.isDeleted();
    });
  }

}
