import {Model} from './model';

export class Skill extends Model {

  public id: number;
  public description: string;
  public name: string;
  public type: string;

  constructor(config?) {
    super(config);
  }
}
