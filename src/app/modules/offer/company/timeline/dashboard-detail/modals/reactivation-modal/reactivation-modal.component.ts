import {Component, OnInit} from '@angular/core';
import {IPhaseForm} from '../../../../interfaces/phase-form';
import {IHistorical} from '../../../../interfaces/historical.interface';
import {IProfile} from '../../../../interfaces/profile.interface';
import {IComment} from '../../../../interfaces/comment.interface';
import {TimelineService} from '../../../../../../../services/index.services';
import {IPhase} from '../../../../interfaces/phase.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../../../../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {BsModalRef} from 'ngx-bootstrap';

@Component({
  selector: 'app-reactivation-modal',
  templateUrl: './reactivation-modal.component.html',
  styles: []
})
export class ReactivationModalComponent implements OnInit, IPhaseForm {


  public profile: IProfile;
  public history: IHistorical;
  public comment: IComment;
  public phase: IPhase;
  public nextPhase: IPhase;
  public formGroup: FormGroup;

  constructor(private userService: UserService,
              public bsModalRef: BsModalRef,
              private timelineService: TimelineService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'comment': new FormControl('', [
        Validators.required, Validators.minLength(5)
      ])
    });
  }


  reactivateProfile(): void {
    const history: IHistorical = this.history;
    this.comment = history.comment;
    history.status = 'reactivated';
    this.comment.fecha_reactivacion = new Date();
    this.comment.reactivacion = this.formGroup.get('comment').value;
    this.timelineService.updateComment(this.comment)
      .subscribe(commentSaved => {
        history.comment = commentSaved.id;
        this.updateHistory(history);
      });
  }

  updateHistory(history: IHistorical): void {
    // Actualizar historia
    const companyId = this.userService.getCompanyId();
    this.timelineService.updateHistory(companyId, history.id, history)
      .subscribe(res => {
        this.history = history;
        if ((history.status && history.status !== 'out') && this.nextPhase) {
          // Siguiente fase
          const newHistory: IHistorical = {
            date: new Date(),
            user_selector: 1,
            offer_id: history.offer_id,
            phase_id: this.nextPhase.id,
            phase: this.nextPhase,
            profile_id: this.profile.id,
            profile: this.profile,
            status: 'waiting',
            is_testmatch: this.nextPhase.name === 'testmatch',
            comment: null
          };
          // Crear la siguiente fase
          this.createHistory(newHistory);
        } else {
          this.profile.current_status = history.status || 'reactivated';
          this.updateProfile(this.profile);
        }
      });
  }

  createHistory(history: IHistorical): void {
    const companyId = this.userService.getCompanyId();
    this.timelineService.addHistory(companyId, history)
      .subscribe((res) => {
        this.profile.current_status = 'waiting';
        this.profile.current_phase = this.nextPhase.id;
        this.updateProfile(this.profile);
      });
  }

  updateProfile(profile: IProfile): void {
    this.timelineService.updateProfile(profile)
      .subscribe((res) => {
        this.notify('Actualizado correctamente.');
        this.profile = profile;
        this.timelineService.modalPhaseComunHide.emit();
        this.close();
      });
  }


  close(): void {
    this.bsModalRef.hide();
  }

  private notify(message: string, type: string = 'success') {
    this.toastr[type](message);
  }

}
