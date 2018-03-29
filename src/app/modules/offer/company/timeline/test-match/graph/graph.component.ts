import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['../test-match.component.scss']
})
export class GraphComponent implements OnInit {

  public loading = true;
  @Input() chartsData: number[] = [0, 0, 0, 2];
  public chartsLabels: string[] = ['Ok', 'Warning', 'Descartado', 'No definido'];
  public chartsColors: any[] = [{backgroundColor: ['#32CD32', '#FFD700', '#FF0000', '#4d86dc']}];
  public chartsType: string = 'pie';

  constructor() {
  }

  ngOnInit() {
  }

}
