import {EventEmitter, Injectable, Output} from '@angular/core';
import {IPhase} from '@app/interfaces/phase.interface';
import {PhaseTypeEnum} from '@app/models/enums/phase-type.enum';

@Injectable()
export class NewPhaseModalService {

  @Output() onhidden: EventEmitter<void> = new EventEmitter<void>();
  @Output() onPush: EventEmitter<IPhase> = new EventEmitter<IPhase>();
  @Output() onClosed: EventEmitter<void> = new EventEmitter<void>();

  public formPhases: IPhase[] = [];
  private phase: IPhase;

  constructor() {
    this.phase = {
      name: '',
      label: '',
      subPhases: [],
      parent_id: null,
      timeline_id: null,
      value: true,
      order: null,
      type: PhaseTypeEnum.comun,
      parent: null,
      timeline: null,
    };
  }

  public getPhase() {
    return this.phase;
  }

  public reset() {
    this.phase = {
      name: '',
      label: '',
      subPhases: [],
      parent_id: null,
      timeline_id: null,
      value: true,
      order: null,
      type: PhaseTypeEnum.comun,
      parent: null,
      timeline: null,
    };
    this.onClosed.complete();
  }

  public setPhase(phase: IPhase) {
    this.phase = phase;
  }

  public exist(phase: IPhase): boolean {
    return this.formPhases.filter(p => p.name === phase.name).length > 0;
  }


}
