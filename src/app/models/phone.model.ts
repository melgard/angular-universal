import {Model} from './model';

export class Phone extends Model {

  public id: number;
  public phone: string;
  public primary: boolean;

  constructor(config?) {
    super(config);
  }
}
