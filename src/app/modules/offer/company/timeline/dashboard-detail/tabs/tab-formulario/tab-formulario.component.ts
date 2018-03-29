import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TimelineService} from '../../../../../../../services/index.services';
import {BsModalService} from 'ngx-bootstrap';
import {Subscription} from 'rxjs/Subscription';
import {IPhase} from '../../../../interfaces/phase.interface';
import {NewPhaseModalComponent} from '../../modals/new-phase-modal/new-phase-modal.component';
import {DragulaService} from 'ng2-dragula';
import {NewPhaseModalService} from '../../modals/new-phase-modal/new-phase-modal.service';
import {ITimeline} from '../../../../interfaces/timeline.interface';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-tab-formulario',
  templateUrl: './tab-formulario.component.html',
  styleUrls: ['../tabs.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class TabFormularioComponent implements AfterContentInit, OnDestroy {

  public loading = true;

  // Inputs
  @Input() offerId: number;
  // Outputs
  @Output() onEnabledEvent: EventEmitter<ITimeline> = new EventEmitter<ITimeline>();

  public formGroup: FormGroup;
  public phases: IPhase[] = [];
  public emailPattern = '^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$';
  public selector: FormControl = new FormControl('');
  public testmatchTrue: boolean = true;
  public email: string;
  private subscription: Subscription;

  constructor(private fb: FormBuilder,
              private timelineService: TimelineService,
              private modalService: BsModalService,
              private cdRef: ChangeDetectorRef,
              private dragula: DragulaService,
              private newPhaseModalService: NewPhaseModalService,
              private toastr: ToastrService) {
    this.dragula.setOptions('bag-one', {});
    this.dragula.dropModel.subscribe((value) => {
      this.onDropModel();
    });

    this.formGroup = new FormGroup({
      selector: this.selector,
      phases: new FormArray([])
    });

  }

  ngOnDestroy() {
    this.dragula.destroy('bag-one');
    if (!!this.subscription) this.subscription.unsubscribe();
  }

  ngAfterContentInit() {
    this.getInitialData();
  }

  getInitialData() {
    this.timelineService.getPhases()
      .subscribe((data: any) => {
          this.cdRef.markForCheck();
          this.phases = data.data;
          this.buildForm(data.data);
          this.cambiar();
        }, error => this.notify('Ha ocurrido un error.', 'error'),
        () => {
        });
  }

  public showInfoModal() {
    this.newPhaseModalService.formPhases = this.phases;
    this.modalService.show(NewPhaseModalComponent);
    this.subscription = this.newPhaseModalService.onhidden
      .subscribe(() => {
        this.cdRef.markForCheck();
        const newPhase = this.newPhaseModalService.getPhase();
        if (newPhase.name) {
          this.addFormControl(newPhase);
          this.phases = [...this.phases, newPhase];
          this.newPhaseModalService.reset();
          this.notify('Instancia agregada correctamente!');
        } else {
          this.notify('Cancelado!', 'warning');
        }
        this.subscription.unsubscribe();
      }, error => {
        this.notify('Ha ocurrido un error.', 'error');
      }, () => {
        this.subscription.unsubscribe();
      });
  }

  public habilitarTimeline() {
    this.cdRef.markForCheck();
    const phases = this.formToPhases();
    this.onEnabledEvent.emit({
      enabled: true,
      test_match_manager: this.selector.value,
      phases,
      offer_id: this.offerId
    });
  }

  public cambiar() {
    const formArrayPhases: FormArray = <FormArray> this.formGroup.get('phases');
    const formValues: any[] = formArrayPhases.value;
    const formPhase = formValues.find(p => Object.keys(p)[0] === 'testmatch');
    this.testmatchTrue = formPhase.testmatch;
    if (this.testmatchTrue === true) {
      this.formGroup.controls['selector'].setValidators([Validators.required]);
      this.formGroup.controls['selector'].updateValueAndValidity();
    } else {
      this.formGroup.controls['selector'].reset();
      this.formGroup.controls['selector'].clearValidators();
      this.formGroup.controls['selector'].updateValueAndValidity();
    }

  }

  private onDropModel() {
    let index = 0;
    // Here, this.playlists contains the elements reordered
    this.phases.map(p => {
      p.order = index;
      index++;
      return p;
    });
  }

  private buildForm(phases: IPhase[]) {
    if (phases) {
      phases.map((p: IPhase) => {
        if (p.subPhases.length === 0) {
          this.addFormControl(p);
        } else {
          this.addFormArrayControl(p.name, p.subPhases);
        }
      });
    }
  }

  private addFormControl(phase: IPhase) {
    const controles = <FormArray>this.formGroup.controls['phases'];
    const enable = phase.type === 1 || phase.type === 2;
    const control = new FormControl({value: true, disabled: enable});
    const group = this.fb.group({[phase.name]: control});
    controles.push(group);
  }

  private addFormArrayControl(subPhaseName: string, valores: any[]) {
    const control = <FormArray>this.formGroup.controls['phases'];
    const arrayForm = this.fb.array(valores.map((p: IPhase) => {
      return this.fb.group({[p.name]: this.fb.control(true)});
    }));
    const group = this.fb.group({[subPhaseName]: arrayForm});
    control.push(group);
  }

  private formToPhases(): IPhase[] {
    const formArrayPhases: FormArray = <FormArray> this.formGroup.get('phases');
    const formValues: any[] = formArrayPhases.value;

    const phases: IPhase[] = this.phases.map((phase: IPhase) => {
      // clono el objeto para no tener problemas de referencia;
      const phaseClon = JSON.parse(JSON.stringify(phase));
      const formPhase = formValues.find(p => Object.keys(p)[0] === phaseClon.name);
      // Si el elemento fue encontrado
      if (formPhase) {
        if (phaseClon.name !== 'pruebas') {
          phaseClon.value = formPhase[phaseClon.name];
        } else {
          // si el casi de pruebas debo comprbar las subphases
          const subPhasesValues: any[] = formPhase[phaseClon.name];
          const listaValores = subPhasesValues.map(s => {
            const nameSubphase = Object.keys(s)[0];
            const valorSubphase = s[nameSubphase];
            phaseClon.subPhases.find(sub => sub.name === nameSubphase).value = valorSubphase;
            return valorSubphase;
          });
          phaseClon.value = listaValores.filter(i => i === true).length > 0;
        }
      }
      return phaseClon;
    }).filter(p => p.value === true)
      .map(phase => {
        phase.subPhases = phase.subPhases.filter(ss => ss.value === true);
        return phase;
      });

    let indice = 0;
    return phases.filter(p => p.value === true)
      .map(p => {
        p.order = indice;
        indice++;
        return p;
      });
  }

  private notify(message: string, type: string = 'success') {
    this.toastr[type](message);
  }

}
