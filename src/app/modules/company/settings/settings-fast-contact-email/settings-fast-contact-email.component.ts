import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import swal from 'sweetalert';
import {FastContactEmail} from '@app/models/fast-contact-email.model';
import {CompanyService} from '@app/api/company-service/company.service';

@Component({
  selector: 'app-settings-fast-contact-email',
  templateUrl: './settings-fast-contact-email.component.html',
  styleUrls: ['./settings-fast-contact-email.component.scss']
})
export class SettingsFastContactEmailComponent implements OnInit {

  @Input() fastContactEmails: FastContactEmail[];
  @Input() companyId: number;

  @Output() onFastContactEmailDeleteSuccess = new EventEmitter<any>();
  @Output() onFastContactEmailEditSuccess = new EventEmitter<any>();

  public displayFastContactEmailModal = false;
  public selectedFastContactEmail: FastContactEmail = new FastContactEmail();

  public requesting = false;

  constructor(private companyService: CompanyService) {
  }

  ngOnInit() {
  }

  openModal(fastContactEmail?: FastContactEmail) {
    if (fastContactEmail) this.selectedFastContactEmail = fastContactEmail;
    this.displayFastContactEmailModal = true;
  }

  onHideModal() {
    this.displayFastContactEmailModal = false;
    this.selectedFastContactEmail = new FastContactEmail();
  }

  deleteFastContactEmail(email: FastContactEmail) {
    if (this.requesting) return;

    swal({
      title: '¿Está seguro que desea eliminar la plantilla de email?',
      text: 'Si acepta se eliminará la plantilla de email rápido.',
      icon: 'info',
      buttons: ['Cancelar', 'Aceptar'],
      dangerMode: true,
    }).then((value) => {
      if (value) {
        this.companyService.deleteCompanyFastContactEmail(this.companyId, email.id)
          .finally(() => this.requesting = false)
          .subscribe(() => this.onFastContactEmailDeleteSuccess.emit());
      }
    });
  }

  emitFastContactEmailEditSuccess() {
    this.onHideModal();
    this.onFastContactEmailEditSuccess.emit();
  }
}
