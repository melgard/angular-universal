import {Model} from './model';

export class Perk extends Model {

  public id: number;
  public perkId: number;

  constructor(config?) {
    super(config);
  }
}
