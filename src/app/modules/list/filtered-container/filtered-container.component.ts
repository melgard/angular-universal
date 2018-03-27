import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
//Interfaces
import {ISearchResult, SearchResult} from '@app/interfaces/search-result.interface';
// Servicios
import {OfferService, SearchService} from '@app/services/index.services';
// Models
import {ActiveFilter, CompanySearchResult, Filter, OfferSearchResult, UserSearchResult} from '@app/models/index.models';


@Component({
  selector: 'app-filtered-container',
  templateUrl: './filtered-container.component.html',
  styleUrls: ['./filtered-container.component.scss']
})
export class FilteredContainerComponent implements OnInit, OnDestroy {

  appliedOfferIds: number[] = [];

  public ready: boolean;
  public activeFilters: ActiveFilter[];
  public availableFilters: Filter[];
  public searchResults: ISearchResult[];
  public availableSorts: { name: string, value: string }[];
  public selectedSort: { name: string, value: string } = null;
  public scrollFetching = false;
  public nextPage: number;
  private filteringEntity: string;
  private subscriptions: any[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private searchService: SearchService,
              private offerService: OfferService) {
  }

  ngOnInit() {
    this.ready = false;
    this.searchService.resetSecondaryFilters();

    this.subscriptions.push(this.route.params.subscribe(params => {
      this.filteringEntity = params['filteringEntity'];
    }));

    this.searchService.search(0)
      .flatMap(this.searchServiceSubscription())
      .flatMap(searchables => {
        if (searchables && this.searchService.hasFilterToActivate()) {
          const filterToActivate = this.searchService.popFilterToActivate();

          if (this.searchService.isApplicableFilterInAvailables(filterToActivate)) {
            const filter = this.availableFilters.find(fil => fil.property === filterToActivate.property);
            const value = filter.values.find(v => v.description === filterToActivate.valueDescription);

            this.searchService.addActiveFilter(filter, value);
            this.searchService.search(0).subscribe(this.searchServiceSubscription());
          }
        }
        return this.offerService.getConnectedUserApplies();
      })
      .finally(() => this.ready = true)
      .subscribe(applies => this.appliedOfferIds = applies.map(a => a.offerId));
  }

  getGlobalSearchText() {
    return this.searchService.getGlobalSearchText();
  }

  onSelectFilter(event) {
    const filter = event.filter;
    const value = event.value;

    this.searchService.addActiveFilter(filter, value);
    this.searchService.search(0).subscribe(this.searchServiceSubscription());
  }

  getResultSize() {
    return this.searchService.getResultSize();
  }

  removeFilter(activeFilter: ActiveFilter) {
    if (activeFilter.isPrimary) {
      this.initSorts();
      this.router.navigate(['/list']);
    } else {
      this.searchService.removeActiveFilter(activeFilter);
      this.searchService.search(0).subscribe(this.searchServiceSubscription());
    }
  }

  onScroll() {
    if (this.scrollFetching || !this.nextPage) return;
    else {
      this.scrollFetching = true;
      this.searchService.search(this.nextPage)
        .finally(() => this.scrollFetching = false)
        .subscribe(this.searchServiceSubscription());
    }
  }

  onSelectedSort() {
    this.searchService.search(0, this.selectedSort.value).subscribe(this.searchServiceSubscription());
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  private initSorts() {
    this.availableSorts = [];
    this.selectedSort = null;
  }

  private searchServiceSubscription() {
    return searchables => {
      this.activeFilters = this.searchService.getActiveFilters().value;
      this.availableFilters = this.searchService.getAvailableFilters().value;

      if (!this.selectedSort) this.availableSorts = searchables.sorts.map(s => this.translateSort(s));

      if (searchables.first) {
        this.searchResults = searchables.values.map(s => this.createEntity(s));
      } else {
        this.searchResults = this.searchResults.concat(searchables.values.map(s => this.createEntity(s)));
      }

      this.nextPage = searchables.last ? null : searchables.page + 1;

      return searchables.values;
    };
  }

  private translateSort(sort) {
    switch (sort) {
      case 'older':
        return {name: 'más antiguo', value: sort};
      case 'newer':
        return {name: 'más reciente', value: sort};
      default:
        return {name: sort, value: sort};
    }
  }

  private createEntity(result: any): SearchResult {
    switch (this.filteringEntity) {
      case 'offer':
        return new OfferSearchResult(
          result.id, result.image_url, result.title,
          result.subtitle, result.since, result.description,
          result.location, result.contractKind, result.cluster,
          result.career, 'ver oferta', true
        );
      case 'user':
        return new UserSearchResult(
          result.id, result.image_url, result.title,
          result.subtitle, result.since, result.description,
          result.location, result.currentWork, 'conectar', true
        );
      case 'company':
        return new CompanySearchResult(
          result.id, result.image_url, result.title,
          result.subtitle, result.since, result.description,
          result.location, result.followersCount, 'seguir', true
        );
    }
  }
}
