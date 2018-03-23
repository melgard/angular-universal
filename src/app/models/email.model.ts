import {Model} from './model';

export class Email extends Model {

  public id: number;
  public email: string;
  public primary: boolean;

  constructor(config?) {
    super(config);
  }
}
