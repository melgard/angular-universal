import {Component, Input, OnInit} from '@angular/core';
import {Privacy} from '@app/models/privacy.model';
import {CompanyService} from '@app/api/company-service/company.service';


interface PrivacyValue {
  id: number;
  description: string;
  value: boolean;
  disabled: boolean;
}

const privacyEnums = {
  show_contact_data: 'show_contact_data',
  show_review: 'show_review'
};

@Component({
  selector: 'app-settings-privacy',
  templateUrl: './settings-privacy.component.html',
  styleUrls: ['./settings-privacy.component.scss']
})
export class SettingsPrivacyComponent implements OnInit {

  @Input() privacies: Privacy[];
  @Input() companyPrivacies: Privacy[];
  @Input() companyId: number;

  privacyList: PrivacyValue[] = [];

  constructor(private companyService: CompanyService) {

  }

  ngOnInit() {
    this.privacyList = this.privacies.map(
      p => {
        return {id: p.id, description: p.description, value: this.companyHasPrivacySetting(p), disabled: false};
      }
    ).sort((a, b) => a.id - b.id);
  }

  getDescription(privacy: PrivacyValue) {
    switch (privacy.description) {
      case privacyEnums.show_contact_data:
        return 'Mostrar datos de contacto';
      case privacyEnums.show_review:
        return 'Mostrar valuación de empresa';
    }
  }

  companyHasPrivacySetting(privacy: Privacy): boolean {
    const filtered = this.companyPrivacies.filter(p => p.id === privacy.id);
    return filtered.length !== 0;
  }

  onPrivacyClick(privacy: PrivacyValue) {
    privacy.disabled = true;

    const subscription = privacy.value
      ? this.companyService.postCompanyPrivacies(this.companyId, privacy.id)
      : this.companyService.deleteCompanyPrivacies(this.companyId, privacy.id);

    subscription
      .finally(() => privacy.disabled = false)
      .subscribe(() => {
      }, () => privacy.value = !privacy.value);
  }
}
