import {Model} from '@app/models/model';

export class FilterValue extends Model {

  public description;
  public count;

  constructor(config?) {
    super(config);
  }
}
