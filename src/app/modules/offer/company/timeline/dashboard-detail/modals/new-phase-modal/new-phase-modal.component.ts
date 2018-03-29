import {AfterContentInit, ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {TimelineService} from '../../../../../../../services/index.services';
import {FormBuilder, FormGroup} from '@angular/forms';
import {IPhase} from '../../../../interfaces/phase.interface';
import {NewPhaseModalService} from './new-phase-modal.service';

@Component({
  selector: 'app-new-phase-modal',
  templateUrl: './new-phase-modal.component.html',
  styleUrls: ['./new-phase-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NewPhaseModalComponent implements AfterContentInit, OnDestroy {

  public loading = false;
  public formGroup: FormGroup;
  public phases: IPhase[];
  public phase: IPhase;
  public exist = false;

  constructor(public bsModalRef: BsModalRef,
              private timelineService: TimelineService,
              private fb: FormBuilder,
              private newPhaseModalService: NewPhaseModalService) {
  }

  ngAfterContentInit() {
    this.phase = this.newPhaseModalService.getPhase();
  }

  ngOnDestroy() {
    this.newPhaseModalService.onhidden.emit();
  }

  close() {
    this.bsModalRef.hide();
  }

  save() {
    this.phase.name = this.phase.label.replace(/[^a-zA-Z 0-9.]+/g, '').trim().toLowerCase();
    if (!this.newPhaseModalService.exist(this.phase)) {
      this.newPhaseModalService.setPhase(this.phase);
      this.loading = false;
      this.close();
    } else {
      this.exist = true;
      this.loading = false;
    }
  }


  public escribiendo(event) {
    this.exist = false;
  }


}
