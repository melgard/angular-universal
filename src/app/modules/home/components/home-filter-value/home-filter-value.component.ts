import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilterValue} from '../../model/filter-value.model';

@Component({
  selector: 'app-home-filter-value',
  templateUrl: './home-filter-value.component.html',
  styles: []
})
export class HomeFilterValueComponent {

  @Input() filterValue: FilterValue;
  @Output() onClickFilter = new EventEmitter<FilterValue>();

  emitClickFilter() {
    this.onClickFilter.emit(this.filterValue);
  }
}
