import {Model} from './model';

export class Parametric extends Model {

  public id: number;
  public description: string;
  public type: string;

  constructor(config?) {
    super(config);
  }
}
