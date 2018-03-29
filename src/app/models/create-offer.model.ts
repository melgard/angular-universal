import {Model} from './model';
import {Location} from './location.model';
import {Career} from './career.model';

export class CreateOffer extends Model {

  id: string;
  title: string;
  body: string;
  location: Location;
  careers: Career[];
  hierarchyLevel: string;
  contractKind: string;
  hiddenData: boolean;
  allowComments: boolean;
  paused: boolean;
  category: string;
  active: boolean;
  companyId: string;
  salary: number;

  constructor(config?) {
    super(config);
  }
}
