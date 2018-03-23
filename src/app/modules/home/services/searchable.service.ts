import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FilterValue} from '../model/filter-value.model';
import {Observable} from 'rxjs/Observable';
import {API} from '@app/modules/core/api.constants';

@Injectable()
export class SearchableService {

  constructor(private httpClient: HttpClient) {
  }

  getSearchableFilterValues(filter: string): Observable<FilterValue[]> {
    const url: string = `${API.SEARCHABLE}home/offers/filters/${filter}`;
    return this.httpClient.get<FilterValue[]>(url);
  }


}
