// Angular
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// Modulos Terceros
import {CollapseModule, ModalModule, PopoverModule, TabsModule, TypeaheadModule} from 'ngx-bootstrap';
import {MomentModule} from 'angular2-moment';
import {ToastrModule} from 'ngx-toastr';
import {ANIMATION_TYPES, LoadingModule} from 'ngx-loading';
import {DragulaModule} from 'ng2-dragula';
import {Ng4GeoautocompleteModule} from 'ng4-geoautocomplete';
import {ChartsModule} from 'ng2-charts';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Modulos Propios
import {OfferRoutingModule} from './offer-routing.module';
import {SharedModule} from '../shared/shared.module';
// Componentes
import {OfferComponent} from './offer/offer.component';
import {ContainerComponent} from './user/container/container.component';
import {ActionSectionComponent} from './user/action-section/action-section.component';
import {DashboardComponent} from './company/dashboard/dashboard.component';
import {StatComponent} from './company/dashboard/stat/stat.component';
import {OffersTableComponent} from './company/dashboard/offers-table/offers-table.component';
import {OfferViewComponent} from './company/offer-view/offer-view.component';
import {NewOfferViewComponent} from './company/new-offer-view/new-offer-view.component';
import {EditOfferViewComponent} from './company/edit-offer-view/edit-offer-view.component';
import {OfferPreviewComponent} from './company/offer-preview/offer-preview.component';
import {DashboardDetailComponent} from './company/timeline/dashboard-detail/dashboard-detail.component';
import {PostulantProcessComponent} from './company/postulant-process/postulant-process.component';
import {PostulantInfoModalComponent} from './company/timeline/dashboard-detail/modals/postulant-info-modal/postulant-info-modal.component';
import {NewPhaseModalComponent} from './company/timeline/dashboard-detail/modals/new-phase-modal/new-phase-modal.component';
import {TimelineComponent} from './company/timeline-component/timeline.component';
import {SinResultadosComponent} from './company/timeline/dashboard-detail/sin-resultados/sin-resultados.component';
import {OfferDefinitionComponent} from './company/timeline/dashboard-detail/superior/offer-definition/offer-definition.component';
import {TimelineTabComponent} from './company/timeline/dashboard-detail/tabs/timeline-tab/timeline-tab.component';
import {TabPostulantesComponent} from './company/timeline/dashboard-detail/tabs/tab-postulantes/tab-postulantes.component';
import {TabRecomendadosComponent} from './company/timeline/dashboard-detail/tabs/tab-recomendados/tab-recomendados.component';
import {TabPreseleccionadosComponent} from './company/timeline/dashboard-detail/tabs/tab-preseleccionados/tab-preseleccionados.component';
import {TabAdquiridosComponent} from './company/timeline/dashboard-detail/tabs/tab-adquiridos/tab-adquiridos.component';
import {TabFormularioComponent} from './company/timeline/dashboard-detail/tabs/tab-formulario/tab-formulario.component';
import {TabTimelineComponent} from './company/timeline/dashboard-detail/tabs/tab-timeline/tab-timeline.component';
import {TimelineTabPanelComponent} from './company/timeline/dashboard-detail/tabs/timeline-tab-panel/timeline-tab-panel.component';
import {ProfileCardComponent} from './company/timeline/dashboard-detail/cards/profile-card/profile-card.component';
import {NombreAnimadoComponent} from './company/timeline/dashboard-detail/cards/nombre-animado/nombre-animado.component';
import {DesbloquearPerfilComponent} from './company/timeline/dashboard-detail/modals/desbloquear-perfil/desbloquear-perfil.component';
import {PhaseComunModalComponent} from './company/timeline/dashboard-detail/modals/phase-comun-modal/phase-comun-modal.component';
import {FirstPhaseModalComponent} from './company/timeline/dashboard-detail/modals/first-phase-modal/first-phase-modal.component';
import {SecondPhaseModalComponent} from './company/timeline/dashboard-detail/modals/second-phase-modal/second-phase-modal.component';
import {PruebasModalComponent} from './company/timeline/dashboard-detail/modals/pruebas-modal/pruebas-modal.component';
import {UserTimelineComponent} from './company/timeline/dashboard-detail/user-timeline/user-timeline.component';
import {HistoriaTypeZeroComponent} from './company/timeline/dashboard-detail/user-timeline/historia-type-zero.component';
import {HistoriaTypeEntrevistaComponent} from './company/timeline/dashboard-detail/user-timeline/historia-type-entrevista.component';
import {HistoriaTypePruebasComponent} from './company/timeline/dashboard-detail/user-timeline/historia-examns.component';
import {PerfilComponent} from './company/timeline/dashboard-detail/user-timeline/perfil.component';
import {TestMatchComponent} from './company/timeline/test-match/test-match.component';
import {ResumeUserComponent} from './company/timeline/resume-user/resume-user.component';
import {MatchPostulanteComponent} from './company/timeline/test-match/match-postulante.component';
import {MyAppliesComponent} from './user/my-applies/my-applies.component';
import {CardApplyComponent} from './user/my-applies/card-apply/card-apply.component';
import {OfferDataManagementComponent} from './company/dashboard/offer-data-management/offer-data-management.component';
import {ReactivationModalComponent} from './company/timeline/dashboard-detail/modals/reactivation-modal/reactivation-modal.component';
import {GraphComponent} from './company/timeline/test-match/graph/graph.component';
import {InfoGraphComponent} from './company/timeline/test-match/graph/info-graph.component';
import {OfferFilterComponent} from './company/offer-filters/offer-filters.component';
import {RefineOfferViewComponent} from './company/refine-offer-filters/refine-offer-filters.component';
import {SkillsComponent} from './company/components/skills/skills.component';
import {LanguageSkillComponent} from './company/components/language-skill/language-skill.component';
//Servicios
import {
  ApiService,
  AreaService,
  ContractKindService,
  HierarchyService,
  MyAppliesService,
  TimelineService,
  UtilsService,
} from '@app/services/index.services';
import {OfferCreateService} from '@app/modules/offer/company/services/offer-create.service';
import {PostulantInfoModalService} from './company/timeline/dashboard-detail/modals/postulant-info-modal/postulant-info-modal.service';
import {NewPhaseModalService} from './company/timeline/dashboard-detail/modals/new-phase-modal/new-phase-modal.service';
// Pipes
import {TruncatePipe} from './company/timeline/dashboard-detail/pipes/truncate-pipe.pipe';
import {InfoHoverComponent} from './company/timeline/dashboard-detail/tabs/tab-timeline/info-hover/info-hover.component';
import {PostulantesPipe} from './company/timeline/test-match/pipes/postulantes.pipe';


