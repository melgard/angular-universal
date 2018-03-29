import {Component, Input, OnInit} from '@angular/core';
import {fadeInUp} from '../../../../shared/animations/animations';

@Component({
  selector: 'app-stat',
  templateUrl: './stat.component.html',
  styleUrls: ['./stat.component.scss'],
  animations: [fadeInUp]
})
export class StatComponent implements OnInit {
  @Input('stat') stat;

  constructor() {
  }

  ngOnInit() {
  }

  parseInt(n) {
    return parseInt(n, 10);
  }

}
