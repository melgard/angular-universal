import {EventEmitter, Inject, Injectable, Output} from '@angular/core';
import 'rxjs/add/operator/map';
import {Headers, Http, RequestOptions} from '@angular/http';
import {BehaviorSubject, Observable} from 'rxjs/Rx';
import * as _ from 'lodash';
import {Offer, Timeline, TimelineProfile} from '@app/models/index.models';
import {IHistorical} from '@app/interfaces/historical.interface';
import {IProfile} from '@app/interfaces/profile.interface';
import {IComment} from '@app/interfaces/comment.interface';


@Injectable()
export class TimelineService {

  @Output() timelineHabilitado: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalPhaseComunHide: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalPhasePruebasHide: EventEmitter<void> = new EventEmitter<void>();
  @Output() modalPrimeraInstancia: EventEmitter<IHistorical> = new EventEmitter<IHistorical>();


  private offer: Offer;
  private postulantes: TimelineProfile[] = [];
  private recomendados: TimelineProfile[] = [];
  private adquiridos: TimelineProfile[] = [];
  private preseleccionados: TimelineProfile[] = [];
  private perfiles: IProfile[] = [];
  private timeline: any = {};

  private offerSubject = new BehaviorSubject({});
  private postulantesSubject = new BehaviorSubject([]);
  private recomendadosSubject = new BehaviorSubject([]);
  private adquiridosSubject = new BehaviorSubject([]);
  private preseleccionadosSubject = new BehaviorSubject([]);
  private perfilesSubject = new BehaviorSubject([]);
  private timelineSubject = new BehaviorSubject({});

  constructor(private http: Http,
              @Inject('environment')
              private environment) {
    this.offer = new Offer();
  }

  // Obtengo las phases para configurar el formGroup
  public getPhases(timelineId?: number) {
    let url = `${this.environment.api_url}/api/timelines/`;
    if (!timelineId) {
      url = `${url}phases/default`;
    } else {
      url = `${url}${timelineId}/phases`;
    }
    return this.http.get(url);
  }

  // Obtengo la offer con todos los datos postulantes, preselccionados, timelne etrc..
  public getTimelineByOfferId(companyId: number, offerId: number) {
    const url = `${this.environment.api_url}/api/timelines/company/${companyId}/${offerId}`;
    console.log(url);
    this.http.get(url).map((resp: any) => {
      this.offer = new Offer(resp.offer);
      this.postulantes = resp.offer.applies || [];
      this.adquiridos = resp.adquiridos || [];
      this.recomendados = resp.offer.recomendedUsers || [];
      this.preseleccionados = resp.offer.preselectedUsers || [];
      this.timeline = resp.timeline;
      this.perfiles = resp.timeline.profiles;
    }).subscribe(() => {
      console.log(this.offer);
      this.updateObservables();
    });
  }

  public resetOffer() {
    this.offer = new Offer();
    this.preseleccionados = [];
    this.timeline = {};
    this.recomendados = [];
    this.updateObservables();
  }


  public getOffer(): Observable<any> {
    return this.offerSubject.asObservable();
  }

  public getPostulantes(): Observable<any[]> {
    return this.postulantesSubject.asObservable();
  }


  /* ****  PRESELECIONADOS  */
  public preselect(companyId: number, preselected): Observable<boolean> {
    if (!this.isPreselected(preselected)) {
      this.addPreselecto(companyId, preselected);
    } else {
      this.removePreselecto(companyId, preselected);
    }
    return Observable.of(true);
  }

  public getPreselectos(): Observable<any[]> {
    return this.preseleccionadosSubject.asObservable();
  }

  public addPreselecto(companyId: number, preselecto: any) {
    this.preseleccionados.push(...this.preseleccionados, preselecto);
    const body = {userId: preselecto.user_id};
    this.http.post(`${this.environment.api_url}/api/offers/company/${companyId}/offers/${this.offer.id}/preselectedUsers`, body)
      .subscribe(data => {
        this.preseleccionadosSubject.next(this.preseleccionados);
      });

  }

  public removePreselecto(companyId: number, preselecto: any) {
    const index = _.findIndex(this.preseleccionados, (o) => {
      return o.user_id === preselecto.user_id;
    });
    this.preseleccionados.splice(index, 1);
    this.http.delete(`${this.environment.api_url}/api/offers/company/${companyId}/offers/${this.offer.id}/preselectedUsers/${preselecto.user_id}`)
      .subscribe(data => {
        this.preseleccionadosSubject.next(this.preseleccionados);
      });
  }

  public isPreselected(preselected) {
    return _.findIndex(this.preseleccionados, (o) => {
      return o.user_id === preselected.user_id;
    }) !== -1;
  }

  /* ****  END PRESELECIONADOS  */

  /* PROFILES DE TIMELINE */

