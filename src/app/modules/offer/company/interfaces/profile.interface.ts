export interface IProfile {
  id?: number;
  user_id: number;
  date?: any;
  current_phase?: number;
  current_status?: string;
  offer_id?: number;
  progress?: number;
  fastView?: any;
  historical?: any[];
}
