import {Model} from '@app/models/model';

export class FastContactEmailVariable extends Model {

  public id: number;
  public name: string;
  public type: string;

  constructor(config?) {
    super(config);
  }
}
