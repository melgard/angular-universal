import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {ToastrService} from 'ngx-toastr';

import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PostulantInfoModalComponent} from '../../modals/postulant-info-modal/postulant-info-modal.component';
import {PostulantInfoModalService} from '../../modals/postulant-info-modal/postulant-info-modal.service';
import {beat, timelineCard, timelinePhotoCard} from '@app/modules/shared/animations/animations';


import {TimelineService, UserService} from '@app/services/index.services';
import {AppConfig} from '@app/app-config';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss'],
  animations: [
    timelineCard,
    timelinePhotoCard,
    beat
  ]
})

export class ProfileCardComponent implements OnInit {

  modalRef: BsModalRef;

  @Input('postulant') postulant;
  loading = false;
  stars: number;
  public mouseOverCard = 'normal';
  public shakeState = 'in';
  public actionHeart = 'Preseleccionar el perfil';
  public preselectos$: Observable<any[]>;
  public noImage = AppConfig.USER_NO_IMAGE;
  private modalIsOpened: boolean;
  private subscription: Subscription;

  constructor(private modalService: BsModalService,
              private timelineService: TimelineService,
              private cdRef: ChangeDetectorRef,
              private _modalSrv: PostulantInfoModalService,
              private userService: UserService,
              private toastr: ToastrService) {
    this.modalIsOpened = false;

  }

  ngOnInit() {
    this.stars = this.postulant.rating;
    this.preselectos$ = this.timelineService.getPreselectos();
    this.preselectos$.subscribe(() => {
      this.cdRef.markForCheck();
    });
  }

  showInfoModal() {
    this.modalIsOpened = true;
    this.mouseOverCard = 'modal';
    this.shakeState = 'in';
    this.modalRef = this.modalService.show(PostulantInfoModalComponent);
    this.modalRef.content.postulant = this.postulant;
    this.subscription = this._modalSrv.ModalHidded.subscribe(() => {
      this.modalIsOpened = false;
      this.mouseOverCard = 'normal';
      this.cdRef.markForCheck();
    });
  }

  isPreselected(): Boolean {
    const res = this.timelineService.isPreselected(this.postulant);
    if (!res) {
      this.actionHeart = 'Preseleccionar el perfil';
    } else {
      this.actionHeart = 'Despreseleccionar el perfil';
    }
    return res;
  }

  preselect(e) {
    e.stopPropagation();
    this.loading = true;
    const companyId = this.userService.getCompanyId();
    this.timelineService.preselect(companyId, this.postulant)
      .subscribe(() => {
        this.loading = false;
        this.cdRef.markForCheck();
        if (this.isPreselected()) {
          this.notify('Agregado a preseleccionados!');
        } else {
          this.notify('Quitado de preseleccionados!');
        }
      });
  }


  private notify(message: string, type: string = 'success') {
    this.toastr[type](message);
  }

}
