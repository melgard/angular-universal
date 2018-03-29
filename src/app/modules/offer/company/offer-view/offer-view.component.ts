import {Component, Input, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {Observable} from 'rxjs/Observable';

import * as _ from 'lodash';
import {ContractKindService, HierarchyService, OfferService, ParametricsService} from '@app/services/index.services';

import {CompanyService} from '@app/api/company-service/company.service';

import {Career, ContractKind, CreateOffer, Hierarchy, Location, Offer, Parametric as Cluster} from '@app/models/index.models';

import {OfferCreateService} from '../services/offer-create.service';


@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-offer-view',
  templateUrl: './offer-view.component.html',
  styleUrls: ['./offer-view.component.scss'],

})
@AutoUnsubscribe()
export class OfferViewComponent implements OnInit, OnDestroy {

  @Input('offer') offer: Offer;
  @Input('offerForm') offerForm: FormGroup;

  types = [];
  clusters: Cluster[] = [];
  careers: Career[] = [];
  hierarchies: Hierarchy[] = [];
  contractKinds: ContractKind[] = [];
  companyPerks: any[] = [];
  typeSub: Subscription;
  positionSub: Subscription;
  hierarchySub: Observable<any>;
  companyPerksSub: Subscription;
  createOfferSub: Subscription;
  updateOfferSub: Subscription;
  loading = false;
  ready = false;
  groupId = null;
  currentLocation: Location = null;
  private careersCache: Career[] = [];
  private locationString = '';

  public autocompleteSettings: any = {
    inputPlaceholderText: '',
    showSearchButton: false,
    showRecentSearch: false,
    geoCountryRestriction: ['ar'],
    showCurrentLocation: false,
    inputString: this.locationString
  };

  constructor(private fb: FormBuilder,
              public router: Router,
              public offerService: OfferService,
              public contractKindService: ContractKindService,
              public hierarchyService: HierarchyService,
              private activatedRoute: ActivatedRoute,
              private parametricsService: ParametricsService,
              private companyService: CompanyService,
              private offerCreateService: OfferCreateService) {
    this.hierarchySub = this.parametricsService.getBusinessPositions();
  }

  ngOnInit() {
    this.activatedRoute.params.flatMap((params) => {
      this.groupId = params['groupId'];

      return this.parametricsService.getClusters();
    }).flatMap((clusters: Cluster[]) => {
      this.clusters = clusters;

      this.offerForm = this.fb.group({
        'cluster': ['', Validators.required]
      });
      return this.parametricsService.getCareers();
    }).subscribe((careers: Career[]) => {
      this.careersCache = careers;

      this.offerForm.addControl('careers', this.fb.array([]));
      this.offerForm.get('cluster').valueChanges.subscribe(this.getReloadCareersChecklistFromClusterIdFunction());

      const selectedClusterId = this.getSelectedClusterId();
      if (selectedClusterId !== null) this.offerForm.get('cluster').setValue(selectedClusterId);

      const formFields = [
        {field: 'title', control: new FormControl(this.offer.title, [Validators.required])},
        {field: 'body', control: new FormControl(this.offer.body, [Validators.required])},
        {field: 'hierarchyLevel', control: new FormControl(this.offer.hierarchyLevel, [Validators.required])},
        {field: 'contractKind', control: new FormControl(this.offer.contractKind, [Validators.required])},
        {field: 'hiddenData', control: new FormControl(this.offer.hiddenData || true, [])},
        {field: 'allowComments', control: new FormControl(this.offer.allowComments || false, [])},
        {field: 'category', control: new FormControl(this.offer.category, [Validators.required])},
        {field: 'salary', control: new FormControl(this.offer.salary, [Validators.required])}
      ];

      formFields.forEach((field) => {
        this.offerForm.addControl(field.field, field.control);
      });
      this.getFormData();

      this.loading = false;
      this.ready = true;
      setTimeout(() => {
        if (this.offer.id) {
          const sublocation = this.offer.sublocation;
          const location = this.offer.location;
          const country = this.offer.country;

          this.currentLocation = this.createLocation(
            sublocation,
            location,
            country
          );

          this.setSearchPlacesInputText(`${sublocation}, ${location}, ${country}`);
        }
      }, 1000);

    });
  }

