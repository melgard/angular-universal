import {Serializable} from './serializable.model';

export interface Value {
  description: string,
  showingDescription: string,
  count: number
}

export interface ApplicableFilter {
  property: string,
  valueDescription: string
}

export interface ActiveFilter {
  description: string,
  property: string,
  showingDescription: string,
  isPrimary: boolean
}

export class Filter extends Serializable {
  public showingDescription: string;

  constructor(public description: string,
              public property: string,
              public isPrimary?: boolean,
              public values?: Value[]) {
    super();
    if (isPrimary === undefined) this.isPrimary = false;
    if (isPrimary && values && values) {
      values.forEach(val => {
        switch (val.description) {
          case 'offer':
            val.showingDescription = 'Empleos';
            break;
          case 'user':
            val.showingDescription = 'Usuarios';
            break;
          case 'company':
            val.showingDescription = 'Compañías';
            break;
        }
      });
    }

    switch (this.description) {
      case 'location':
        this.showingDescription = 'Partido';
        break;
      case 'sublocation':
        this.showingDescription = 'Localidad';
        break;
      case 'contractKind':
        this.showingDescription = 'Tipo de Contrato';
        break;
      case 'cluster':
        this.showingDescription = 'Area';
        break;
      case 'career':
        this.showingDescription = 'Experiencias';
        break;
      default:
        this.showingDescription = this.description;
        break;
    }
  }
}
