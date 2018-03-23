import {Component, OnInit} from '@angular/core';
import {BsModalRef} from 'ngx-bootstrap';
import {Http} from '@angular/http';

@Component({
  selector: 'app-simple-upload-file',
  templateUrl: './simple-upload-file.component.html',
  styleUrls: ['./simple-upload-file.component.scss']
})
export class SimpleUploadFileComponent implements OnInit {

  public uploadFieldName = '';
  public uploadFileUrl;
  public deleteFileUrl;
  public modalTitle = '';
  public selectFileText = '';
  public deleteFileText = '';
  public uploadFileText = '';
  public onUploadSuccess;
  public onDeleteSuccess;
  public loading = false;

  constructor(public bsModalRef: BsModalRef,
              private http: Http) {
  }

  ngOnInit() {
  }

  close() {
    this.bsModalRef.hide();
  }

  onUpload(object: { files: File[] }) {
    this.loading = true;
    const file: File = object.files.pop();

    const formData = new FormData();
    formData.append('image', file, file.name);

    this.http.post(this.uploadFileUrl, formData)
      .finally(() => this.loading = false)
      .subscribe(() => {
        if (this.onUploadSuccess && typeof this.onUploadSuccess === 'function') this.onUploadSuccess();
        this.close();
      });
  }

  onDeleteClick() {
    this.loading = true;
    this.http.delete(this.deleteFileUrl)
      .finally(() => this.loading = false)
      .subscribe(() => {
        if (this.onDeleteSuccess && typeof this.onDeleteSuccess === 'function') this.onDeleteSuccess();
        this.close();
      });
  }
}
