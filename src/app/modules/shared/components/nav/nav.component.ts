import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {SearchService} from 'app/services/search/search.service';
import {TypeaheadMatch} from 'ngx-bootstrap';
import {AppConfig} from 'app/app-config';
import {UserSession} from 'app/models/user-session.model';
import {UserService} from 'app/services/user.service';
import {Filter, Value} from 'app/models/filter.model';
import {Offer} from 'app/models/offer.model';
import {OfferService} from 'app/services/offer.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'app-navbar',
  templateUrl: './nav.component.html',
  styleUrls: ['../../../../../styles/nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  public companyNoImage = AppConfig.COMPANY_NO_IMAGE;
  public userNoImage = AppConfig.USER_NO_IMAGE;

  isLoggedIn: Boolean;
  userSession: UserSession;
  showNavSearch = false;
  showMenu = false;

  searchText = '';
  searchResultsSource: Observable<any>;
  private selectedMatch: TypeaheadMatch;
  private _loggedInSubscription;
  private companyId;


  constructor(@Inject('environment') private environment,
              private userService: UserService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private route: ActivatedRoute,
              private searchService: SearchService,
              private offerService: OfferService) {

    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    this.searchResultsSource = Observable
      .create((observer: any) => observer.next(this.searchText))
      .mergeMap((searchText) => {
        this.searchService.setGlobalSearchText(this.searchText);
        return this.searchService.getSearchables().map(searchables => {
          const results = [];

          searchables.forEach(searchable => {
            results.push(searchable.values.map(value => {
              let kind;
              switch (searchable.type) {
                case 'offer':
                  kind = 'Empleos';
                  break;
                case 'user':
                  kind = 'Usuarios';
                  break;
                case 'company':
                  kind = 'Compañías';
                  break;
              }

              return {
                kind: searchable.type,
                ...value
              };
            }));
          });

          return results.reduce((a, b) => a.concat(b), []);
        });

      });
  }

  ngOnInit() {
    this._loggedInSubscription = this.userService.loggedIn.subscribe((value) => {
      this.userSession = value;
      this.isLoggedIn = (value.signedIn);
      this.companyId = this.userService.getCompanyId();
    });

    this.router.events
      .subscribe((evt) => {
        if (evt instanceof NavigationEnd) {
          this.showNavSearch = this.showingNavSearch(evt);
          this.componentRestart();

          // trick the Router into believing it's last link wasn't previously loaded
          this.router.navigated = false;
          // if you need to scroll back to top, here is the right place
          window.scrollTo(0, 0);
        }
      });
  }

  showingNavSearch(evt: NavigationEnd): boolean {
    let retorno = false;
    rutasPermitidas.forEach(ruta => {
      if (evt.url.indexOf(ruta) !== -1) {
        retorno = true;
      }
    });
    return retorno;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  onMuroEmpresa(companyId) {
    this.router.navigate(['/wall/company', companyId]);
  }

  onClickSettings(companyId) {
    this.router.navigate(['company', companyId, 'settings']);
  }

  onClickEmpresa(companyId) {
    this.router.navigate(['/offer/company-dashboard', companyId]);
  }

  onFeed() {
    this.router.navigate(['/wall/user/feed']);
  }

  onMuroUsuario() {
    this.router.navigate(['/wall/user/me']);
  }

  onMyApplies() {
    this.router.navigate(['/offer/my-applies']);
  }

  getLoginUrl() {
    return `${this.environment.api_url}/login`;
  }

  getLogoutUrl() {
    return `${this.environment.api_url}/logout`;
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._loggedInSubscription.unsubscribe();
  }

  onSelectItem(match: TypeaheadMatch) {
    if (this.selectedMatch.isHeader()) {
      // fixme refactorizar esto, se debería pasar sólo el parámetro al list y que él se fije si puede buscarlo

      let showingDescription;
      switch (this.selectedMatch.value) {
        case 'offer':
          showingDescription = 'Empleos';
          break;
        case 'user':
          showingDescription = 'Usuarios';
          break;
        case 'company':
          showingDescription = 'Compañía';
          break;
      }

      const value: Value = {count: 0, description: this.selectedMatch.value, showingDescription};
      const filter = new Filter('Tipo de resultado', null, true, [value]);

      this.searchService.addActiveFilter(filter, value);
      this.router.navigate(['/list', this.selectedMatch.value]);
    } else if (this.selectedMatch) {
      switch (this.selectedMatch.item.kind) {
        case 'offer': {
          const offer = new Offer({
            date: this.selectedMatch.item.since,
            title: this.selectedMatch.item.title,
            body: this.selectedMatch.item.description,
            hierarchyLevel: '',
            category: '',
            postulants: [],
            recomended: [],
            active: false,
            paused: false,
            expireAt: ''
          });

          offer.location = this.selectedMatch.item.location;
          offer.groupId = this.selectedMatch.item.subtitle;

          this.offerService.setSelectedOffer(offer);
          this.router.navigate(['/offer/info', this.selectedMatch.item.id]);
          break;
        }
        case 'company':
          this.router.navigate(['/wall/company', this.selectedMatch.item.id]);
          break;
        case 'user':
          this.router.navigate(['/wall/user', this.selectedMatch.item.id]);
          break;
      }
    }
  }

  setActive(match: TypeaheadMatch, matches: TypeaheadMatch[]) {
    this.selectedMatch = match;
  }

  unSetActive() {
    this.selectedMatch = null;
  }

  isActive(match: TypeaheadMatch): boolean {
    return this.selectedMatch === match;
  }

  onSearch(value) {
    this.searchService.setGlobalSearchText(this.searchText);
    this.router.navigate(['/list']);
  }

  private componentRestart() {
    this.searchText = '';
  }
}


export const rutasPermitidas = [
  `list`,
  `/wall/company`,
  `/company/${this.companyId}/settings`,
  `/offer/company-dashboard`,
  `/wall/user/feed`,
  `/wall/user/me`,
  `/offer/new/`,
  `/offer/company-dashboard-detail/`
];
