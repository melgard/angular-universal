import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Response} from '@angular/http';
import {Address} from '@app/models/address.model';
import {CompanyService} from '@app/api/company-service/company.service';


@Component({
  selector: 'app-address-modal-content',
  templateUrl: './address-modal-content.component.html',
  styleUrls: ['./address-modal-content.component.scss']
})
export class AddressModalContentComponent implements OnInit {

  @Input() address: Address;
  @Input() companyId: number;

  @Output() onSubmitSuccess = new EventEmitter<any>();

  public sendingForm: boolean;
  public modalForm: FormGroup;
  public currentAddress: Address = null;

  public autocompleteSettings: any = {
    inputPlaceholderText: '',
    showSearchButton: false,
    showRecentSearch: false,
    geoCountryRestriction: ['ar'],
    showCurrentLocation: false,
    inputString: ''
  };

  formErrors = {};

  validationMessages = {};

  constructor(private fb: FormBuilder,
              private companyService: CompanyService) {
  }

  ngOnInit() {
    this.buildForm();
  }

  onSubmit() {

    const toSaveAddress = new Address(Object.assign({}, this.currentAddress, this.modalForm.value));

    if (this.address.id) {
      toSaveAddress.id = this.address.id;
      this.companyService.putCompanyAddress(this.companyId, toSaveAddress).subscribe(this.successSubscription());
    } else {
      this.companyService.postCompanyAddress(this.companyId, toSaveAddress).subscribe(this.successSubscription());
    }
  }

  buildForm(): void {
    this.modalForm = this.fb.group({
      'primary': [this.address.primary || false, []],
      'privateAddress': [this.address.privateAddress || false, []]
    });

    this.modalForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    if (this.address.id) {
      this.currentAddress = new Address({
        fullAddress: this.address.fullAddress,
        locality: this.address.locality,
        administrativeAreaLevel1: this.address.administrativeAreaLevel1,
        administrativeAreaLevel2: this.address.administrativeAreaLevel2,
        latitude: this.address.latitude,
        longitude: this.address.longitude
      });

      this.setSearchPlacesInputText(this.address.fullAddress);
    }

    this.onValueChanged(); // (re)set validation messages now
  }

  onDeleteAutocompleteInput() {
    this.currentAddress = null;
    this.setSearchPlacesInputText('');
  }

  onLocationSelect(selectedLocation: any) {
    this.currentAddress = new Address({
      fullAddress: selectedLocation.data.formatted_address,
      locality: this.extractLocationType(selectedLocation, 'locality'),
      administrativeAreaLevel1: this.extractLocationType(selectedLocation, 'administrative_area_level_1'),
      administrativeAreaLevel2: this.extractLocationType(selectedLocation, 'administrative_area_level_2'),
      latitude: selectedLocation.data.geometry.location.lat,
      longitude: selectedLocation.data.geometry.location.lng
    });
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

  private extractLocationType(location, kind) {
    return location.data.address_components
      .filter(com => com.types.find(t => t === kind))
      .map(l => l.long_name)
      .find(_ => _);
  }

  private setSearchPlacesInputText(text: string) {
    this.autocompleteSettings['inputString'] = text;
    this.autocompleteSettings = Object.assign({}, this.autocompleteSettings);
  }
}
