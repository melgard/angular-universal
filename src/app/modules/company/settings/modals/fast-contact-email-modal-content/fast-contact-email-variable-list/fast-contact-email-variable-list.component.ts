import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FastContactEmailParserService,
  IFastContactVariablesValue
} from '../../../../../shared/services/fast-contact-email-parser/fast-contact-email-parser.service';
import {Observable} from 'rxjs/Observable';
import {OnRemoveEvent} from '../../../../../shared/components/chiplist/interfaces/OnRemoveElement';

@Component({
  selector: 'app-fast-contact-email-variable-list',
  templateUrl: './fast-contact-email-variable-list.component.html',
  styleUrls: ['./fast-contact-email-variable-list.component.scss']
})
export class FastContactEmailVariableListComponent implements OnInit {

  @Output() onRemoveVariable: EventEmitter<string> = new EventEmitter<string>();

  public stringVariables$: Observable<string[]>;
  public variables: IFastContactVariablesValue[];

  constructor(private fastContactEmailParserService: FastContactEmailParserService) {

  }

  ngOnInit() {
    this.stringVariables$ = this.fastContactEmailParserService.getVariables().map(vs => vs.map(v => this.getString(v)));
    this.fastContactEmailParserService.getVariables().subscribe(v => this.variables = v);
  }

  getString(variable: IFastContactVariablesValue) {
    return this.fastContactEmailParserService.toStringVariable(variable);
  }

  onClickDelete(removedElement: OnRemoveEvent) {
    const stringVariable = removedElement.removedElement;
    const variable = this.variables.find(v => this.getString(v) === stringVariable);
    this.fastContactEmailParserService.removeVariable(variable);
    this.onRemoveVariable.emit(stringVariable);
  }
}
