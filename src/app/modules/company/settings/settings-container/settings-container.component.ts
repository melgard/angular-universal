import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
// Services
import {CompanyService} from '@app/api/company-service/company.service';
import {ParametricsService} from '@app/modules/core/services/parametrics.service';
import {
  Address,
  Company,
  Email,
  FastContactEmail,
  ParametricPerk,
  Perk as CompanyPerk,
  Phone,
  Privacy,
  Selector
} from '@app/models/index.models';


// Models

@Component({
  selector: 'app-settings-container',
  templateUrl: './settings-container.component.html',
  styleUrls: ['./settings-container.component.scss']
})
export class SettingsContainerComponent implements OnInit, OnDestroy {

  public company: Company;
  public addresses: Address[];
  public emails: Email[];
  public phones: Phone[];
  public perks: ParametricPerk[];
  public companyPerks: CompanyPerk[];
  public fastContactEmails: FastContactEmail[];
  public selectors: Selector[];
  public privacies: Privacy[];
  public companyPrivacies: Privacy[];
  public loading = false;
  public ready = false;
  private subscriptions: Subscription[] = [];
  private companyId;

  constructor(private companyService: CompanyService,
              private parametricService: ParametricsService,
              private activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {
    this.loading = true;
    this.ready = false;

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.companyId = params['groupId'];

        this.companyService.getCompany(this.companyId)
          .finally(() => this.loading = false)
          .flatMap((company: Company) => {
            this.company = company;
            return this.companyService.getCompanyAddresses(this.companyId);
          })
          .flatMap((addresses: Address[]) => {
            this.addresses = addresses;

            return this.companyService.getCompanyPhones(this.companyId);
          })
          .flatMap((phones: Phone[]) => {
            this.phones = phones;

            return this.companyService.getCompanyEmails(this.companyId);
          })
          .flatMap((emails: Email[]) => {
            this.emails = emails;

            return this.companyService.getCompanyPrivacies(this.companyId);
          })
          .flatMap((companyPrivacies: Privacy[]) => {
            this.companyPrivacies = companyPrivacies;

            return this.companyService.getPrivacies();
          })
          .flatMap((privacies: Privacy[]) => {
            this.privacies = privacies;

            return this.parametricService.getPerks();
          })
          .flatMap((perks: ParametricPerk[]) => {
            this.perks = perks;

            return this.companyService.getCompanyPerks(this.companyId);
          })
          .flatMap((perks: CompanyPerk[]) => {
            this.companyPerks = perks;

            return this.companyService.getCompanyFastContactEmail(this.companyId);
          })
          .flatMap((fastContactEmails: FastContactEmail[]) => {
            this.fastContactEmails = fastContactEmails;

            return this.companyService.getCompanySelectors(this.companyId);
          })
          .subscribe((selectors: Selector[]) => {
            this.selectors = selectors;
            this.ready = true;
          });
      })
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  getCompanyId() {
    return this.companyId;
  }

  loadCompany() {
    return this.companyService.getCompany(this.companyId)
      .subscribe((company) => this.company = company);
  }

  loadAddresses() {
    return this.companyService.getCompanyAddresses(this.companyId)
      .subscribe((addresses) => this.addresses = addresses);
  }

  loadEmails() {
    return this.companyService.getCompanyEmails(this.companyId)
      .subscribe((emails) => this.emails = emails);
  }

  loadPhones() {
    return this.companyService.getCompanyPhones(this.companyId)
      .subscribe((phones) => this.phones = phones);
  }

  loadSelectors() {
    return this.companyService.getCompanySelectors(this.companyId)
      .subscribe((selectors) => this.selectors = selectors);
  }

  loadFastContactEmails() {
    return this.companyService.getCompanyFastContactEmail(this.companyId)
      .subscribe((fastContactEmails) => this.fastContactEmails = fastContactEmails);
  }
}
