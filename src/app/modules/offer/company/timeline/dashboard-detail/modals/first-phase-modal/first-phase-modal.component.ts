import {Component, OnInit} from '@angular/core';
import {IHistorical} from '../../../../interfaces/historical.interface';
import {IComment} from '../../../../interfaces/comment.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelineService} from '../../../../../../../services/index.services';
import {BsModalRef} from 'ngx-bootstrap';
import {IPhase} from '../../../../interfaces/phase.interface';
import {IProfile} from '../../../../interfaces/profile.interface';
import {UserService} from '../../../../../../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {IPhaseForm} from '../../../../interfaces/phase-form';

@Component({
  selector: 'app-first-phase-modal',
  templateUrl: './first-phase-modal.component.html',
  styleUrls: ['./first-phase-modal.component.scss']
})
export class FirstPhaseModalComponent implements OnInit, IPhaseForm {

  public loading = true;
  public offerId: number;
  public phase: IPhase;
  public nextPhase: IPhase;
  public profile: IProfile;
  public history: IHistorical;
  public comment: IComment;
  public formGroup: FormGroup;
  public onlyView = false;
  public action: string = null;

  constructor(private userService: UserService,
              private timelineService: TimelineService,
              private bsModalRef: BsModalRef,
              private toastr: ToastrService) {
    const fechaActual = new Date();
    const hora = `${('00' + fechaActual.getHours()).slice(-2)}:${('00' + fechaActual.getMinutes()).slice(-2)}`;
    const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
    this.formGroup = new FormGroup({
      'date': new FormControl(fecha.toISOString().substring(0, 10)),
      'hora': new FormControl(hora),
      'obs_inicial': new FormControl(''),
      'nivel_socio_cultural': new FormControl(''),
      'formacion': new FormControl(''),
      'historia_laboral': new FormControl(''),
      'logros': new FormControl(''),
      'esquema_compensacion': new FormControl(''),
      'disposicion_cambio': new FormControl(''),
      'conclusion': new FormControl('', [
        Validators.required, Validators.minLength(5)
      ]),
      'reactivacion': new FormControl('')
    });

  }

  setFormValues(comment) {
    let fechaActual = new Date();
    if (comment && comment.fecha) {
      const fechaLocale: Date = new Date(comment.fecha);
      fechaActual = new Date(fechaLocale.getFullYear(), fechaLocale.getMonth() + 1, fechaLocale.getDate(), fechaLocale.getHours(), fechaLocale.getMinutes());
    }
    const obj: any = {
      'date': `${fechaActual.getFullYear()}-${('00' + fechaActual.getMonth()).slice(-2)}-${('00' + fechaActual.getDate()).slice(-2)}`,
      'hora': `${('00' + fechaActual.getHours()).slice(-2)}:${('00' + fechaActual.getMinutes()).slice(-2)}`,
      'obs_inicial': comment.obs_inicial,
      'nivel_socio_cultural': comment.nivel_socio_cultural,
      'formacion': comment.formacion,
      'historia_laboral': comment.historia_laboral,
      'logros': comment.logros,
      'esquema_compensacion': comment.esquema_compensacion,
      'disposicion_cambio': comment.disposicion_cambio,
      'conclusion': comment.conclusion,
      'reactivacion': comment.reactivacion
    };
    this.formGroup.setValue(obj);

  }

  ngOnInit() {
    setTimeout(() => {
      if (this.history) {
        if (this.history.comment) {
          this.getData(this.history.id);
        }
      }

      this.loading = false;
    }, 0);
  }


  getData(historyId: number) {
    this.timelineService.getHistoryById(historyId)
      .subscribe((data) => {
        if (data.comment) {
          this.comment = data.comment;
          this.setFormValues(this.comment);
          if (this.history.status && this.history.status !== 'waiting') {
            const controles = Object.keys(this.formGroup.controls);
            controles.forEach((field) => {

              const control = this.formGroup.get(field);
              if (field === 'reactivacion' && this.action === 'reactivate') {
              } else {
                control.disable();
              }
              this.onlyView = true;
            });
          }
        }
      });
  }


  getFecha(fecha, hora): Date {
    let _anio = new Date().getFullYear();
    let _mes = new Date().getMonth();
    let _dia = new Date().getDate();
    let _hora = new Date().getHours();
    let _minutos = new Date().getMinutes();
    if (!fecha) {
      fecha = new Date().toDateString();
    }
    const arr = fecha.split('-', 3);
    _anio = arr[0];
    _mes = arr[1] - 1;
    _dia = arr[2];
    if (hora) {
      _hora = hora.split(':')[0];
      _minutos = hora.split(':')[1];
    }
    return new Date(_anio, _mes, _dia, _hora, _minutos);
  }


// Nueva version
  SaveOrUpdate(status: string) {
    if (!status) {
      status = 'waiting';
    }
    const history: IHistorical = this.history;
    const obj: any = this.formGroup.value;
    const UTC: Date = new Date(this.getFecha(obj.date, obj.hora));
    const comentario: IComment = {
      fecha: UTC.toISOString(),
      obs_inicial: obj.obs_inicial,
      nivel_socio_cultural: obj.nivel_socio_cultural,
      formacion: obj.formacion,
      historia_laboral: obj.historia_laboral,
      logros: obj.logros,
      esquema_compensacion: obj.esquema_compensacion,
      disposicion_cambio: obj.disposicion_cambio,
      conclusion: obj.conclusion
    };
    if (history) {
      if (!history.comment) {
        // Guardo comment
        history.status = status;
        this.timelineService.addComent(history.id, comentario)
          .subscribe(commentSaved => {
            history.comment = commentSaved.id;
            this.updateHistory(history);
          });
      } else {
        // Edito comment
        comentario.id = history.comment.id;
        history.status = status;
        this.timelineService.updateComment(comentario)
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
    this.comment.reactivacion = this.formGroup.get('reactivacion').value;
    this.timelineService.updateComment(this.comment)
      .subscribe(commentSaved => {
        history.comment = commentSaved.id;
        this.updateHistory(history);
      });
  }

  updateHistory(history: IHistorical) {
    // Actualizar historia
    const companyId = this.userService.getCompanyId();
    this.timelineService.updateHistory(companyId, history.id, history)
      .subscribe(res => {
        this.history = history;
        // Si contiene status, si es avanza, y si tiene siguiente fase
        if ((history.status && (history.status !== 'out' && history.status !== 'waiting')) && this.nextPhase) {
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

  createHistory(history: IHistorical) {
    const companyId = this.userService.getCompanyId();
    this.timelineService.addHistory(companyId, history)
      .subscribe((res) => {
        this.profile.current_status = 'waiting';
        this.profile.current_phase = this.nextPhase.id;
        this.updateProfile(this.profile);
      });
  }

  updateProfile(profile: IProfile) {
    this.timelineService.updateProfile(profile)
      .subscribe((res) => {
        this.notify('Actualizado correctamente.');
        this.profile = profile;
        this.timelineService.modalPrimeraInstancia.emit(this.history);
        this.timelineService.modalPrimeraInstancia.complete();
        this.close();
      });
  }


  close() {
    this.bsModalRef.hide();
  }

  private notify(message: string, type: string = 'success') {
    this.toastr[type](message);
  }

}
