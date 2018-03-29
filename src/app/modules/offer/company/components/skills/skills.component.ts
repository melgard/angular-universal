import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {OnRemoveEvent} from '../../../../shared/components/chiplist/interfaces/OnRemoveElement';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
})
export class SkillsComponent implements OnInit {

  @Output() onChange: EventEmitter<string[]> = new EventEmitter<string[]>();
  @Input() values: string[] = [];
  @Input() dataSource: any[] = [];
  @Input() title: string;
  @Input() placeholder: string;
  public text = '';
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term === '' ? []
        : this.dataSource.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  constructor() {
  }

  ngOnInit() {
  }

  addChip(value) {
    if (this.values.includes(value)) {
      return;
    }
    this.values.push(value);

    this.onChange.emit(this.values);
    console.log(this.text);
    this.text = '';
  }

  onRemove(removedElement: OnRemoveEvent) {
    this.onChange.emit(removedElement.values);
  }

  isButtonDisabled() {

    return this.text === '' || this.text === null || !this.dataSource.includes(this.text) || this.values.includes(this.text);
  }
}
