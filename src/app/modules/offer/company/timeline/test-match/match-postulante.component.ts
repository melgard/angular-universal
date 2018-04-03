import {AfterContentInit, Component, EventEmitter, Input, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelineService} from '@app/services/index.services';
import {IComment} from '../../interfaces/comment.interface';
import {IPhase} from '../../interfaces/phase.interface';
import {AppConfig} from '@app/app-config';
import swal from 'sweetalert';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-match-postulante',
  templateUrl: './match-postulante.component.html',
  styleUrls: ['./test-match.component.scss']
})
export class MatchPostulanteComponent implements AfterContentInit {

  @Output() refrescar: EventEmitter<void> = new EventEmitter<void>();

  @Input() fastView: any;
  @Input() history: any;
  @Input() offer: any;
  @Input() comment: IComment;

  public noImage = AppConfig.USER_NO_IMAGE;
  public formGroup: FormGroup;
  public isCollapsed: boolean;
  private phase: IPhase;

  constructor(private formBuilder: FormBuilder,
              private timelineService: TimelineService,
              private toastr: ToastrService) {
    this.formGroup = new FormGroup({
      'mensaje': new FormControl('', [Validators.required]),
      'semaforo': new FormControl('', [Validators.required])
    });
  }

  ngAfterContentInit() {
    setTimeout(() => {
      if (this.comment && this.history.status !== 'waiting') {
        this.isCollapsed = true;
        const controles = Object.keys(this.formGroup.controls);
        controles.forEach((field) => {
          const control = this.formGroup.get(field);
          control.disable();
        });
        this.formGroup.get('mensaje').setValue(this.comment.mensaje);
        this.formGroup.get('semaforo').setValue(this.history.status);
      }
      this.phase = this.history.phase;
    }, 0);
  }

  changeSemaforo(event) {
    this.formGroup.get('semaforo').setValue(event);
    const mensaje = this.formGroup.get('mensaje').value;
    const semaforo = this.formGroup.get('semaforo').value;
    if (this.formGroup.valid) {
      this.guardarCambios(mensaje, semaforo);
    }
  }

  guardarCambios(mensaje: string, semaforo: string) {
    const data: any = {
      timeline_id: this.phase.timeline_id,
      offer_id: this.offer.id,
      order: this.phase.order,
      history: this.history,
      user_id: this.fastView.user_id || -1,
      mensaje,
      semaforo
    };

    swal({
      title: '¿Está seguro?',
      text: 'Si acepta se enviará el feedback sobre el postulante.',
      icon: 'info',
      buttons: [],
      dangerMode: true,
    })
      .then((value) => {
        if (value) {
          this.sendData(this.history.id, data);
        }
      });
  }

  sendData(historyId: number, data: any) {
    this.timelineService.updateTestMatchData(historyId, data)
      .subscribe(resp => {
        if (resp.body.history.comment) {
          this.comment = resp.body.history.comment;
        }
        swal('Muy bien!', 'El feedback ha sido enviado correctamente!', 'success')
          .then(() => {
            this.refrescar.emit();
          });
      });
  }

  traficLightAlert($event) {
    console.log($event);
    this.toastr.warning($event, 'Atención');
  }

}


