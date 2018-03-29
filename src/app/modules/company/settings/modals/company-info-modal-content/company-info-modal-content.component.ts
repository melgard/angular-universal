import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Response} from '@angular/http';
import {Company} from '@app/models/company.model';
import {Parametric} from '@app/models/parametric.model';
import {CompanyService} from '@app/api/company-service/company.service';
import {ParametricsService} from '@app/services/parametrics.service';


@Component({
  selector: 'app-company-info-modal-content',
  templateUrl: './company-info-modal-content.component.html',
  styleUrls: ['./company-info-modal-content.component.scss']
})
export class CompanyInfoModalContentComponent implements OnInit {

  @Input() company: Company;

  @Output() onSubmitSuccess = new EventEmitter<any>();

  public sendingForm: boolean;
  public modalForm: FormGroup;
  public employeesCounts: Parametric[] = [];
  public ready: boolean;
  public nullValue = null;

  formErrors = {
    'legalName': '',
    'tradeName': '',
    'description': ''
  };

  validationMessages = {
    'legalName': {
      'required': 'Ingrese una dirección web.'
    },
    'tradeName': {
      'required': 'Ingrese una dirección web.'
    },
    'description': {
      'required': 'Ingrese una dirección web.'
    }
  };

  constructor(private fb: FormBuilder,
              private companyService: CompanyService,
              private parametricsService: ParametricsService) {
  }

  ngOnInit() {
    this.ready = false;
    this.parametricsService.getEmployeesCounts()
      .finally(() => this.ready = true)
      .subscribe(employeesCounts => {
        this.employeesCounts = employeesCounts;
        this.buildForm();
      });
  }

  onSubmit() {
    const toSaveCompany = new Company(Object.assign({}, this.company, this.modalForm.value));
    if (toSaveCompany.employeesCount.toString() === '') toSaveCompany.employeesCount = null;
    else {
      toSaveCompany.employeesCount = this.employeesCounts
        .filter(e => e.id === this.modalForm.value.employeesCount)
        .pop();
    }

    this.companyService.putCompany(this.company.id, toSaveCompany)
      .subscribe((res: Response) => {
        this.onSubmitSuccess.emit();
      });
  }

  buildForm(): void {
    this.modalForm = this.fb.group({
      'legalName': [this.company.legalName, [
        Validators.required
      ]],
      'tradeName': [this.company.tradeName, [
        Validators.required
      ]],
      'description': [this.company.description, [
        Validators.required
      ]],
      'employeesCount': [this.company.employeesCount ? this.company.employeesCount.id : '', []]
    });

    this.modalForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.modalForm) return;
    const form = this.modalForm;

    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);

        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }
}
