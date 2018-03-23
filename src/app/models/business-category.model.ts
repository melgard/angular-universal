import {Model} from './model';

export class BusinessCategory extends Model {

  public id;
  public description;

  constructor(config?) {
    super(config);
  }
}
