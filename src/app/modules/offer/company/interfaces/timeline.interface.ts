import {IPhase} from './phase.interface';
import {Offer} from '@app/models/offer.model';

//
export interface ITimeline {
  id?: number;
  offer_id: number;
  offer?: Offer;
  enabled?: boolean;
  test_match_manager?: string;
  phases?: IPhase[];
  profiles?: any[];
}
