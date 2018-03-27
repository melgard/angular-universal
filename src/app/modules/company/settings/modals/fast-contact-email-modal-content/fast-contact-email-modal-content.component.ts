import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {
  FastContactEmailParserService,
  IFastContactVariablesValue
} from '../../../../shared/services/fast-contact-email-parser/fast-contact-email-parser.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import swal from 'sweetalert';
import {FastContactEmail} from '@app/models/fast-contact-email.model';
import {CompanyService} from '@app/api/company-service/company.service';
import {FastContactEmailVariable} from '@app/models/fast-contact-email-variable.model';

@Component({
  selector: 'app-fast-contact-email-modal-content',
  templateUrl: './fast-contact-email-modal-content.component.html',
  styleUrls: ['./fast-contact-email-modal-content.component.scss']
})
export class FastContactEmailModalContentComponent implements OnInit, OnDestroy {

  @Input() fastContactEmail: FastContactEmail = new FastContactEmail();
  @Input() companyId: number;

  @Output() saveSuccess = new EventEmitter<any>();

  public sendingForm = false;
  public fastContactEmailForm: FormGroup;

  private createdVariables: IFastContactVariablesValue[] = [];
  private subscriptions: Subscription[] = [];

  constructor(private fb: FormBuilder,
              private companyService: CompanyService,
              private fastContactEmailParserService: FastContactEmailParserService) {

  }

  ngOnInit() {
    this.fastContactEmailParserService.clearVariables();

    this.fastContactEmailForm = this.fb.group({
      'title': [this.fastContactEmail.title || '', [Validators.required]],
      'subject': [this.fastContactEmail.subject || '', [Validators.required]],
      'content': [this.fastContactEmail.content || '', [Validators.required]],
      'signature': [this.fastContactEmail.signature || '', [Validators.required]],
    });

    const types = this.fastContactEmailParserService.getFastContactVariables();
    this.fastContactEmail.variables.forEach(v =>
      this.fastContactEmailParserService.createVariable(v.name, types.find(t => t.value === v.type))
    );

    this.subscriptions.push(
      this.fastContactEmailParserService.getVariables().subscribe(v => this.createdVariables = v)
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  formIsValid() {
    return this.fastContactEmailParserService.allVariablesUsed(this.getFastContactEmail(this.fastContactEmailForm.value)) && this.fastContactEmailForm.valid;
  }

  onSubmit() {
    swal({
      title: '¿Está seguro?',
      text: 'Si acepta se guardará la plantilla de email rápido.',
      icon: 'info',
      buttons: ['Cancelar', 'Guardar'],
      dangerMode: true,
    })
      .then((value) => {
        if (value) {
          this.sendingForm = true;
          const toSaveFastContactEmail = this.getFastContactEmail(this.fastContactEmailForm.value);
          this.fastContactEmailForm.reset();
          this.fastContactEmailParserService.clearVariables();

          if (this.fastContactEmail.id) {
            const fastContactEmailId = this.fastContactEmail.id;
            toSaveFastContactEmail.id = fastContactEmailId;

            this.companyService.putCompanyFastContactEmail(this.companyId, fastContactEmailId, toSaveFastContactEmail)
              .finally(() => this.sendingForm = false)
              .subscribe(() => this.saveSuccess.emit());
          } else {
            this.companyService.postCompanyFastContactEmail(this.companyId, toSaveFastContactEmail)
              .finally(() => this.sendingForm = false)
              .subscribe(() => this.saveSuccess.emit());
          }

        }
      });
  }

  onDrop(event, formValue) {
    const variableString = event.dragData;
    const currentInputText = this.fastContactEmailForm.get(formValue).value;
    this.fastContactEmailForm.get(formValue).setValue(currentInputText + variableString);
  }

  onRemoveVariable(variable: string) {
    const formControls = this.fastContactEmailForm.controls;

    Object.keys(formControls).forEach((key) => {
      const formControlValue = this.fastContactEmailForm.get(key);

      if (typeof  formControlValue.value === 'string') formControlValue.setValue(formControlValue.value.replace(variable, ''));
    });
  }

  private getFastContactEmail(values: any): FastContactEmail {
    const fastContactEmail = new FastContactEmail(values);
    fastContactEmail.variables = this.createdVariables.map(cv => {
      const variable = new FastContactEmailVariable(cv);
      variable.type = cv.value;

      return variable;
    });
    return fastContactEmail;
  }
}
