import {Component, Input, OnInit} from '@angular/core';
import {OfferService} from '../../../../services/index.services';
import {AppConfig} from '../../../../app-config';

@Component({
  selector: 'app-action-section',
  templateUrl: './action-section.component.html',
  styleUrls: ['./action-section.component.scss']
})
export class ActionSectionComponent implements OnInit {

  public noImage = AppConfig.COMPANY_NO_IMAGE;

  sendingApply = false;
  @Input() summary: {
    id: number,
    createdAt: string,
    logoUrl: string,
    location: string,
    position: string,
    alreadyApplied: boolean,
    company: string
  };
  applyText: string;
  private applyString = 'Aplicar';
  private alreadyApplyString = '¡Ya has aplicado!';

  constructor(private offerService: OfferService) {
  }

  ngOnInit() {
    this.applyText = this.summary.alreadyApplied ? this.alreadyApplyString : this.applyString;
  }

  onApply() {
    this.sendingApply = true;

    this.offerService.apply(this.summary.id)
      .finally(() => this.sendingApply = false)
      .subscribe(
        () => {
          this.summary.alreadyApplied = true;
          this.applyText = this.alreadyApplyString;
        },
        (e) => {
          if (e.status >= 400) {
            const errorBody = JSON.parse(e._body);
            const errorMessage = errorBody.errorCode && errorBody.errorCode === 'ALREADY_APPLIED'
              ? 'Ya aplicaste a esta oferta'
              : e.toString();
            alert(`Error: ${errorMessage}`);
          }
        }
      );
  }
}
