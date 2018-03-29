import {Component, Input, OnInit} from '@angular/core';
import {IHistorical} from '../../../interfaces/historical.interface';
import {TimelineService} from '../../../../../../services/index.services';
import {IPrueba} from '../../../interfaces/pruebas.interface';

@Component({
  selector: 'app-historia-examns',
  templateUrl: './historia-examns.component.html',
  styleUrls: ['./user-timeline.component.scss']
})
export class HistoriaTypePruebasComponent implements OnInit {

  @Input() historia: IHistorical;
  public examnsData: IPrueba[] = [];

  constructor(private timelineService: TimelineService) {
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.timelineService.getSubPhaseHistorical(this.historia.id)
      .subscribe(data => {
        this.examnsData = data;
      });
  }


}
