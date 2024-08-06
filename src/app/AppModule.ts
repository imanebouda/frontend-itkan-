import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './bo/components/notfound/notfound.component';
import { CountryService } from './bo/service/country.service';
import { CustomerService } from './bo/service/customer.service';
import { EventService } from './bo/service/event.service';
import { IconService } from './bo/service/icon.service';
import { NodeService } from './bo/service/node.service';
import { PhotoService } from './bo/service/photo.service';
import { SharedModule } from './shared/shared.module';
import { MessageService } from 'primeng/api';
import { FileUploadModule } from 'primeng/fileupload';
import { NgxPrintModule } from 'ngx-print';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID } from '@angular/core';
import { ProcedureComponent } from './bo/components/procedure/procedure.component';
import { ProcObjectifsComponent } from './bo/components/proc-objectifs/proc-objectifs.component';
import { IndicateurComponent } from './bo/components/indicateur/indicateur.component';
import { LeadershipComponent } from './bo/components/leadership/leadership.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HomeComponent } from './bo/components/home/home.component';
import { AddAuditComponent } from './bo/components/audit/add-audit/add-audit.component';
import { ListAuditComponent } from './bo/components/audit/list-audit/list-audit.component';
import { UpdateAuditComponent } from './bo/components/audit/update-audit/update-audit.component';
import { AddConstatComponent } from './bo/components/Constat/add-constat/add-constat.component';
//import { ListConstatComponent } from './bo/components/Constat/list-constat/list-constat.component';
//import { UpdateConstatComponent } from './bo/components/Constat/update-constat/update-constat.component';
import { AddSiteAuditComponent } from './bo/components/site-audit/add-site-audit/add-site-audit.component';
import { ListSiteAuditComponent } from './bo/components/site-audit/list-site-audit/list-site-audit.component';
import { UpdateSiteAuditComponent } from './bo/components/site-audit/update-site-audit/update-site-audit.component';
import { UpdateCheckListComponent } from './bo/components/question/update-check-list/update-check-list.component';
import { AddCheckListComponent } from './bo/components/question/add-check-list/add-check-list.component';
import { ListCheckListComponent } from './bo/components/question/list-check-list/list-check-list.component';
import { GestionAuditModule } from "./bo/components/audit/gestion-audit/gestion-audit.module";
import { DropdownModules } from "./bo/components/audit/dropdown/dropdown.module";

import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { MessageModule } from 'primeng/message';
import { TooltipModule } from 'primeng/tooltip';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {DetailAuditComponent} from "./bo/components/audit/detail-audit/detail-audit.component";
import {ProgrammeAuditComponent} from "./bo/components/audit/programme-audit/programme-audit.component";
import { ListChecklistComponent } from './bo/components/check_list/list-check-list/list-check-list.component';
import { AddChecklistComponent } from './bo/components/check_list/add-check-list/add-check-list.component';
import { UpdateChecklistComponent } from './bo/components/check_list/update-check-list/update-check-list.component';
import { ListReclamationsComponent } from './bo/components/reclamations/list-reclamations/list-reclamations.component';
import { HttpClientModule } from '@angular/common/http';
import { ReclamationService } from './services/reclamations/reclamations.service';
import { ReclamationDetailsComponent } from './bo/components/reclamations/reclamation-details/reclamation-details.component';
import { CalendarModule } from 'primeng/calendar';
registerLocaleData(localeFr);

@NgModule({
    declarations: [
        AppComponent,
        ReclamationDetailsComponent,
        UpdateChecklistComponent,
        AppComponent,
        AddChecklistComponent,
        AddCheckListComponent,
        ListChecklistComponent,
        UpdateCheckListComponent,
        ListCheckListComponent,
        HomeComponent,
        NotfoundComponent,
        ProcObjectifsComponent,
        ProcedureComponent,
        IndicateurComponent,
        LeadershipComponent,
        AddAuditComponent,
        ListAuditComponent,
        UpdateAuditComponent,
        AddConstatComponent,
        /* ListConstatComponent, UpdateConstatComponent,*/
        AddSiteAuditComponent,
        ListSiteAuditComponent,
        UpdateSiteAuditComponent,
        DetailAuditComponent,
        ProgrammeAuditComponent,
        ListReclamationsComponent
    ],
    imports: [
        FormsModule,
        CalendarModule,
        AppRoutingModule,
        AppLayoutModule,
        SharedModule,
        NgxPrintModule,
        BrowserAnimationsModule,
        FileUploadModule,
        NgxExtendedPdfViewerModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule, // Ajoutez cette ligne
        DialogModule,
        ButtonModule,
        RippleModule,
        InputTextModule,
        DropdownModule,
        MessageModule,
        TooltipModule,
        HttpClientModule
    // PrimeNG modules
        
        //GestionAuditModule
       // GestionAuditModule,
       // DropdownModules
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
        { provide: LocationStrategy, useClass: HashLocationStrategy }, // Correction ici
        CountryService,
        CustomerService,
        EventService,
        IconService,
        NodeService,
        PhotoService,
        MessageService,
        ReclamationService

    ],
    bootstrap: [AppComponent],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
}
