import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {OfferService} from '@app/services/index.services';
import {OfferUser} from '@app/models/offer-user.model';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {

  offer: OfferUser;

  summary: {
    id: number,
    createdAt: string,
    logoUrl: string,
    location: string,
    position: string,
    alreadyApplied: boolean,
    company: string
  };

  constructor(private route: ActivatedRoute,
              private offerService: OfferService) {
    const code = this.route.snapshot.paramMap.get('code');

    this.offerService.getOfferForUser(code).subscribe(offer => {
      this.offer = offer;

      // fixme hay que agregar el campo descripción porque el offer component necesita el campo descripcion en vez de body
      this.offer['description'] = this.offer.body;

      this.summary = {
        id: this.offer.id,
        createdAt: (new Date(this.offer.createdAt)).toLocaleDateString(),
        logoUrl: this.offer.company.logoUrl,
        location: this.offer.location.location,
        position: this.offer.cluster,
        alreadyApplied: this.offer.alreadyApplied,
        company: this.offer.company.tradeName
      };
    });
  }

  ngOnInit() {
  }

}
