import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Filter, Value} from '@app/models/index.models';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() filter: Filter;
  @Output() clicked = new EventEmitter<any>();

  constructor() {

  }

  ngOnInit() {
  }

  onClick(value: Value) {
    const filter = this.filter;
    this.clicked.emit({filter, value});
  }

  getDescription() {
    return this.filter.showingDescription;
  }

  getValueDescription(value: Value) {
    if (this.filter.isPrimary) {
      return value.showingDescription;
    } else {
      return value.description;
    }
  }

}