@NgModule({
  imports: [
    CommonModule,
    OfferRoutingModule,
    PopoverModule.forRoot(),
    DragulaModule,
    FormsModule,
    ReactiveFormsModule,
    MomentModule,
    SharedModule,
    ReactiveFormsModule,
    Ng4GeoautocompleteModule.forRoot(),
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      backdropBorderRadius: '4px',
      fullScreenBackdrop: true,
      primaryColour: '#ffffff',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    }),
    ToastrModule.forRoot(),
    TabsModule.forRoot(),
    ModalModule.forRoot(),
    TypeaheadModule.forRoot(),
    CollapseModule.forRoot(),
    ChartsModule,
    NgbModule.forRoot()

  ],
  entryComponents: [
    PostulantInfoModalComponent,
    NewPhaseModalComponent,
    DesbloquearPerfilComponent,
    PhaseComunModalComponent,
    FirstPhaseModalComponent,
    SecondPhaseModalComponent,
    PruebasModalComponent,
    ReactivationModalComponent
  ],
  declarations: [
    DashboardDetailComponent,
    OfferDefinitionComponent,
    OfferComponent,
    ContainerComponent,
    ActionSectionComponent,
    DashboardComponent,
    StatComponent,
    OffersTableComponent,
    OfferViewComponent,
    OfferFilterComponent,
    RefineOfferViewComponent,
    NewOfferViewComponent,
    EditOfferViewComponent,
    OfferPreviewComponent,
    ProfileCardComponent,
    PostulantProcessComponent,
    PostulantInfoModalComponent,
    NewPhaseModalComponent,
    TimelineComponent,
    OfferDataManagementComponent,
    SinResultadosComponent,
    NombreAnimadoComponent,
    TimelineTabPanelComponent,
    TimelineTabComponent,
    OfferDefinitionComponent,
    TabPostulantesComponent,
    TabRecomendadosComponent,
    TabPreseleccionadosComponent,
    TabAdquiridosComponent,
    TabFormularioComponent,
    TabTimelineComponent,
    TruncatePipe,
    InfoHoverComponent,
    DesbloquearPerfilComponent,
    PhaseComunModalComponent,
    FirstPhaseModalComponent,
    SecondPhaseModalComponent,
    PruebasModalComponent,
    UserTimelineComponent,
    HistoriaTypeZeroComponent,
    HistoriaTypeEntrevistaComponent,
    HistoriaTypePruebasComponent,
    PerfilComponent,
    TestMatchComponent,
    ResumeUserComponent,
    MatchPostulanteComponent,
    MyAppliesComponent,
    CardApplyComponent,
    ReactivationModalComponent,
    SkillsComponent,
    LanguageSkillComponent,
    ReactivationModalComponent,
    GraphComponent,
    InfoGraphComponent,
    PostulantesPipe
  ],
  providers: [
    ContractKindService,
    HierarchyService,
    AreaService,
    ApiService,
    TimelineService,
    UtilsService,
    PostulantInfoModalService,
    NewPhaseModalService,
    MyAppliesService,
    OfferCreateService
  ]
})
export class OfferModule {
}
