import {Injectable} from '@angular/core';
import {Offer} from '@app/models/index.models';

@Injectable()
export class OfferCreateService {

  private offer: Offer = new Offer();

  public getOffer() {
    return this.offer;
  }

  public updateOffer(offer: Offer) {
    this.offer = Object.assign(this.offer, offer);
  }
}
