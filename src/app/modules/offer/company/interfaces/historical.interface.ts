import {IComment} from './comment.interface';

export interface IHistorical {

  id?: number;
  date?: any;
  status?: string;
  user_selector?: number;
  offer_id?: number;
  phase_id?: number;
  phase?: any;
  profile_id?: number;
  profile?: any;
  is_testmatch?: boolean;
  comment: IComment;
}
