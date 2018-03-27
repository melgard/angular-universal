import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {SimpleUploadFileComponent} from '../../../shared/modals/simple-upload-file/simple-upload-file.component';
import {BsModalRef, BsModalService} from 'ngx-bootstrap';
import {API as companyRoutes} from '@app/api/company-service/routes';
import {AppConfig} from '@app/app-config';
import {Company} from '@app/models/company.model';


@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrls: ['./settings-profile.component.scss']
})
export class SettingsProfileComponent implements OnInit {

  @Input() company: Company;
  @Output() onImageUpdated = new EventEmitter<any>();
  @Output() onImageDeleted = new EventEmitter<any>();
  @Output() onEditCompanySuccess = new EventEmitter<any>();

  public noImage = AppConfig.COMPANY_NO_IMAGE;
  modalRef: BsModalRef;

  public displayCompanyModal = false;

  constructor(private modalService: BsModalService) {
  }

  ngOnInit() {
  }

  showPostSimpleUploadFileModal() {
    this.modalRef = this.modalService.show(SimpleUploadFileComponent, {class: 'modal-sm'});
    this.modalRef.content.uploadFileUrl = companyRoutes.post.companyLogo(this.company.id);
    this.modalRef.content.deleteFileUrl = companyRoutes.delete.companyLogo(this.company.id);
    this.modalRef.content.uploadFieldName = `image`;
    this.modalRef.content.modalTitle = 'Editar foto de perfil';
    this.modalRef.content.selectFileText = 'Seleccionar imagen';
    this.modalRef.content.uploadFileText = 'Subir imagen';
    this.modalRef.content.deleteFileText = 'Eliminar imagen de perfil';
    this.modalRef.content.onUploadSuccess = () => this.onImageUpdated.emit();
    this.modalRef.content.onDeleteSuccess = () => this.onImageDeleted.emit();
  }

  openCompanyModal() {
    this.displayCompanyModal = true;
  }

  emitEditCompanySuccess() {
    this.onEditCompanySuccess.emit();
    this.displayCompanyModal = false;
  }
}
