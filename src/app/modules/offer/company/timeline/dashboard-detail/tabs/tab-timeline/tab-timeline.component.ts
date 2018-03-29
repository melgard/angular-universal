import {Component, ElementRef, EventEmitter, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TimelineService} from '../../../../../../../services/index.services';
import {IPhase} from '../../../../interfaces/phase.interface';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {PhaseComunModalComponent} from '../../modals/phase-comun-modal/phase-comun-modal.component';
import {IProfile} from '../../../../interfaces/profile.interface';
import {IHistorical} from '../../../../interfaces/historical.interface';
import {FirstPhaseModalComponent} from '../../modals/first-phase-modal/first-phase-modal.component';
import {SecondPhaseModalComponent} from '../../modals/second-phase-modal/second-phase-modal.component';
import {PruebasModalComponent} from '../../modals/pruebas-modal/pruebas-modal.component';
import {AppConfig} from '../../../../../../../app-config';
import {Subscription} from 'rxjs/Subscription';
import {IPrueba} from '../../../../interfaces/pruebas.interface';
import {ReactivationModalComponent} from '../../modals/reactivation-modal/reactivation-modal.component';

@Component({
  selector: 'app-tab-timeline',
  templateUrl: './tab-timeline.component.html',
  styleUrls: ['./tab-timeline.component.scss']
})
export class TabTimelineComponent implements OnInit {

  @Output() detectarCambios: EventEmitter<void> = new EventEmitter<void>();

  public offerId: number;
  public phases: IPhase[] = [];
  public profiles: IProfile[] = [];

  public profiles$: Observable<IProfile[]>;
  public timeline$: Observable<any>;

  public noImage = AppConfig.USER_NO_IMAGE;
  public modalRef: BsModalRef;

  constructor(private el: ElementRef,
              private timelineService: TimelineService,
              private modalService: BsModalService) {
  }

  ngOnInit() {
    this.timeline$ = this.timelineService.getTimeline();
    this.profiles$ = this.timelineService.getPerfiles();
  }

  public getLabelPhaseFromHistorical(phaseId: number): string {
    const result = this.timelineService.getPhasesOfTimeline().filter(p => p.id === phaseId);
    if (result.length > 0) {
      return result[0].label;
    } else {
      return null;
    }
  }

  public getDateValid(history: IHistorical) {
    if (history.comment) {
      return history.comment.fecha;
    } else {
      return history.date;
    }
  }

  showReactivateModal(phase: IPhase, profile: IProfile, history: IHistorical) {
    const phases: IPhase[] = this.timelineService.getPhasesOfTimeline();
    const indexPhase = phases.indexOf(phase);
    const nextPhase = phases[indexPhase + 1];
    let componenteModal: any;
    let subs: Subscription;
    componenteModal = this.modalService.show(ReactivationModalComponent);
    subs = this.timelineService.modalPhaseComunHide.subscribe(() => {
      this.detectarCambios.emit();
      subs.unsubscribe();
    });
    this.modalRef = componenteModal;

    this.setModalRef(this.offerId, history, phase, profile, nextPhase);
  }

  showPhaseModal(phase: IPhase, profile: IProfile, history: IHistorical, action?: string) {
    const phases: IPhase[] = this.timelineService.getPhasesOfTimeline();
    const indexPhase = phases.indexOf(phase);
    const nextPhase = phases[indexPhase + 1];
    let componenteModal: any;
    let subs: Subscription;
    switch (phase.type.toString()) {
      case '0':
        // Comun
        componenteModal = this.modalService.show(PhaseComunModalComponent);
        subs = this.timelineService.modalPhaseComunHide.subscribe(() => {
          this.detectarCambios.emit();
          subs.unsubscribe();
        });
        break;
      case '1':
        // Primera entrevista
        componenteModal = this.modalService.show(FirstPhaseModalComponent);
        this.timelineService.modalPrimeraInstancia.subscribe((res) => history = res);
        break;
      case '2':
        // Segunda entrevista
        componenteModal = this.modalService.show(SecondPhaseModalComponent);
        break;
      case '3':
        // Pruebas
        componenteModal = this.modalService.show(PruebasModalComponent);
        subs = this.timelineService.modalPhasePruebasHide.subscribe(() => {
          this.detectarCambios.emit();
          subs.unsubscribe();
        });
        break;
    }
    this.modalRef = componenteModal;
    this.setModalRef(this.offerId, history, phase, profile, nextPhase, action);

  }

  setModalRef(offerId: number, history: IHistorical, phase: IPhase, profile: IProfile, nextPhase: IPhase, action?: string) {
    this.modalRef.content.offerId = offerId;
    this.modalRef.content.history = history;
    this.modalRef.content.phase = phase;
    this.modalRef.content.profile = profile;
    this.modalRef.content.nextPhase = nextPhase;
    this.modalRef.content.action = action;
  }

  getSemaforo(pruebas: IPrueba[], phase: IPhase): string {
    if (!pruebas) {
      return null;
    } else {
      const prueba = pruebas.find(p => p.phase_id === phase.id);
      if (!prueba) {
        return null;
      }
      return prueba.semaforo;
    }
  }

  public getPin(historyStatus: string, showIn: string, isTestmatch?: boolean): string {
    if (historyStatus === 'ok' && showIn === 'link') {
      return 'pin ion-checkmark-circled ok';
    } else if (historyStatus === 'warning' && showIn === 'link') {
      return 'pin ion-checkmark-circled warning';
    } else if (historyStatus === 'reactivated' && showIn === 'link') {
      return 'pin fa fa-times-circle warning';
    } else if (historyStatus === 'out' && showIn === 'no-link') {
      return 'pin fa fa-times-circle out absolute';
    } else if (historyStatus === 'waiting' && showIn === 'no-link' && isTestmatch === true) {
      return 'pin fa fa-times-circle action absolute fa-spinner fa-pulse fa-fw';
    } else {
      return undefined;
    }
  }

  public showBotones(phase: IPhase, indexPhase: number, phasesLength: number, profile: IProfile) {
    const isNotTestMatch = (phase.name !== 'testmatch');
    const isNotWaiting = profile.current_status !== 'waiting';
    const boo = (isNotTestMatch || (phase.name !== 'testmatch' && !isNotWaiting) && indexPhase < phasesLength - 1);
    return boo;
  }

}
