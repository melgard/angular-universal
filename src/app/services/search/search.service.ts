import {Inject, Injectable} from '@angular/core';
import {Http, Response, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {ActiveFilter, ApplicableFilter, Filter, Value} from '@app/models/filter.model';

import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Searchable} from '@app/models/searcheable.model';
import {UserSearchResult} from '@app/models/search-result-user.model';

@Injectable()
export class SearchService {
  private page = 0;
  private pageSize = 10;
  // TODO refactorizar el ISearchResult para que contenga la metadata de la llamada
  private resultSize = 0;
  private globalSearchText = '';

  private activeFilters = new BehaviorSubject<ActiveFilter[]>([]);
  private availableFilters = new BehaviorSubject<Filter[]>([]);

  private filtersToActivate: ApplicableFilter[] = [];

  constructor(@Inject('environment') private environment,
              private router: Router,
              private http: Http) {

  }


  resetFitlersState() {
    this.activeFilters.next([]);
    this.availableFilters.next([]);
  }

  resetSecondaryFilters() {
    this.activeFilters.next(this.activeFilters.value.filter(af => af.isPrimary));
    this.availableFilters.next([]);
  }

  getGlobalSearchText() {
    return this.globalSearchText;
  }

  setGlobalSearchText(text: string) {
    this.globalSearchText = text;
  }

  getResultSize() {
    return this.resultSize;
  }

  addActiveFilter(filter: Filter, value: Value) {
    const newActiveFilters = this.activeFilters.getValue();

    // si ya fue agregado un filtro para esa property no hago nada.
    const existentFilter = newActiveFilters.find(fil => fil.property === filter.property);
    if (existentFilter) return;

    let showingDescription;
    if (filter.isPrimary) {
      showingDescription = value.showingDescription;
    } else {
      showingDescription = value.description;
    }

    newActiveFilters.push({
      description: value.description,
      showingDescription,
      property: filter.property,
      isPrimary: filter.isPrimary
    });

    this.activeFilters.next(newActiveFilters);
  }

  isApplicableFilterInAvailables(filterToActivate: ApplicableFilter): boolean {
    const availableFilters = this.availableFilters.getValue();
    const filter = availableFilters.find(af => {
      return af.property === filterToActivate.property &&
        af.values.find(v => v.description === filterToActivate.valueDescription) !== null;
    });

    return filter !== null;
  }

  removeActiveFilter(activeFilter: ActiveFilter) {
    this.removeFilterFromList(this.activeFilters, activeFilter);
  }

  getActiveFilters() {
    return this.activeFilters;
  }

  getAvailableFilters() {
    return this.availableFilters;
  }


  getSearchables(): Observable<Searchable[]> {
    const search = new URLSearchParams();
    search.set('global', this.globalSearchText);

    return this
      .http
      .get(this.getSearchablesUrl(), {search})
      .map(response => {
        // fixme cuando esté el paginado
        const responseJson: Searchable[] = response.json();
        this.resultSize = responseJson.reduce((sum, current) => sum += current.values.length, 0);
        return responseJson;
      });
  }

  search(page: number, sort?: string): Observable<any> {
    const search = new URLSearchParams();

    const queryFilters = this.getSelectedFiltersQueryString();
    if (queryFilters) search.set('filters', queryFilters);
    search.set('global', this.globalSearchText);
    search.set('page', page.toString());
    if (sort) search.set('sort', sort);

    return this
      .http
      .get(this.getSearchUrl(this.getFilteringEntity()), {search})
      .map((res: Response) => {
        const response = res.json();
        this.resultSize = response.total;
        const filters = response.filters
          .filter(filter => filter.values.length !== 0)
          .map(filter => {
            const values = filter.values.map(value => {
              return {description: value.description, count: value.count};
            });
            return new Filter(filter.description, filter.property, false, values);
          });
        this.availableFilters.next(filters);
        return response;
      });
  }


  getUsers(query: string, page: number): Observable<UserSearchResult[]> {
    const search = new URLSearchParams();

    search.set('global', query);
    search.set('page', page.toString());

    return this
      .http
      .get(this.getSearchUrl('user'), {search})
      .map((res: Response) => {
        return res.json().values.map(r => new UserSearchResult(
          r.id, r.image_url, r.title,
          r.subtitle, r.since, r.description,
          r.location, r.currentWork, 'conectar', true
        ));
      });
  }

  getFilteringEntity() {
    const primaryFilter = this.activeFilters.value.find(f => f.isPrimary);
    if (primaryFilter) return primaryFilter.description;
    else return null;
  }

  hasFilterToActivate() {
    return this.filtersToActivate.length !== 0;
  }

  pushFilterToActivate(filter: ApplicableFilter) {
    this.filtersToActivate.push(filter);
  }

  popFilterToActivate() {
    return this.filtersToActivate.pop();
  }

  private getSearchablesUrl() {
    // todo add searchInput to url
    return `${this.environment.api_url}/api/searchables`;
  }

  private getSearchUrl(entity: string) {

    let entityUrl;

    switch (entity) {
      case 'offer':
        entityUrl = 'offers';
        break;
      case 'company':
        entityUrl = 'companies';
        break;
      case 'user':
        entityUrl = 'users';
        break;
    }

    // todo add searchInput to url
    return `${this.environment.api_url}/api/searchables/${entityUrl}`;
  }

  private removeFilterFromList(list: BehaviorSubject<ActiveFilter[]>, filter: ActiveFilter) {
    const listValue = list.getValue();
    const idx = listValue.indexOf(filter);
    if (idx === -1) return;

    // returns a new array without the element on idx (immutable)
    const newFilters = listValue.slice(idx + 1).concat(listValue.slice(0, idx));
    list.next(newFilters);
  }

  private getSelectedFiltersQueryString() {
    const queryString = this.activeFilters.value
      .filter((value) => !value.isPrimary)
      .reduce((acc, value) => `${acc}${value.property}:${value.description},`, '');

    return queryString ? queryString.substr(0, queryString.length - 1) : null;
  }
}
