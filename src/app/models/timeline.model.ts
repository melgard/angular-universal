import {Model} from './model';
import {IPhase} from '../modules/offer/company/interfaces/phase.interface';
import {Preselected} from './preselected.model';

export class Timeline extends Model {

  public id;
  public offer_id: number;
  public enabled: boolean;
  public phases: IPhase[];
  public preselected: Preselected[];
  public test_match_manager: string;

  constructor(config?) {
    super(config);
  }

}