  public addProfile(idCompany, profile: IProfile) {
    profile.offer_id = this.offer.id;
    const body = JSON.stringify(profile);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.post(`${this.environment.api_url}/api/timelines/profiles/company/${idCompany}`, body, options)
      .map(res => {
        const data = res.json();
        this.perfiles = [...this.perfiles, data.profile];
        this.updateObservables();
        return profile;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  public updateProfile(profile: IProfile) {
    const body = JSON.stringify(profile);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.put(`${this.environment.api_url}/api/timelines/profiles/${profile.id}`, body, options)
      .map(res => {
        const data = res.json();
        this.perfiles = data.profiles;
        this.timeline.profiles = this.perfiles;
        this.updateObservables();
        return data;
      })
      .catch(error => {
        console.log(error);
        return error;
      });
  }

  public isParticipant(userId: number): Observable<boolean> {
    const offerId = this.offer.id;
    const url: string = `${this.environment.api_url}/api/timelines/profiles/user/${userId}/offer/${offerId}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.get(url, options)
      .map(res => {
        return res.json().ok;
      })
      .catch(() => {
        return Observable.of(false);
      });
  }

  /* END PROFILES DE TIMELINE */

  public getRecomendados(): Observable<any[]> {
    return this.recomendadosSubject.asObservable();
  }

  public getPerfilesAdquiridos(): Observable<any[]> {
    return this.adquiridosSubject.asObservable();
  }

  public getPerfiles(): Observable<any[]> {
    return this.perfilesSubject.asObservable();
  }

  public getTimeline() {
    return this.timelineSubject.asObservable();
  }

  public getPhasesOfTimeline() {
    return this.timeline.phases;
  }

  // Habilar el timeline, envío el formGroup.
  public saveTimeline(idCompany: number, timeline: Timeline): Observable<any> {
    const url = `${this.environment.api_url}/api/timelines/company/${idCompany}`;
    const body = JSON.stringify(timeline);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    this.timeline.enabled = true;
    this.updateObservables();
    return this.http.post(url, body, options)
      .map((resp: any) => {
        const data = resp.json().data;
        this.timeline = data;
        this.perfiles = data.profiles;
        this.timelineHabilitado.emit();
        this.updateObservables();
        return this.timeline;
      })
      .catch(error => {
        console.log(error);
        return null;
      });

  }

  public getFirstInstanceData(idProfile: number) {
    const timelineId = this.timeline.id;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    const url = `${this.environment.api_url}/api/timelines/historical/timeline/${timelineId}/profile/${idProfile}`;
    return this.http.get(url, options)
      .map(res => {
        return res.json().data;
      });
  }

  // Add Subphases History
  public addExamns(companyId: number, historyId: number, obj: any): Observable<any> {
    const url = `${this.environment.api_url}/api/timelines/examns/history/${historyId}/createAll`;
    const body = JSON.stringify(obj);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.post(url, body, options)
      .map(res => {
        return res.json();
      });
  }

  public getSubPhaseHistorical(historyId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    const url = `${this.environment.api_url}/api/timelines/examns/history/${historyId}`;
    return this.http.get(url, options)
      .map(res => {
        return res.json().data;
      });
  }

  /* Get History By Id */
  public getHistoryById(historyId: number) {
    const url = `${this.environment.api_url}/api/timelines/historical/${historyId}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.get(url, options)
      .map(res => {
        return res.json();
      });
  }

  /* Add comment */
  public addComent(historicalId: number, comment: IComment) {
    const url = `${this.environment.api_url}/api/timelines/comments/history/${historicalId}`;
    const body = JSON.stringify(comment);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.post(url, body, options)
      .map(res => {
        return res.json().data;
      });
  }

  public updateComment(comment: IComment) {
    const body = JSON.stringify(comment);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.put(`${this.environment.api_url}/api/timelines/comments/${comment.id}`, body, options)
      .map(res => {
        return res.json().data;
      });
  }

  public getHistoricalByOfferIdAndProfileId(companyId: number, offerId: number, profileId: number) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.get(`${this.environment.api_url}/api/timelines/historical/company/${companyId}/offer/${offerId}/profile/${profileId}`, options)
      .map(res => {
        return res.json().data;
      })
      .catch(error => {
        return error;
      });
  }

  public getTestMatchData(companyId: number, offerId: number) {
    const url: string = `${this.environment.api_url}/api/timelines/testmatch/company/${companyId}/offer/${offerId}`;
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.get(url, options)
      .map(res => {
        return res.json();
      })
      .catch(error => {
        return error;
      });
  }

  // Add history
  public addHistory(companyId: number, history: IHistorical): Observable<any> {
    const url: string = `${this.environment.api_url}/api/timelines/historical/company/${companyId}`;
    const body = JSON.stringify(history);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.post(url, body, options)
      .map(res => {
        return res.json();
      })
      .catch(error => {
        return error;
      });
  }

  public updateHistory(companyId: number, historyId: number, history: any): Observable<any> {
    const url: string = `${this.environment.api_url}/api/timelines/historical/${historyId}/company/${companyId}`;
    const json = JSON.stringify(history);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.put(url, json, options)
      .map(res => {
        return res.json();
      })
      .catch(error => {
        return error;
      });
  }

  public updateTestMatchData(historyId: number, data: any) {
    const url: string = `${this.environment.api_url}/api/timelines/testmatch/${historyId}`;
    const json = JSON.stringify(data);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({headers});
    return this.http.put(url, json, options)
      .map(res => {
        return res.json();
      })
      .catch(error => {
        return error;
      });
  }

  private updateObservables() {
    this.offerSubject.next(this.offer);
    this.postulantesSubject.next(this.postulantes);
    this.recomendadosSubject.next(this.recomendados);
    this.adquiridosSubject.next(this.adquiridos);
    this.preseleccionadosSubject.next(this.preseleccionados);
    this.perfilesSubject.next(this.perfiles);
    this.timelineSubject.next(this.timeline);
  }

}
