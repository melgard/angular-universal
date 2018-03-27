import {Component, Input, OnDestroy, OnInit} from '@angular/core';

import {_} from 'lodash';
import {PerkValue} from '../components/company-perks-list/company-perks-list.component';
import {ParametricPerk} from '@app/models/parametric-perk.model';
import {Perk as CompanyPerk} from '@app/models/perk.model';
import {CompanyService} from '@app/api/company-service/company.service';

@Component({
  selector: 'app-settings-perks',
  templateUrl: './settings-perks.component.html',
  styleUrls: ['./settings-perks.component.scss']
})
export class SettingsPerksComponent implements OnInit, OnDestroy {

  @Input() perks: ParametricPerk[];
  @Input() companyPerks: CompanyPerk[];
  @Input() companyId: number;

  public favoritePerks: ParametricPerk[] = [];
  displayCompanyPerksModal = false;

  constructor(private companyService: CompanyService) {

  }

  ngOnInit() {
    this.favoritePerks = this.perks
      .filter(p => p.favorite)
      .sort(p =>
        this.companyPerks.find(cp => cp.perkId === parseInt(p.id, 10))
          ? -1
          : 1
      );
  }

  ngOnDestroy() {
  }

  onPerkToggle(perk: PerkValue) {
    perk.disabled = true;

    const subscription = perk.value
      ? this.companyService.postCompanyPerks(this.companyId, perk.id)
      : this.companyService.deleteCompanyPerks(this.companyId, perk.id);

    subscription
      .finally(() => perk.disabled = false)
      .subscribe(() => {
        perk.value
          ? this.companyPerks.push(new CompanyPerk({perkId: perk.id}))
          : this.companyPerks = this.companyPerks.filter(p => p.perkId !== perk.id);
      }, () => perk.value = !perk.value);
  }

  openPerksModal() {
    this.displayCompanyPerksModal = true;
  }
}
