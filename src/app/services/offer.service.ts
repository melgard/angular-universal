import {Inject, Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {API} from '@app/modules/core/api.constants';
// models
import {Offer} from '@app/models/offer.model';
import {Apply} from '@app/models/apply.model';
import {OfferUser} from '@app/models/offer-user.model';
import {UserService} from '@app/services/user.service';
import {UtilsService} from '@app/services/utils.service';
import {ApiService} from '@app/services/api.service';

// services

@Injectable()
export class OfferService {
  selectedOffer: Offer = null;

  constructor(@Inject('environment') private environment,
              private apiService: ApiService,
              private utilsService: UtilsService,
              private userService: UserService,
              private http: Http) {

  }

  getOffers(groupId): Observable<Offer[]> {

    return this.apiService.get(API.OFFER + 'company/' + groupId + '/offers/', {}).map((data) => {
      const offers: Offer[] = [];

      if (data.content) {
        data.content.forEach((elem) => {
          const offerObj = new Offer(elem);
          // TODO MAKE REAL RECOMENDEDS
          offerObj.recomendedUsers = [];
          offers.push(offerObj);
        });
      }

      return offers;
    });

  }

  createOffer(offer, groupId) {

    return this.http.post(API.OFFER + 'company/' + groupId + '/offers/', offer);
  }

  createOfferFilter(offerFilter, offer) {

    return this.http.post(API.OFFER + 'company/' + offer.companyId + '/offers/' + offer.id + '/offerFilter/', offerFilter);
  }

  updateOffer(offer, groupId) {
    return this.apiService.put(API.OFFER + 'company/' + groupId + '/offers/' + offer.id, offer);
  }

  pauseOffer(offer, groupId): Observable<Offer> {
    offer.paused = true;
    return this.updateOffer(offer, groupId);
  }

  resumeOffer(offer, groupId): Observable<Offer> {
    offer.paused = false;
    return this.updateOffer(offer, groupId);
  }

  deleteOffer(offer, groupId): Observable<Offer> {
    return this.apiService.delete(API.OFFER + 'company/' + groupId + '/offers/' + offer.id, offer);
  }

  getOffer(id, groupId): Observable<Offer> {

    return this.apiService.get(API.OFFER + 'company/' + groupId + '/offers/' + id, {}).map((data) => {
      const offer: Offer = new Offer(data);
      // TODO MAKE REAL RECOMENDEDS
      offer.recomendedUsers = [];

      return offer;
    });

  }

  getSelectedOffer(): Offer {
    return this.selectedOffer;
  }

  getOfferForUser(id: string): Observable<OfferUser> {
    return this.apiService
      .get(API.OFFER + '/user/offers/' + id, {})
      .map(data => new OfferUser(data));
  }

  save(offer): Observable<Offer> {
    return Observable.of(offer).delay(2000);
  }

  saveAndPublish(offer): Observable<Offer> {
    return Observable.of(offer).delay(2000);
  }

  setSelectedOffer(selectedOffer: Offer) {
    this.selectedOffer = selectedOffer;
  }

  getOfferTypes(): Observable<any[]> {
    const mockedOffers: any[] = [
      {
        id: 2, name: 'premium', active: () => {
          return /*TODO deberia chequear si el user tiene creditos*/ false;
        }
      },
      {
        id: 1, name: 'standard', active: () => {
          return true;
        }
      }
    ];

    return Observable.of(mockedOffers);
  }

  apply(offerId) {
    const apiUrl = `${this.environment.api_url}/api/offers/${offerId}/applies`;

    return this.http.post(apiUrl, {});
  }

  getConnectedUserApplies(): Observable<Apply[]> {
    const apiUrl = `${this.environment.api_url}/api/offers/applies/me`;

    return this.http
      .get(apiUrl)
      .map((res: Response) => res.json().map(a => new Apply(a)));
  }
}
