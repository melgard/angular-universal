import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {IPhase} from '../../../../interfaces/phase.interface';
import {IComment} from '../../../../interfaces/comment.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelineService} from '../../../../../../../services/index.services';
import {IProfile} from '../../../../interfaces/profile.interface';
import {IHistorical} from '../../../../interfaces/historical.interface';
import {UserService} from '../../../../../../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {IPhaseForm} from '../../../../interfaces/phase-form';
import {ITimeline} from '../../../../interfaces/timeline.interface';

@Component({
  selector: 'app-phase-comun-modal',
  templateUrl: './phase-comun-modal.component.html',
  styleUrls: ['./phase-comun-modal.component.scss']
})
export class PhaseComunModalComponent implements OnInit, IPhaseForm {

  public loading = true;
  public offerId: number;
  public phase: IPhase;
  public nextPhase: IPhase;
  public profile: IProfile;
  public history: IHistorical;
  public comment: IComment;
  public formGroup: FormGroup;
  public action: string = null;
  private controlEnabled = false;
  private phases: IPhase[] = [];

  constructor(private userService: UserService,
              public bsModalRef: BsModalRef,
              private timelineService: TimelineService,
              private toastr: ToastrService) {
  }

  ngOnInit() {
    this.formGroup = new FormGroup({
      'comment': new FormControl({value: '', disabled: this.controlEnabled}, [
        Validators.required, Validators.minLength(5)
      ])
    });
    setTimeout(() => {
      if (this.history) {
        this.getData(this.history.id);
        this.getPhases();
      }
      this.loading = false;
    }, 0);
  }

  async getPhases() {
    this.timelineService.getTimeline()
      .subscribe((data: ITimeline) => {
        this.phases = data.phases;
      });
  }

  getData(historyId: number) {
    this.timelineService.getHistoryById(historyId)
      .subscribe((data) => {
        if (data.comment) {
          this.comment = data.comment;
          const control = this.formGroup.get('comment');
          if (this.action !== 'reactivate') {
            control.setValue(this.showComment(data.comment));
            control.disable();
          }
        }
      });
  }

  showComment(comment: IComment): string {
    let ret = comment.mensaje + '\n';
    if (comment.fecha_reactivacion) {
      const fecha: Date = new Date(comment.fecha_reactivacion);
      ret += '\n\n' + '# Perfil Reactivado el ' + fecha.toLocaleDateString() + '\n';
    }
    if (comment.reactivacion) {
      ret += comment.reactivacion + '\n';
    }
    return ret;
  }

  mergeMensaje(msj: string) {
    let comentario: IComment;
    if (this.action === 'reactivate') {
      comentario = {
        id: this.comment.id,
        reactivacion: msj,
        fecha_reactivacion: new Date()
      };
    } else {
      comentario = {
        id: null,
        mensaje: msj
      };
    }
    return comentario;
  }


  SaveOrUpdate(status: string): void {
    const history: IHistorical = this.history;
    const comentario: IComment = this.mergeMensaje(this.formGroup.get('comment').value);
    if (history) {
      if (!history.comment) {
        history.status = status;
        this.timelineService.addComent(history.id, comentario)
          .subscribe(commentSaved => {
            history.comment = commentSaved.id;
            this.updateHistory(history);
          });
      }
    }
  }

  reactivateProfile(): void {
    const history: IHistorical = this.history;
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

        // Si contiene status, si es avanza, y si tiene siguiente fase
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
          this.profile.current_status = history.status || 'waiting';
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
    // Cantidad de Hisotrias
    // const historias = this.profile.historical.length;
    // this.profile.progress = Math.round ( historias * 100 / this.phases.length);
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
