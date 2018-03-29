import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {IPhase} from '../../../../interfaces/phase.interface';
import {TimelineService} from '../../../../../../../services/index.services';
import {IHistorical} from '../../../../interfaces/historical.interface';
import {IProfile} from '../../../../interfaces/profile.interface';
import {UserService} from '../../../../../../../services/user.service';
import {IComment} from '../../../../interfaces/comment.interface';
import {BsModalRef} from 'ngx-bootstrap';
import {ToastrService} from 'ngx-toastr';
import {IPrueba} from '../../../../interfaces/pruebas.interface';
import {IPhaseForm} from '../../../../interfaces/phase-form';

@Component({
  selector: 'app-pruebas-modal',
  templateUrl: './pruebas-modal.component.html',
  styles: []
})
export class PruebasModalComponent implements OnInit, IPhaseForm {

  public loading = true;
  public offerId: number;
  public phase: IPhase;
  public nextPhase: IPhase;
  public profile: IProfile;
  public history: IHistorical;
  public comment: IComment;
  public formGroup: FormGroup;
  public pruebas: FormArray;
  private examnsData: IPrueba[];


  constructor(private formBuilder: FormBuilder,
              private timelineService: TimelineService,
              private userService: UserService,
              private bsModalRef: BsModalRef,
              private toastr: ToastrService) {
    this.formGroup = this.formBuilder.group({
      pruebas: this.formBuilder.array([]),
      reactivacion: this.formBuilder.control('')
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.getData();
    }, 0);
  }

  getData() {
    this.timelineService.getSubPhaseHistorical(this.history.id)
      .subscribe(data => {
        this.examnsData = data;
        // Get pruebas del backend
        this.phase.subPhases.forEach((phase: IPhase) => {
          const examn = this.examnsData.find(h => h.phase_id === phase.id);
          let examnsId: number;
          let mensaje: string;
          let semaforo: string;
          if (examn) {
            examnsId = examn.id;
            mensaje = examn.mensaje;
            semaforo = examn.semaforo;
          }
          this.addItem({
            id: examnsId,
            offer_id: this.history.offer_id,
            phase_id: phase.id,
            profile_id: this.profile.id,
            mensaje,
            semaforo,
          });
        });
      });
  }

  createItem(item: any): FormGroup {
    return this.formBuilder.group({
      id: item.id,
      offer_id: item.offer_id,
      phase_id: item.phase_id,
      profile_id: item.profile_id,
      mensaje: [item.mensaje, Validators.required],
      semaforo: [item.semaforo, Validators.required],
    });
  }

  addItem(item?: any): void {
    this.pruebas = this.formGroup.get('pruebas') as FormArray;
    if (!item) {
      item = {
        id: '',
        offer_id: '',
        phase_id: '',
        profile_id: '',
        semaforo: '',
        mensaje: ''
      };
    }
    this.pruebas.push(this.createItem(item));
  }

  onChangeSemaforo(e, prueba) {
    const semaforo: FormControl = prueba.get('semaforo');
    semaforo.setValue(e);
  }

  onSubmit(status?: string) {
    const pruebas: IPrueba[] = this.formGroup.get('pruebas').value;
    const companyId = this.userService.getCompanyId();
    this.timelineService.addExamns(companyId, this.history.id, pruebas)
      .subscribe(data => {
        if (status) {
          this.SaveOrUpdate(status);
        } else {
          this.notify('Datos guardados correctamente.');
          this.timelineService.modalPhasePruebasHide.emit();
          this.close();
        }
      });
  }


  SaveOrUpdate(status: string) {
    const history: IHistorical = this.history;
    const comentario: IComment = {
      mensaje: 'Sin información'
    };
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
