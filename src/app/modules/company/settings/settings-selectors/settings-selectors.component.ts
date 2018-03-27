import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs/Observable';
// Services
import {ConfirmationService} from 'primeng/primeng';
import {SearchService} from '@app/services/search/search.service';
import {CompanyService} from '@app/api/company-service/company.service';
// Models
import {UserSearchResult} from '@app/models/search-result-user.model';
import {Selector} from '@app/models/selector.model';
import {SelectorToAdd} from '@app/models/selector-to-add.model';

@Component({
  selector: 'app-settings-selectors',
  templateUrl: './settings-selectors.component.html',
  styleUrls: ['./settings-selectors.component.scss']
})
export class SettingsSelectorsComponent implements OnInit, OnDestroy {

  subscriptions: Subscription[] = [];

  searchResultsSource: Observable<UserSearchResult[]>;
  searchText: string;
  displayAddSelectorModal = false;
  selectedUserSearchResult: UserSearchResult;

  selectorsToAddForm: FormGroup;
  sendingSelectorToAdd = false;

  @Output() onSelectorAddSuccess = new EventEmitter<any>();
  @Output() onSelectorDeleteSuccess = new EventEmitter<any>();
  @Input() companyId;
  @Input() selectors: Selector[];

  formErrors = {
    'professionalProfileEmail': 'Se debe ingresar un mail válido.',
    'professionalProfileFullName': 'El nombre es requerido.'
  };

  constructor(private fb: FormBuilder,
              private searchService: SearchService,
              private companyService: CompanyService,
              private confirmationService: ConfirmationService) {
    this.buildForm();
  }

  buildForm() {
    this.selectorsToAddForm = this.fb.group({
      'professionalProfileEmail': ['', [Validators.required, Validators.email]],
      'professionalProfileFullName': ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.sendingSelectorToAdd = true;

    this.companyService
      .postCompanySelectorToAdd(this.companyId, [new SelectorToAdd(this.selectorsToAddForm.value)])
      .finally(() => this.sendingSelectorToAdd = false)
      .subscribe(() => this.onSelectorAddSuccess.emit());
  }

  ngOnInit() {
    this.searchResultsSource = Observable
      .create((observer: any) => observer.next(this.searchText))
      .mergeMap((searchText) => this.searchService.getUsers(searchText, 0));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onClickItem(userSearchResultItem) {
    this.selectedUserSearchResult = userSearchResultItem.item;
    this.displayAddSelectorModal = true;
  }

  emitSelectorAddSuccess() {
    this.onHideAddSelector();
    this.displayAddSelectorModal = false;
    this.onSelectorAddSuccess.emit();
  }

  onHideAddSelector() {
    this.searchText = '';
  }

  clickDeleteSelector(selector: Selector) {

    this.confirmationService.confirm({
      message: '¿Está seguro que desea eliminar el selector?',
      header: 'Eliminar Selector',
      icon: 'fa fa-trash',

      accept: () => {
        if (selector.alreadyConfirmed) {
          this.companyService.deleteCompanySelector(this.companyId, selector.id)
            .subscribe(this.deleteSelectorSubscription());
        } else {
          this.companyService.deleteCompanySelectorToAdd(this.companyId, selector.id)
            .subscribe(this.deleteSelectorSubscription());
        }
      },
      reject: () => {
      }
    });
  }

  private deleteSelectorSubscription() {
    return () => this.onSelectorDeleteSuccess.emit();
  }
}
