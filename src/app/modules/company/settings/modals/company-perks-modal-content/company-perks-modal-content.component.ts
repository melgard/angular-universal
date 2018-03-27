import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Perk as CompanyPerk} from '@app/models/perk.model';
import {PerkValue} from '../../components/company-perks-list/company-perks-list.component';
import {ParametricPerk} from '@app/models/parametric-perk.model';

@Component({
  selector: 'app-company-perks-modal-content',
  templateUrl: './company-perks-modal-content.component.html',
  styleUrls: ['./company-perks-modal-content.component.scss']
})
export class CompanyPerksModalContentComponent implements OnInit {

  @Input() perks: ParametricPerk[];
  @Input() companyPerks: CompanyPerk[];

  @Output() onPerkToggle = new EventEmitter<PerkValue>();

  constructor() {
  }

  ngOnInit() {
  }

  emitPerkToggle(perkValue: PerkValue) {
    this.onPerkToggle.emit(perkValue);
  }
}
