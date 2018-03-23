import {Component, Inject, OnInit} from '@angular/core';
import {Router} from '@angular/router';
// models
import {Filter, Value} from '@app/models/filter.model';
import {FilterValue} from '@app/modules/home/model/filter-value.model';
// services
import {SearchableService} from '@app/modules/home/services/searchable.service';
import {SearchService} from '@app/services/search/search.service';


@Component({
  selector: 'app-home-container',
  templateUrl: './home-container.component.html',
  styleUrls: ['./home-container.component.scss']
})
export class HomeContainerComponent implements OnInit {

  public filterValues: FilterValue[];

  constructor(private searchableService: SearchableService,
              private searchService: SearchService,
              private router: Router,
              @Inject('featuredJob') public featuredJob,
              @Inject('birpinSummary') public birpinSummary) {
  }

  ngOnInit() {
    // TODO Descomentar
    /*this.searchableService.getSearchableFilterValues('career')
      .subscribe( fv => {
        this.filterValues = fv;
    });*/
  }

  onClickFilter(filterValue: FilterValue) {
    // fixme refactorizar esto
    const value: Value = {count: 0, description: 'offer', showingDescription: 'Empleos'};
    const filter = new Filter('Tipo de resultado', null, true, [value]);

    this.searchService.addActiveFilter(filter, value);
    this.searchService.pushFilterToActivate({property: 'career', valueDescription: filterValue.description});
    this.router.navigate(['/list/offer']);
  }
}
