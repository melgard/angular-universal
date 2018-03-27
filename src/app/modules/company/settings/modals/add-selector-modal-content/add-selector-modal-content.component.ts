import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Response} from '@angular/http';
import {UserSearchResult} from '@app/models/search-result-user.model';
import {CompanyService} from '@app/api/company-service/company.service';
import {CreateSelector} from '@app/models/create-selector.model';

@Component({
  selector: 'app-add-selector-modal-content',
  templateUrl: './add-selector-modal-content.component.html',
  styleUrls: ['./add-selector-modal-content.component.scss']
})
export class AddSelectorModalContentComponent implements OnInit {

  @Input() userSearchResult: UserSearchResult;
  @Input() companyId: number;

  @Output() onSubmitSuccess = new EventEmitter<any>();

  errorDescription: string;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    const toSaveSelector = [new CreateSelector({professionalProfileId: this.userSearchResult.id})];
    this.companyService.postCompanySelector(this.companyId, toSaveSelector)
      .subscribe(this.successSubscription(), (err) => {
        if (err.json().errorCode === 'SELECTOR_ALREADY_REGISTERED') this.errorDescription = 'El usuario ya está registrado como selector.';
      });
  }

  private successSubscription() {
    return (res: Response) => {
      this.onSubmitSuccess.emit();
    };
  }
}
