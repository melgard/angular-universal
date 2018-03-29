import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-language-skill',
  templateUrl: './language-skill.component.html'
})
export class LanguageSkillComponent implements OnInit {

  @Output() onChange: EventEmitter<{}> = new EventEmitter<{}>();

  @Input() dataSource: any[] = [];
  @Input() title: string;
  @Input() placeholder: string;
  public text = '';
  public values: string[] = [];
  public result: {} = {};
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
    this.values.push(value);
    this.result[value] = 0;
  }

  remove(index) {
    this.values.splice(index, 1);
  }

  emitValueChange() {
    this.onChange.emit(this.result);
  }
}
