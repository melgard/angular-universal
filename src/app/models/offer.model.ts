import {Model} from './model';

export class Offer extends Model {

  public groupId;
  public contractKind;
  public deletedAt;
  public careers: [{ id: number, careerId: string, clusterId: string }];
  public date;
  public hiddenData;
  public title: string;
  public body: string;
  public hierarchyLevel: string;
  public location: string;
  public sublocation: string;
  public country: string;
  public category: string;
  public applies: any[];
  public preselectedUsers: any[];
  public recomendedUsers: any[];
  public allowComments: boolean;
  public active: boolean;
  public paused: boolean;
  public expireAt: any;
  public id: number;
  public salary: number;

  constructor(config?) {
    super(config);
  }

  isFinalized() {
    return this.getStatus() !== 'Finalizada';
  }

  isDeleted() {
    return this.deletedAt !== null;
  }

  getStatus() {

    if (this.paused) {
      return 'Pausada';
    }

    if (new Date(this.expireAt) < new Date()) {
      return 'Finalizada';
    }

    if (this.active) {
      return 'Activa';
    }

    return 'Inactiva';

  }

  getGroupName() {
    return 'HuCap';
  }

  getPublisher() {
    return 'Hernán Mayolo';
  }

}
