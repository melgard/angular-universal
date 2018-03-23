import {Model} from './model';

export class Apply extends Model {
  public id;
  public offerId;
  public userId;
  public createdAt;

  constructor(config?) {
    super(config);
  }
}
