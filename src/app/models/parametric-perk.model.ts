import {Model} from '@app/models/model';

export class ParametricPerk extends Model {

  public id: string;
  public description: string;
  public favorite: boolean;

  constructor(config?) {
    super(config);
  }
}
