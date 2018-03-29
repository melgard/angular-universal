import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
import {ToastrService} from 'ngx-toastr';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';
import {AutoUnsubscribe} from 'ngx-auto-unsubscribe';
import swal from 'sweetalert';
import {OfferService, TimelineService, UserService} from '@app/services/index.services';
import {Offer} from '@app/models/index.models';
import {ITimeline} from '@app/modules/offer/company/interfaces/timeline.interface';

@Component({
  selector: 'app-dashboard-detail',
  templateUrl: './dashboard-detail.component.html',
  styleUrls: ['./dashboard-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

@AutoUnsubscribe([])
export class DashboardDetailComponent implements OnInit, OnDestroy {

  public loading = true;
  public timeline: ITimeline;
  public timelineEnabled: boolean;
  public timelineVisibiity: boolean = true;
  public subscription: Subscription;
  public tabSelected: boolean;

  public initComponent = true;

  public offer$: Observable<Offer>;
  public postulantes$: Observable<any[]>;
  public preseleccionados$: Observable<any[]>;
  public recomendados$: Observable<any[]>;
  public adquiridos$: Observable<any[]>;
  public timeline$: Observable<any>;

  public error: any;

  private routeDashboard = 'offer/company-dashboard';
  private routeOfferEdit = 'offer/edit/';
  private groupId: string;


  constructor(private userService: UserService,
              private _actRoute: ActivatedRoute,
              private router: Router,
              private toastr: ToastrService,
              private _offerService: OfferService,
              private timelineService: TimelineService,
              private titleService: Title,
              private cdRef: ChangeDetectorRef) {
    this.titleService.setTitle('Birpin - timeline');
  }

  ngOnInit(): void {
    this.getOffer();
  }

  ngOnDestroy() {
    this.titleService.setTitle('Birpin');
    this.timelineService.resetOffer();
  }

  getOffer() {
    this._actRoute.params.subscribe(params => {
      const offerId = params.offerId;
      this.groupId = params.groupId;
      const idCompany = this.userService.getCompanyId();
      console.log('companyId', idCompany);
      this.timelineService.getTimelineByOfferId(idCompany, offerId);
    });

    this.offer$ = this.timelineService.getOffer();
    this.postulantes$ = this.timelineService.getPostulantes();
    this.recomendados$ = this.timelineService.getRecomendados();
    this.adquiridos$ = this.timelineService.getPerfilesAdquiridos();
    this.preseleccionados$ = this.timelineService.getPreselectos();
    this.timeline$ = this.timelineService.getTimeline();

  }

  habilitarTimeline(e) {
    this.timelineVisibiity = false;
    swal({
      title: '¿Está seguro?',
      text: 'Estás por habilitar el timeline para esta oferta.',
      icon: 'info',
      buttons: [
        'Cancelar',
        'Habilitar',
      ],
      dangerMode: true,
    }).then(value => {
      this.cdRef.markForCheck();
      if (value) {
        this.loading = true;
        const idCompany = this.userService.getCompanyId();
        this.subscription = this.timelineService.saveTimeline(idCompany, e)
          .subscribe(data => {
            this.cdRef.markForCheck();
            swal({
              title: 'Felicitaciones!',
              text: 'Ya tienes el timeline configurado para esta oferta!',
              icon: 'success',
              dangerMode: true
            }).then((resp) => {
              this.cdRef.markForCheck();
              this.timeline = data;
              this.loading = false;
              this.timelineVisibiity = true;
              this.timelineEnabled = true;
              this.subscription.unsubscribe();
            });
          }, (error) => {
            this.loading = false;
            this.error = error;
          });
      }
    }, (error) => {
      this.loading = false;
      this.error = error;
    });


  }

  editOffer(offer: Offer) {
    this.router.navigate([this.routeOfferEdit, this.groupId, offer.id]);
  }

  pauseOffer(offer: Offer) {
    this.loading = true;
    this._offerService.pauseOffer(offer, this.groupId).subscribe((resp) => {
      this.notify('La oferta fue pausada satisfactoriamente!');
      this.router.navigate([this.routeDashboard, this.groupId]);
      this.loading = false;
    }, (error) => {
      this.loading = false;
      this.error = error;
    });
  }

  deleteOffer(offer: Offer) {
    this.loading = true;
    this._offerService.deleteOffer(offer, this.groupId)
      .subscribe((resp) => {
        this.notify('La oferta fue eliminada satisfactoriamente!');
        this.router.navigate([this.routeDashboard, this.groupId]);
        this.loading = false;
      }, (error) => {
        this.loading = false;
        this.error = error;
      });
  }

  changeDetect() {
    this.cdRef.detectChanges();
  }

  private notify(message: string, type: string = 'success') {
    this.toastr[type](message);
  }

}
