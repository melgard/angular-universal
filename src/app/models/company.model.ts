import {Model} from './model';
import {BusinessCategory} from '@app/models/business-category.model';
import {EmployeesCount} from '@app/models/employees-count.model';

export class Company extends Model {

  public id: number;
  public legalName: string;
  public tradeName: string;
  public registrationNumber: string;
  public businessCategory: BusinessCategory;
  public description: string;
  public logoUrl: string;
  public groupId: number;
  public professionalProfileId: number;
  public website: string;
  public employeesCount: EmployeesCount;

  constructor(config?) {
    super(config);
  }
}
