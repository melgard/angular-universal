import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Response} from '@angular/http';
import {Phone} from '@app/models/phone.model';
import {CompanyService} from '@app/api/company-service/company.service';


@Component({
  selector: 'app-phone-modal-content',
  templateUrl: './phone-modal-content.component.html',
  styleUrls: ['./phone-modal-content.component.scss']
})
export class PhoneModalContentComponent implements OnInit {

  @Input() phone: Phone;
  @Input() companyId: number;

  @Output() onSubmitSuccess = new EventEmitter<any>();

  public sendingForm: boolean;
  public modalForm: FormGroup;

  public maxCountryInputSize = 3;
  public maxAreaInputSize = 5;
  public maxPrefixInputSize = 4;
  public maxLineInputSize = 4;

  formErrors = {
    'phone': ''
  };

  validationMessages = {
    'phone': {
      'required': 'Ingrese un email web.'
    }
  };

  constructor(private fb: FormBuilder,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {
    const primary = this.modalForm.value.primary;
    const phone = `+${this.modalForm.value.country} ${this.modalForm.value.area} ${this.modalForm.value.prefix}-${this.modalForm.value.line}`;

    const toSavePhone = new Phone({phone, primary});
    if (this.phone.id) {
      toSavePhone.id = this.phone.id;
      this.companyService.putCompanyPhone(this.companyId, toSavePhone).subscribe(this.successSubscription());
    } else {
      this.companyService.postCompanyPhone(this.companyId, toSavePhone).subscribe(this.successSubscription());
    }
  }

  buildForm(): void {
    // fixme pasar esto a un helper y el Phone a una clase
    const phoneArray = this.phone.phone ? this.phone.phone.split(' ') : null;
    const expandedPhone = {
      country: phoneArray ? phoneArray[0].split('+')[1] : '',
      area: phoneArray ? phoneArray[1] : '',
      prefix: phoneArray ? phoneArray[2].split('-')[0] : '',
      line: phoneArray ? phoneArray[2].split('-')[1] : ''
    };

    this.modalForm = this.fb.group({
      // 'phone': [this.phone.phone, [
      //   Validators.required
      // ]],
      'country': this.validateMinMax(1, this.maxCountryInputSize, expandedPhone.country),
      'area': this.validateMinMax(1, this.maxAreaInputSize, expandedPhone.area),
      'prefix': this.validateMinMax(4, this.maxPrefixInputSize, expandedPhone.prefix),
      'line': this.validateMinMax(4, this.maxLineInputSize, expandedPhone.line),
      'primary': [this.phone.primary || false, []]
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

  private validateMinMax(min, max, defaultValue) {
    return [defaultValue, [
      Validators.required,
      Validators.minLength(min),
      Validators.maxLength(max),
      Validators.pattern('[0-9]+')  // validates input is digit
    ]];
  }
}
