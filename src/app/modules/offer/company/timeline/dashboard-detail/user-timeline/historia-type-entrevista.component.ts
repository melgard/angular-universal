import {Component, Input, OnInit} from '@angular/core';
import {IHistorical} from '../../../interfaces/historical.interface';

@Component({
  selector: 'app-historia-type-entrevista',
  templateUrl: './historia-type-entrevista.component.html',
  styles: []
})
export class HistoriaTypeEntrevistaComponent implements OnInit {

  @Input() historia: IHistorical;

  constructor() {
  }

  ngOnInit() {
  }

}
