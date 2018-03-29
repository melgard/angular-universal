import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-graph',
  templateUrl: './info-graph.component.html',
  styleUrls: ['../test-match.component.scss']
})
export class InfoGraphComponent implements OnInit {

  @Input() data: any[] = [];

  constructor() {
  }

  ngOnInit() {
  }

}
