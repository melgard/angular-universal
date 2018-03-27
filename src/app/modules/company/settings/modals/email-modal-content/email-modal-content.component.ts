import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Response} from '@angular/http';
import {CompanyService} from '@app/api/company-service/company.service';
import {Email} from '@app/models/email.model';


@Component({
  selector: 'app-email-modal-content',
  templateUrl: './email-modal-content.component.html',
  styleUrls: ['./email-modal-content.component.scss']
})
export class EmailModalContentComponent implements OnInit {

  @Input() email: Email;
  @Input() companyId: number;

  @Output() onSubmitSuccess = new EventEmitter<any>();

  public sendingForm: boolean;
  public modalForm: FormGroup;

  formErrors = {
    'email': ''
  };

  validationMessages = {
    'email': {
      'required': 'Ingrese un email web.',
      'email': 'Mail inválido.'
    }
  };

  constructor(private fb: FormBuilder,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    const toSaveEmail = new Email(this.modalForm.value);
    if (this.email.id) {
      toSaveEmail.id = this.email.id;
      this.companyService.putCompanyEmail(this.companyId, toSaveEmail).subscribe(this.successSubscription());
    } else {
      this.companyService.postCompanyEmail(this.companyId, toSaveEmail).subscribe(this.successSubscription());
    }
  }

  buildForm(): void {
    this.modalForm = this.fb.group({
      'email': [this.email.email, [
        Validators.required,
        Validators.email
      ]],
      'primary': [this.email.primary || false, []]
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

  private successSubscription() {
    return (res: Response) => {
      this.onSubmitSuccess.emit();
    };
  }
}
