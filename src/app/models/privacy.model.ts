import {Model} from './model';

export class Privacy extends Model {

  public id: number;
  public description: string;

  constructor(config?) {
    super(config);
  }
}
