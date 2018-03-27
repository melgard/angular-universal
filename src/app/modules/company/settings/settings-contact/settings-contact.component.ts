import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Address} from '@app/models/address.model';
import {Email} from '@app/models/email.model';
import {Phone} from '@app/models/phone.model';
import {CompanyService} from '@app/api/company-service/company.service';
import {Website} from '@app/models/website.model';


@Component({
  selector: 'app-settings-contact',
  templateUrl: './settings-contact.component.html',
  styleUrls: ['./settings-contact.component.scss']
})
export class SettingsContactComponent implements OnInit {

  @Input() website: string;
  @Input() addresses: Address[];
  @Input() emails: Email[];
  @Input() phones: Phone[];
  @Input() companyId: number;

  @Output() onEditWebsiteSuccess = new EventEmitter<any>();
  @Output() onEditEmailSuccess = new EventEmitter<any>();
  @Output() onEditPhoneSuccess = new EventEmitter<any>();
  @Output() onEditAddressSuccess = new EventEmitter<any>();

  public displayWebsiteModal = false;

  public displayEmailModal = false;
  public selectedEmail: Email;

  public displayPhoneModal = false;
  public selectedPhone: Phone;

  public displayAddressModal = false;
  public selectedAddress: Address;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
  }

  openWebsiteModal() {
    this.displayWebsiteModal = true;
  }

  onEditWebsite() {
    this.openWebsiteModal();
  }

  emitEditWebsiteSuccess() {
    this.onEditWebsiteSuccess.emit();
    this.displayWebsiteModal = false;
  }

  onDeleteWebsite() {
    if (confirm('¿Seguro deseas eliminar el sitio web?')) {
      this.companyService.deleteCompanyWebsite(this.companyId)
        .subscribe(() => this.onEditWebsiteSuccess.emit());
    }
  }

  openEmailModal(selectedEmail?) {
    this.selectedEmail = selectedEmail ? selectedEmail : new Email();
    this.displayEmailModal = true;
  }

  onEditEmail(email: Email) {
    this.openEmailModal(email);
  }

  emitEditEmailSuccess() {
    this.onEditEmailSuccess.emit();
    this.displayEmailModal = false;
  }

  onDeleteEmail(email: Email) {
    if (confirm('¿Seguro deseas eliminar el email?')) {
      this.companyService.deleteCompanyEmail(this.companyId, email.id)
        .subscribe(() => this.onEditEmailSuccess.emit());
    }
  }

  openPhoneModal(selectedPhone?) {
    this.selectedPhone = selectedPhone ? selectedPhone : new Phone();
    this.displayPhoneModal = true;
  }

  onEditPhone(phone: Phone) {
    this.openPhoneModal(phone);
  }

  emitEditPhoneSuccess() {
    this.onEditPhoneSuccess.emit();
    this.displayPhoneModal = false;
  }

  onDeletePhone(phone: Phone) {
    if (confirm('¿Seguro deseas eliminar el teléfono?')) {
      this.companyService.deleteCompanyPhone(this.companyId, phone.id)
        .subscribe(() => this.onEditPhoneSuccess.emit());
    }
  }

  openAddressModal(selectedAddress?) {
    this.selectedAddress = selectedAddress ? selectedAddress : new Address();
    this.displayAddressModal = true;
  }

  onEditAddress(address: Address) {
    this.openAddressModal(address);
  }

  emitEditAddressSuccess() {
    this.onEditAddressSuccess.emit();
    this.displayAddressModal = false;
  }

  onDeleteAddress(address: Address) {
    if (confirm('¿Seguro deseas eliminar la dirección?')) {
      this.companyService.deleteCompanyAddress(this.companyId, address.id)
        .subscribe(() => this.onEditAddressSuccess.emit());
    }
  }

  getWebsite() {
    return new Website({website: this.website});
  }
}
