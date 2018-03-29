import {Component, Input, OnInit} from '@angular/core';
import {IPhase} from '../../../company/interfaces/phase.interface';

@Component({
  selector: 'app-card-apply',
  templateUrl: './card-apply.component.html',
  styles: []
})
export class CardApplyComponent implements OnInit {

  @Input() apply: any;

  constructor() {
  }

  ngOnInit() {
  }

  getStatus(phase: IPhase) {
    const historial = this.apply.historical.find(h => h.phase_id === phase.id);
    if (historial) {
      if (historial.status === 'warning') {
        historial.status = 'ok';
      } else if (historial.status === 'out') {
        historial.status = 'waiting';
      }
      return historial.status;
    } else {
      return null;
    }

  }


}

