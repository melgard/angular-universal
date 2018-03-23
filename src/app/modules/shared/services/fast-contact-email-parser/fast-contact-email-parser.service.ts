import {Injectable} from '@angular/core';
import {FastContactEmail} from '@app/models/fast-contact-email.model';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FastContactEmailParserService {

  private variablesSubject: BehaviorSubject<IFastContactVariablesValue[]> = new BehaviorSubject([]);
  private variables: IFastContactVariablesValue[] = [];

  private fastContactVariablesTypes = {
    autofill: 'auto-fill',
    normal: 'normal'
  };

  private fastContactVariables: IFastContactVariable[] = [
    {value: 'DATE', description: 'Fecha', type: this.fastContactVariablesTypes.normal},
    {value: 'TIME', description: 'Hora', type: this.fastContactVariablesTypes.normal},
    {value: 'FREE_TEXT', description: 'Texto Libre', type: this.fastContactVariablesTypes.normal},
    {value: 'POSTULANT', description: 'Postulante', type: this.fastContactVariablesTypes.autofill},
    {value: 'SELECTOR', description: 'Selector', type: this.fastContactVariablesTypes.autofill},
    {value: 'ADDRESS', description: 'Dirección', type: this.fastContactVariablesTypes.normal}
  ];

  constructor() {
  }

  getFastContactVariables(): IFastContactVariable[] {
    return this.fastContactVariables;
  }

  getVariables(): Observable<IFastContactVariablesValue[]> {
    return this.variablesSubject.asObservable();
  }

  toStringVariable(variable: IFastContactVariablesValue) {
    return `%%${variable.name}:${variable.value}%%`;
  }

  createVariable(name: string, type: IFastContactVariable) {
    this.variables.push({name, value: type.value});
    this.nextValue(this.variablesSubject, this.variables);
  }

  removeVariable(variable: IFastContactVariablesValue) {
    const index = this.variables.indexOf(variable);
    if (index > -1) {
      this.variables.splice(index, 1);
      this.nextValue(this.variablesSubject, this.variables);
    }

  }

  allVariablesUsed(email: FastContactEmail): boolean {
    if (this.variables.length === 0) return true;

    return !!this.variables.find(v => {
        const stringVariable = this.toStringVariable(v);

        return email.subject && email.subject.includes(stringVariable) ||
          email.content && email.content.includes(stringVariable) ||
          email.signature && email.signature.includes(stringVariable);
      }
    );
  }

  variableExist(variable: IFastContactVariablesValue) {
    return !!this.variables.find(v => v.value === variable.value && v.name === variable.name);
  }

  clearVariables() {
    this.variables = [];
    this.nextValue(this.variablesSubject, this.variables);
  }

  private nextValue(behaviorSubject: BehaviorSubject<any>, value: any) {
    behaviorSubject.next(value);
  }
}

export interface IFastContactVariable {
  value: string,
  description: string,
  type: string
}

export interface IFastContactVariablesValue {
  value: string,
  name: string
}
