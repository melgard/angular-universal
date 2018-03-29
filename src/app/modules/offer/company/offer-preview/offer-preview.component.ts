import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs/Subscription';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import {AreaService, ContractKindService, HierarchyService, OfferService, UserService} from '@app/services/index.services';
import {Career, Offer} from '@app/models/index.models';
import {CreateOffer} from '../../../../models/create-offer.model';
import {Location} from '../../../../models/location.model';

@Component({
  selector: 'app-offer-preview',
  templateUrl: './offer-preview.component.html',
  styleUrls: ['./offer-preview.component.scss']
})
@AutoUnsubscribe()
export class OfferPreviewComponent implements OnInit, OnDestroy {

  offer: Offer;
  loading = false;
  types = [];
  hierarchies = [];
  contractKinds = [];
  areas = [];
  offerSub: Subscription;
  positionSub: Subscription;
  hierarchySub: Subscription;
  areaSub: Subscription;
  saveSub: Subscription;
  typeSub: Subscription;
  groupId = null;

  constructor(private router: Router, private areaService: AreaService
    , private offerService: OfferService, private toastr: ToastrService
    , private contractKindService: ContractKindService
    , private hierarchyService: HierarchyService, private activatedRoute: ActivatedRoute, private _userService: UserService) {

    this.loading = true;
    this.activatedRoute.params.subscribe((params: Params) => {
      const offerId = params['id'];
      this.groupId = params['groupId'];
      this.offerSub = this.offerService.getOffer(offerId, this.groupId).subscribe((offer) => {
        this.offer = offer;
        this.loading = false;
      });
    });

    this.typeSub = this.offerService.getOfferTypes().subscribe((types) => {
      this.types = types;
    });

    this.positionSub = this.contractKindService.getContractKinds().subscribe((p) => {
      this.contractKinds = p;
    });

    this.hierarchySub = this.hierarchyService.getHierarchies().subscribe((hs) => {
      this.hierarchies = hs;
    });

    this.areaSub = this.areaService.getAreas().subscribe((hs) => {
      this.areas = hs;
    });

  }

  ngOnInit() {

  }

  showArea(offer) {
    return this.areas.filter((z) => {
      return z.value.toString() === offer.cluster.toString();
    }).shift().value;
  }

  editOffer() {
    this.router.navigate(['offer/edit/', this.groupId, this.offer.id]);
  }

  showZone(offer) {
    return `${this.offer.sublocation}, ${this.offer.location}, ${this.offer.country}`;
  }

  showHierachyLevel(offer) {
    return this.hierarchies.filter((z) => {
      return z.id.toString() === offer.hierarchyLevel.toString();
    }).shift().value;
  }

  showContractKind(offer) {
    return this.contractKinds.filter((z) => {
      return z.id === offer.contractKind.toString();
    }).shift().value;
  }

  saveOffer() {
    this.toastr.success('La oferta fue guardada satisfactoriamente!');
    this.router.navigate(['offer/company-dashboard', this.groupId]);
  }

  saveAndPublishOffer() {
    this.offer.active = true;

    let careers: Career[] = [];
    if (this.offer.careers) {
      careers = this.offer.careers.map(
        c => new Career({
          id: c.careerId,
          clusterId: c.clusterId
        })
      );
    }

    const createOffer = new CreateOffer({
      id: this.offer.id,
      title: this.offer.title,
      body: this.offer.body,
      location: new Location({
        country: this.offer.country,
        location: this.offer.location,
        sublocation: this.offer.sublocation
      }),
      careers: careers ? careers : [],
      hierarchyLevel: this.offer.hierarchyLevel,
      contractKind: this.offer.contractKind,
      hiddenData: this.offer.hiddenData,
      allowComments: this.offer.allowComments,
      paused: this.offer.paused,
      category: this.offer.category,
      active: this.offer.active,
      companyId: this.groupId
    });

    this.offerService.updateOffer(createOffer, this.groupId).subscribe((offer) => {
      this.toastr.success('La oferta fue guardada y publicada satisfactoriamente!');
      this.router.navigate(['offer/company-dashboard', this.groupId]);
    });
  }

  ngOnDestroy() {

  }

}
