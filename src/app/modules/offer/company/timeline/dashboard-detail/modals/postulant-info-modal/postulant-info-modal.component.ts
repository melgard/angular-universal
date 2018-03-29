import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PostulantInfoModalService} from './postulant-info-modal.service';
import {DesbloquearPerfilComponent} from '../desbloquear-perfil/desbloquear-perfil.component';
import {IProfile} from '../../../../interfaces/profile.interface';
import {UserService} from '../../../../../../../services/user.service';
import {TimelineService} from '../../../../../../../services/index.services';
import {AppConfig} from '../../../../../../../app-config';

@Component({
  selector: 'app-postulant-info-modal',
  templateUrl: './postulant-info-modal.component.html',
  styleUrls: ['./postulant-info-modal.component.scss'],
})
export class PostulantInfoModalComponent implements OnInit, OnDestroy, AfterContentInit {

  modalRef: BsModalRef;
  postulant;
  loading = true;
  public exist: boolean = true;
  public noImage = AppConfig.USER_NO_IMAGE;

  constructor(private userService: UserService,
              public bsModalRef: BsModalRef,
              private modalService: BsModalService,
              private _modalSrv: PostulantInfoModalService,
              private timelineService: TimelineService) {
  }

  ngOnInit() {

  }

  ngAfterContentInit() {
    setTimeout(() => {
      this.timelineService.isParticipant(this.postulant.user_id)
        .subscribe(data => {
          this.exist = data;
          this.loading = false;
        });
    }, 0);
    /**/
  }


  ngOnDestroy() {
    this._modalSrv.ModalHidded.emit();
  }

  close() {
    this.bsModalRef.hide();
  }

  showDesbloquearPerfilModal() {
    this.modalRef = this.modalService.show(DesbloquearPerfilComponent);
    this.modalRef.content.postulant = this.postulant;
  }

  addProfile(profile: IProfile, e) {
    e.stopPropagation();
    e.preventDefault();
    const idCompany = this.userService.getCompanyId();
    this.timelineService.addProfile(idCompany, profile)
      .subscribe(data => {
        this.exist = true;
        this.close();
      });
  }


}
