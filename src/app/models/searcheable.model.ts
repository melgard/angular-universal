import {Model} from './model';
import {ISearchResult} from '@app/interfaces/search-result.interface';

export class Searchable extends Model {

  public type: string;
  public count: number;
  public values: ISearchResult[];

  constructor(config?) {
    super(config);
  }
}
