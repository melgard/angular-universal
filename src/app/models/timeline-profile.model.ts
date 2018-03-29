import {Postulant} from './postulant.model';
import {Offer} from './offer.model';
import {Model} from './model';

export class TimelineProfile extends Model {

  constructor(public fastView: Postulant,
              public offer: Offer,
              config?) {
    super(config);
  }
}
