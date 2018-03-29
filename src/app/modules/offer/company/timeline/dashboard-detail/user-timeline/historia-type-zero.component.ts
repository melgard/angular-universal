import {Component, Input, OnInit} from '@angular/core';
import {IHistorical} from '../../../interfaces/historical.interface';

@Component({
  selector: 'app-historia-type-zero',
  templateUrl: './historia-type-zero.component.html',
  styles: []
})
export class HistoriaTypeZeroComponent implements OnInit {

  @Input() historia: IHistorical;

  constructor() {
  }

  ngOnInit() {
  }

}
