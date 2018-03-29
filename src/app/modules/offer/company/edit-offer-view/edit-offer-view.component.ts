import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Params} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';

import {AreaService, OfferService} from '@app/services/index.services';
import {Offer} from '@app/models/index.models';


@Component({
  selector: 'app-edit-offer-view',
  templateUrl: './edit-offer-view.component.html',
  styleUrls: ['./edit-offer-view.component.scss']
})
@AutoUnsubscribe()
export class EditOfferViewComponent implements OnInit, OnDestroy {

  offer: Offer = null;
  form: FormGroup;
  offerSub: Subscription;
  loading = false;
  groupId = null;

  constructor(private offerService: OfferService,
              private activatedRoute: ActivatedRoute,
              private areaService: AreaService,
              private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.loading = true;
    this.offerSub = this.activatedRoute.params.flatMap((params: Params) => {
      const offerId = params['id'];
      this.groupId = params['groupId'];
      return this.offerService.getOffer(offerId, this.groupId);
    }).subscribe((offer: Offer) => {
      this.offer = offer;
      this.form = this.formBuilder.group({});
      this.loading = false;
    });
  }

  ngOnDestroy() {

  }

}
