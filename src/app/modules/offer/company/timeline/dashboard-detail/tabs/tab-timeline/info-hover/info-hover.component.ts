import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-info-hover',
  templateUrl: './info-hover.component.html',
  styleUrls: ['./info-hover.component.scss']
})
export class InfoHoverComponent implements OnInit {

  @Input() preseleccionado: any;

  constructor() {
  }

  ngOnInit() {
  }

}
