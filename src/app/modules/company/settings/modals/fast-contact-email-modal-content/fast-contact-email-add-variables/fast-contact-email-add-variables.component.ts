import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  FastContactEmailParserService,
  IFastContactVariable
} from '../../../../../shared/services/fast-contact-email-parser/fast-contact-email-parser.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-fast-contact-email-add-variables',
  templateUrl: './fast-contact-email-add-variables.component.html',
  styleUrls: ['./fast-contact-email-add-variables.component.scss']
})
export class FastContactEmailAddVariablesComponent implements OnInit {

  @Output() onRemoveVariable: EventEmitter<string> = new EventEmitter<string>();

  public variables: IFastContactVariable[];
  public variableForm: FormGroup;

  constructor(private fb: FormBuilder,
              private fastContactEmailParserService: FastContactEmailParserService) {

  }

  ngOnInit() {
    this.variables = this.fastContactEmailParserService.getFastContactVariables();

    this.variableForm = this.fb.group({
      'variableName': ['', [Validators.required]],
      'variableValue': [this.variables[0].value, [Validators.required]]
    });
  }

  onSubmit() {
    const selectedVariable = this.variables.find(sv => sv.value === this.variableForm.value.variableValue);
    this.fastContactEmailParserService.createVariable(this.variableForm.value.variableName, selectedVariable);

    this.variableForm.reset();
    this.variableForm.get('variableValue').setValue(this.variables[0].value);
  }

  validForm() {
    const currentVariable = {value: this.variableForm.value.variableValue, name: this.variableForm.value.variableName};
    return this.variableForm.valid && !this.fastContactEmailParserService.variableExist(currentVariable);
  }

  emitRemoveVariable(value: string) {
    this.onRemoveVariable.emit(value);
  }
}
