import {IPhase} from './phase.interface';
import {IProfile} from './profile.interface';
import {IComment} from './comment.interface';
import {IHistorical} from './historical.interface';

export class IUpdatePhaseProfile {
  offer_id: number;
  profile: IProfile;
  current_phase: IPhase;
  next_Phase?: IPhase;
  history: IHistorical;
  comment: IComment;
}
