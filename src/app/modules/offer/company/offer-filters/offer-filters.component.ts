import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Constants} from './offer-filters.component.constants';


import {Offer, Skill} from '@app/models/index.models';
import {OfferFilter} from './offer-filter-dto';

import {OfferService} from '@app/services/index.services';
import {ParametricsService} from '../../../../services/parametrics.service';
import {OfferCreateService} from '../services/offer-create.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-offer-filters',
  templateUrl: './offer-filters.component.html',
  styleUrls: ['./offer-filters.component.scss']
})

@AutoUnsubscribe()
export class OfferFilterComponent implements OnInit {

  public constants: Constants;
  public managementDataSource: string[] = [];
  public technicalDataSource: string[] = [];
  public dataSourceMappings: { [id: string]: Skill; } = {};
  public technicalSkills: string[] = [];
  public managementSkills: string[] = [];
  public languageSkills: { [label: number]: number } = {};
  public offer: Offer;
  public offerFilter: OfferFilter = new OfferFilter();
  public form: FormGroup;

  constructor(public router: Router,
              private activatedRoute: ActivatedRoute,
              private parametricsService: ParametricsService,
              public offerService: OfferService,
              private offerCreateService: OfferCreateService) {
  }

  ngOnInit() {
    this.offer = this.offerCreateService.getOffer();
    this.activatedRoute.params.subscribe((params) => {

      this.constants = new Constants();
      this.parametricsService.getSkills().subscribe(r => {
        r.forEach((e: Skill) => {
          if (e.type === 'technical') {
            this.dataSourceMappings[e.description] = e;
            this.technicalDataSource.push(e.description);
          } else if (e.type === 'managment') {
            this.dataSourceMappings[e.description] = e;
            this.managementDataSource.push(e.description);
          }
        });
      });
    });
  }

  onSkillsChange(event: {}) {

    Object.keys(event).forEach(k => this.offerFilter.languageSkillset[this.dataSourceMappings[k].id] = event[k]);
  }

  showPreview() {
    const intersection: number[] = [];
    const offer: any = this.offer;
    this.managementSkills.forEach(r => this.offerFilter.managementSkillset.push(this.dataSourceMappings[r].id));
    this.technicalSkills.forEach(r => this.offerFilter.technicalSkillset.push(this.dataSourceMappings[r].id));
    this.offerFilter.offerId = this.offer.id;
    this.offerService.createOfferFilter(this.offerFilter, this.offer).subscribe(e => {
      this.offerFilter = e.json();
      this.router.navigate(['offer/preview/', offer.companyId, this.offer.id]);
    });

  }
}
