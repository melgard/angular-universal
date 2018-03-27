import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Response} from '@angular/http';
import {Website} from '@app/models/website.model';
import {CompanyService} from '@app/api/company-service/company.service';


@Component({
  selector: 'app-website-modal-content',
  templateUrl: './website-modal-content.component.html',
  styleUrls: ['./website-modal-content.component.scss']
})
export class WebsiteModalContentComponent implements OnInit {

  @Input() website: Website;
  @Input() companyId: number;

  @Output() onSubmitSuccess = new EventEmitter<any>();

  public sendingForm: boolean;
  public modalForm: FormGroup;

  formErrors = {
    'website': ''
  };

  validationMessages = {
    'website': {
      'required': 'Ingrese una dirección web.'
    }
  };

  constructor(private fb: FormBuilder,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    this.companyService.putCompanyWebsite(this.companyId, this.modalForm.value)
      .subscribe((res: Response) => {
        this.onSubmitSuccess.emit();
      });
  }

  buildForm(): void {
    this.modalForm = this.fb.group({
      'website': [this.website.website, [
        Validators.required
      ]]
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
