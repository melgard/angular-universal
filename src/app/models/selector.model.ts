import {Model} from './model';

export class Selector extends Model {

  public id: number;
  public alreadyConfirmed: boolean;
  public fullName: string;

  constructor(config?) {
    super(config);
  }
}
