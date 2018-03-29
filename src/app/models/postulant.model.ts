import {Model} from './model';

export class Postulant extends Model {

  public full_name: string;
  public age: number;
  public location: string;
  public highest_grade_study: string;
  public current_work: string;
  public last_work: string;
  public current_profile: string;
  public calification: number;
  public image_url: string;

  constructor(config?) {
    super(config);
  }

}
