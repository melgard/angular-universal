import {Component, ViewEncapsulation} from '@angular/core';
import {Router} from '@angular/router';

import {SearchService} from 'app/services/search/search.service';
import {Filter, Value} from 'app/models/filter.model';

@Component({
  selector: 'app-header',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './header.component.html',
  styleUrls: ['../../../../../styles/header.component.scss']
})
export class HeaderComponent {

  public searchJobInput: string;
  private locationFilter: string;
  private sublocationFilter: string;
  private locationString = '';

  public autocompleteSettings: any = {
    inputPlaceholderText: 'ciudad y provincia',
    showSearchButton: false,
    showRecentSearch: false,
    geoCountryRestriction: ['ar'],
    showCurrentLocation: false,
    inputString: this.locationString
  };

  constructor(private searchService: SearchService,
              private router: Router) {

  }

  onLocationSelect(selectedLocation: any) {
    this.locationFilter = this.extractLocationType(selectedLocation, 'administrative_area_level_1');
    this.sublocationFilter =
      this.extractLocationType(selectedLocation, 'administrative_area_level_2') ||
      this.extractLocationType(selectedLocation, 'locality');
  }

  onSearch() {
    this.searchService.setGlobalSearchText(this.searchJobInput);

    if (this.sublocationFilter || this.locationFilter) {
      // TODO: hardcode
      const value: Value = {count: 0, description: 'offer', showingDescription: 'Empleos'};
      const filter = new Filter('Tipo de resultado', null, true, [value]);

      this.searchService.addActiveFilter(filter, value);
      if (this.locationFilter) this.searchService.pushFilterToActivate({property: 'location', valueDescription: this.locationFilter});
      if (this.sublocationFilter) this.searchService.pushFilterToActivate({
        property: 'sublocation',
        valueDescription: this.sublocationFilter
      });

      this.router.navigate(['/list/offer']);
    } else {
      this.router.navigate([`/list`]);
    }
  }

  onDeleteAutocompleteInput() {
    this.locationFilter = null;
    this.sublocationFilter = null;
    // TODO Error Angular Universal
    //(<HTMLInputElement>document.getElementById('search_places')).value = '';
  }

  private extractLocationType(location, kind) {
    return location.data.address_components
      .filter(com => com.types.find(t => t === kind))
      .map(l => l.long_name)
      .find(_ => _);
  }
}
