import {Model} from './model';

export class Cluster extends Model {

  public id;
  public description;

  constructor(config?) {
    super(config);
  }
}
