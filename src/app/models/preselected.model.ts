import {Postulant} from './postulant.model';

export class Preselected extends Postulant {
  public id?: number;
  public timeline_id: number;
  public user_id: number;

  constructor(config?) {
    super(config);
  }

}
