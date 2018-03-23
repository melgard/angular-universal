import {Model} from './model';

export class SelectorToAdd extends Model {

  public id: number;
  public professionalProfileEmail: string;
  public professionalProfileFullName: string;

  constructor(config?) {
    super(config);
  }
}
