import {Component, OnInit} from '@angular/core';
import {IPhase} from '../../../../interfaces/phase.interface';
import {IComment} from '../../../../interfaces/comment.interface';
import {IHistorical} from '../../../../interfaces/historical.interface';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IProfile} from '../../../../interfaces/profile.interface';
import {BsModalRef} from 'ngx-bootstrap';
import {TimelineService} from '../../../../../../../services/index.services';
import {UserService} from '../../../../../../../services/user.service';
import {ToastrService} from 'ngx-toastr';
import {IPhaseForm} from '../../../../interfaces/phase-form';

@Component({
  selector: 'app-second-phase-modal',
  templateUrl: './second-phase-modal.component.html',
  styleUrls: ['./second-phase-modal.component.scss']
})
export class SecondPhaseModalComponent implements OnInit, IPhaseForm {


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
  public primarEntrevista: IComment;

  constructor(private userService: UserService,
              private timelineService: TimelineService,
              private bsModalRef: BsModalRef,
              private toastr: ToastrService) {
    const fechaActual = new Date();
    const horaActual = `${fechaActual.getHours()}:${fechaActual.getMinutes()}`;
    this.formGroup = new FormGroup({
      'id': new FormControl(''),
      'fecha': new FormControl(fechaActual.toISOString().substring(0, 10)),
      'hora': new FormControl(horaActual),
      'obs_inicial': new FormControl({value: '', disabled: true}),
      'nivel_socio_cultural': new FormControl({value: '', disabled: true}),
      'formacion': new FormControl({value: '', disabled: true}),
      'historia_laboral': new FormControl({value: '', disabled: true}),
      'logros': new FormControl({value: '', disabled: true}),
      'esquema_compensacion': new FormControl({value: '', disabled: true}),
      'disposicion_cambio': new FormControl({value: '', disabled: true}),
      'conclusion': new FormControl({value: '', disabled: true}),
      'reactivacion_uno': new FormControl({value: '', disabled: true}),
      'consolidado': new FormControl('',
        [
          Validators.required, Validators.minLength(5)
        ]),
      'reactivacion_dos': new FormControl({value: ''}),
    });
  }

  ngOnInit() {
    setTimeout(() => {
      let id = null;
      let fechaActual = new Date();
      let consolidado = null;
      let reactivacion = null;

      // Get resultados primera entrevista
      this.timelineService.getFirstInstanceData(this.profile.id)
        .subscribe((primerInstancia: IHistorical) => {
          this.primarEntrevista = primerInstancia.comment;
          const hora = `${('00' + fechaActual.getHours()).slice(-2)}:${('00' + fechaActual.getMinutes()).slice(-2)}`;
          const fecha = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate());
          if (this.history) {
            if (this.history.comment) {
              this.comment = this.history.comment;
              id = this.comment.id;
              fechaActual = new Date(this.comment.fecha);
              consolidado = this.comment.consolidado;
              reactivacion = this.comment.reactivacion;
            }
          }

          const obj: any = {
            'id': id,
            'fecha': fecha.toISOString().substring(0, 10),
            'hora': hora,
            'obs_inicial': this.primarEntrevista.obs_inicial,
            'nivel_socio_cultural': this.primarEntrevista.nivel_socio_cultural,
            'formacion': this.primarEntrevista.formacion,
            'historia_laboral': this.primarEntrevista.historia_laboral,
            'logros': this.primarEntrevista.logros,
            'esquema_compensacion': this.primarEntrevista.esquema_compensacion,
            'disposicion_cambio': this.primarEntrevista.disposicion_cambio,
            'conclusion': this.primarEntrevista.conclusion,
            'reactivacion_uno': this.primarEntrevista.reactivacion,
            'consolidado': consolidado,
            'reactivacion_dos': reactivacion,
          };

          this.formGroup.setValue(obj);
          if (this.history && this.history.status && this.history.status !== 'waiting') {
            const controles = Object.keys(this.formGroup.controls);
            controles.forEach((field) => {
              const control = this.formGroup.get(field);
              if (field === 'reactivacion_dos' && this.action === 'reactivate') {
              } else {
                control.disable();
              }
              this.onlyView = true;
            });
          }

          this.loading = false;

        });

    }, 0);
  }


  SaveOrUpdate(status: string): void {
    const obj: any = this.formGroup.value;
    const fecha: Date = this.getFecha(obj.date, obj.hora);
    let comentario: IComment = this.comment;
    comentario = {
      fecha,
      consolidado: obj.consolidado
    };

    const history: IHistorical = this.history;

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
    this.comment.reactivacion = this.formGroup.get('reactivacion_dos').value;
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

  createHistory(history: IHistorical) {
    const companyId = this.userService.getCompanyId();
    this.timelineService.addHistory(companyId, history)
      .subscribe((res) => {
        // ('Historia creada');
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


  getFecha(fecha, hora): Date {
    let year: number = new Date().getFullYear();
    let month: number = new Date().getMonth();
    let day: number = new Date().getDate();
    let hour: number = new Date().getHours();
    let minutes: number = new Date().getMinutes();

    if (fecha) {
      year = fecha.substring(0, 4);
      month = fecha.substring(5, 7) - 1;
      day = fecha.substring(8, 10);
    }
    if (hora) {
      hour = hora.split(':')[0];
      minutes = hora.split(':')[1];
    }
    return new Date(year, month, day, hour, minutes);

  }

  close() {
    this.bsModalRef.hide();
  }

  private notify(message: string, type: string = 'success') {
    this.toastr[type](message);
  }

}
