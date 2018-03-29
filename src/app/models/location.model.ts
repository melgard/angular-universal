import {Model} from './model';

export class Location extends Model {

  country: string;
  location: string;
  sublocation: string;
  latitude: string;
  longitude: string;

  constructor(config?) {
    super(config);
  }
}
