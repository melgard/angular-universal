import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {SearchService} from '@app/services/index.services';
import {ISearchResult} from '@app/interfaces/search-result.interface';
import {Filter} from '@app/models/filter.model';

@Component({
  selector: 'app-list-container',
  templateUrl: './list-container.component.html',
  styleUrls: ['./list-container.component.scss']
})
export class ListContainerComponent implements OnInit {

  public availableFilters: Filter[];
  public searchResults: { type: string, values: ISearchResult[] }[];

  constructor(private searchService: SearchService,
              private router: Router) {

  }

  ngOnInit() {
    this.searchService.resetFitlersState();
    // TODO: Descomentar luego de cambiar http por httpClient
    /*
        this.searchService.getSearchables().subscribe(searchables => {
          this.searchResults = searchables;
          const values: Value[] = searchables.map( s => {
            return {
              description: s.type,
              showingDescription: s.type,
              count: s.count,
              active: false
            }
          });

          this.availableFilters = [ new Filter('Tipo de resultado', null, true, values) ];
        });
        */
  }

  getResultSize() {
    return this.searchService.getResultSize();
  }

  getGlobalSearchText() {
    return this.searchService.getGlobalSearchText();
  }

  onFilterBy(filter) {
    const primaryFilter = this.availableFilters.find(f => f.isPrimary);
    const value = primaryFilter.values.find(v => v.description === filter);

    this.onSelectFilter({filter: primaryFilter, value});
  }

  onSelectFilter(event) {
    const filter = event.filter;
    const value = event.value;

    this.searchService.addActiveFilter(filter, value);
    this.router.navigate([`/list/${this.searchService.getFilteringEntity()}`]);
  }
}
