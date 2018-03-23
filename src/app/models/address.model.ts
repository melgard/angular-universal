import {Model} from './model';

export class Address extends Model {

  public id: number;
  public primary: boolean;
  public privateAddress: boolean;
  public fullAddress: string;
  public locality: string;
  public administrativeAreaLevel1: string;
  public administrativeAreaLevel2: string;
  public latitude: number;
  public longitude: number;

  constructor(config?) {
    super(config);
  }
}