  getFormData() {
    this.typeSub = this.offerService.getOfferTypes().subscribe((types) => {
      this.types = types;
    });

    this.positionSub = this.contractKindService.getContractKinds().subscribe((p) => {
      this.contractKinds = p;
    });

    this.companyPerksSub = this.companyService.getCompanyPerks(this.groupId).subscribe(p => {
      this.companyPerks = p;
    });

  }

  onLocationSelect(selectedLocation: any) {
    // fixme pasar esto a un helper
    const sublocation =
      this.extractLocationType(selectedLocation, 'administrative_area_level_2') ||
      this.extractLocationType(selectedLocation, 'locality');

    this.currentLocation = this.createLocation(
      sublocation,
      this.extractLocationType(selectedLocation, 'administrative_area_level_1'),
      this.extractLocationType(selectedLocation, 'country')
    );
  }

  onDeleteAutocompleteInput() {
    this.currentLocation = null;
    this.setSearchPlacesInputText('');
  }

  ngOnDestroy() {

  }

  refineFiltersRedirect() {
    const offerToSave = this.formControlsToOffer(this.offerForm.controls);
    if (!offerToSave.id) {
      this.createOfferSub = this.offerService.createOffer(offerToSave, this.groupId).subscribe((resp) => {
        this.offerCreateService.updateOffer(resp.json());
        this.router.navigate(['/offer/refine', this.groupId]);
        this.loading = false;
      });
    } else {
      this.updateOfferSub = this.offerService.updateOffer(offerToSave, this.groupId).subscribe((offer) => {
        this.loading = false;
      });
    }
  }

  private createLocation(sublocation: string, location: string, country: string) {
    return new Location({
      sublocation,
      location,
      country
    });
  }

  private getCareersObjectFromArray(array) {
    return this.careers
      .filter((value, index) => array[index])
      .map(c => ({clusterId: c.clusterId, id: c.id}));
  }

  private getSelectedClusterId() {
    if (!this.offer.careers) return null;
    return this.offer.careers.reduce((clusterId, val: any) => val.clusterId, null);
  }

  private getReloadCareersChecklistFromClusterIdFunction() {
    return (value) => {
      this.careers = this.careersCache.filter(c => c.clusterId === value);

      const careersFormArray = this.careers.map((c) => {
        return _.findIndex(this.offer.careers, (elem) => {
          return elem.careerId === c.id;
        }) !== -1;
      });

      this.offerForm.setControl('careers', this.fb.array(careersFormArray));
    };
  }

  private extractLocationType(location, kind) {
    return location.data.address_components
      .filter(com => com.types.find(t => t === kind))
      .map(l => l.long_name)
      .find(_ => _);
  }

  private setSearchPlacesInputText(text: string) {
    // TODO Error Angular Universal
    //(<HTMLInputElement>document.getElementById('search_places')).value = text;
  }

  private formControlsToOffer(formControl): CreateOffer {
    return new CreateOffer({
      id: this.offer.id,
      title: formControl.title.value,
      body: formControl.body.value,
      location: this.currentLocation,
      careers: this.getCareersObjectFromArray(formControl.careers.value),
      hierarchyLevel: formControl.hierarchyLevel.value,
      contractKind: formControl.contractKind.value,
      hiddenData: formControl.hiddenData.value,
      allowComments: formControl.allowComments.value,
      paused: this.offer.paused,
      category: formControl.category.value,
      active: this.offer.active,
      companyId: this.groupId,
      salary: formControl.salary.value
    });
  }
}
