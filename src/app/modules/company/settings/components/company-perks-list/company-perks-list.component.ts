import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Perk as CompanyPerk} from '@app/models/perk.model';
import {ParametricPerk} from '@app/models/parametric-perk.model';

export interface PerkValue {
  id: number;
  description: string;
  favorite: boolean;
  value: boolean;
  disabled: boolean;
}

@Component({
  selector: 'app-company-perks-list',
  templateUrl: './company-perks-list.component.html',
  styleUrls: ['./company-perks-list.component.scss']
})
export class CompanyPerksListComponent implements OnInit {

  @Input() perks: ParametricPerk[];
  @Input() companyPerks: CompanyPerk[];

  @Output() onPerkToggle = new EventEmitter<PerkValue>();

  public availablePerks: PerkValue[] = [];

  constructor() {
  }

  ngOnInit() {
    this.availablePerks = this.perks.map(p => ({
      id: parseInt(p.id, 10),
      description: p.description,
      favorite: p.favorite,
      value: !!this.companyHasPerk(p),
      disabled: false
    }));
  }

  companyHasPerk(perk: ParametricPerk) {
    return this.companyPerks.find(p => p.perkId === parseInt(perk.id, 10));
  }

  emitPerkToggle(perkValue: PerkValue) {
    this.onPerkToggle.emit(perkValue);
  }
}
