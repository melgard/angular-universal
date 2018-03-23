import {Model} from './model';
import {Parametric} from '@app/models/parametric.model';

export class Company extends Model {

  public id: number;
  public legalName: string;
  public tradeName: string;
  public registrationNumber: string;
  public businessCategory: Parametric;
  public description: string;
  public logoUrl: string;
  public groupId: number;
  public professionalProfileId: number;
  public website: string;
  public employeesCount: Parametric;

  constructor(config?) {
    super(config);
  }
}
