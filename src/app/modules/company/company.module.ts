import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CompanyRoutingModule} from './company-routing.module';
import {ModalModule, TypeaheadModule} from 'ngx-bootstrap';
// Declarations
import {SettingsContainerComponent} from './settings/settings-container/settings-container.component';
import {SettingsProfileComponent} from './settings/settings-profile/settings-profile.component';
import {SettingsSelectorsComponent} from './settings/settings-selectors/settings-selectors.component';
import {SettingsPerksComponent} from './settings/settings-perks/settings-perks.component';

import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {SettingsContactComponent} from './settings/settings-contact/settings-contact.component';
import {WebsiteModalContentComponent} from './settings/modals/website-modal-content/website-modal-content.component';
import {ConfirmationService, ConfirmDialogModule, DialogModule} from 'primeng/primeng';
import {EmailModalContentComponent} from './settings/modals/email-modal-content/email-modal-content.component';
import {PhoneModalContentComponent} from './settings/modals/phone-modal-content/phone-modal-content.component';
import {Ng4GeoautocompleteModule} from 'ng4-geoautocomplete';
import {AddressModalContentComponent} from './settings/modals/address-modal-content/address-modal-content.component';
import {CompanyInfoModalContentComponent} from './settings/modals/company-info-modal-content/company-info-modal-content.component';
import {AddSelectorModalContentComponent} from './settings/modals/add-selector-modal-content/add-selector-modal-content.component';
import {SettingsPrivacyComponent} from './settings/settings-privacy/settings-privacy.component';
import {CompanyPerksModalContentComponent} from './settings/modals/company-perks-modal-content/company-perks-modal-content.component';
import {CompanyPerksListComponent} from './settings/components/company-perks-list/company-perks-list.component';
import {SettingsFastContactEmailComponent} from './settings/settings-fast-contact-email/settings-fast-contact-email.component';
import {FastContactEmailModalContentComponent} from './settings/modals/fast-contact-email-modal-content/fast-contact-email-modal-content.component';
import {FastContactEmailAddVariablesComponent} from './settings/modals/fast-contact-email-modal-content/fast-contact-email-add-variables/fast-contact-email-add-variables.component';
import {FastContactEmailVariableListComponent} from './settings/modals/fast-contact-email-modal-content/fast-contact-email-variable-list/fast-contact-email-variable-list.component';
import {FastContactEmailParserService} from '../shared/services/fast-contact-email-parser/fast-contact-email-parser.service';
import {DndModule} from 'ng2-dnd';

@NgModule({
  imports: [
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    DndModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      backdropBorderRadius: '4px',
      fullScreenBackdrop: true,
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    Ng4GeoautocompleteModule.forRoot(),
    TypeaheadModule.forRoot(),
    DialogModule,
    ConfirmDialogModule,
    ModalModule.forRoot(),
    CompanyRoutingModule
  ],
  providers: [ConfirmationService, FastContactEmailParserService],
  declarations: [
    SettingsContainerComponent, SettingsProfileComponent,
    SettingsSelectorsComponent, SettingsPerksComponent,
    SettingsContactComponent, WebsiteModalContentComponent,
    EmailModalContentComponent, PhoneModalContentComponent,
    AddressModalContentComponent, CompanyInfoModalContentComponent,
    AddSelectorModalContentComponent, SettingsPrivacyComponent,
    CompanyPerksModalContentComponent,
    CompanyPerksListComponent,
    SettingsFastContactEmailComponent,
    FastContactEmailModalContentComponent,
    FastContactEmailAddVariablesComponent,
    FastContactEmailVariableListComponent
  ]
})
export class CompanyModule {
}
