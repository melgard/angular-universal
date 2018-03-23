import {Model} from './model';

export class BusinessPosition extends Model {

  public id;
  public description;

  constructor(config?) {
    super(config);
  }
}
