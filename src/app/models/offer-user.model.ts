import {Model} from './model';
import {Company} from '@app/models/company.model';

export class OfferUser extends Model {

  public id: number;
  public title: string;
  public body: string;
  public cluster: string;
  public location: { country: string, location: string, sublocation: string };
  public hierarchyLevel: string;
  public contractKind: string;
  public allowComments: boolean;
  public category: string;
  public createdAt: string;
  public company: Company;
  public alreadyApplied: boolean;
  public deleted: boolean;
  public expired: boolean;
  public paused: boolean;

  constructor(config?) {
    super(config);
  }
}
