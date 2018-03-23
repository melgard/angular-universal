import {Model} from './model';

export class Career extends Model {

  public id;
  public description;
  public clusterId;

  constructor(config?) {
    super(config);
  }
}
