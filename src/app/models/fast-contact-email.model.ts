import {Model} from '@app/models/model';
import {FastContactEmailVariable} from './fast-contact-email-variable.model';

export class FastContactEmail extends Model {

  public id: number;
  public title: string;
  public subject: string;
  public content: string;
  public signature: string;
  public variables: FastContactEmailVariable[];

  constructor(config?) {
    super(config);
    if (!this.variables) this.variables = [];
  }
}
