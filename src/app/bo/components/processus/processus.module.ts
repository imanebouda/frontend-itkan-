import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListProcessusComponent } from './processus-crud/list-processus/list-processus.component';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcessusRoutingModule } from './processus-routing.module';
import { AddProcessusComponent } from './processus-crud/add-processus/add-processus.component';
import { UpdateProcessusComponent } from './processus-crud/update-processus/update-processus.component';
import { DetaillProcessusComponent } from './processus-crud/detaill-processus/detaill-processus.component';
import { ProcessusComponent } from './processus.component';
import { AddProcesDocumentsComponent } from './crud-proces-documents/add-proces-documents/add-proces-documents.component';
import { UpdateProcesDocumentsComponent } from './crud-proces-documents/update-proces-documents/update-proces-documents.component';
import { ProcesObjectifsModule } from '../procesObjectifs/procesObjectifs.module';
import { ProcedureModule } from '../procedure/procedure.module';
import { ProcObjectifsModule } from '../proc-objectifs/proc-objectifs.module';



@NgModule({
  declarations: [
    ListProcessusComponent,
    AddProcessusComponent,
    UpdateProcessusComponent,
    DetaillProcessusComponent,
    ProcessusComponent,
    AddProcesDocumentsComponent,
    UpdateProcesDocumentsComponent
  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    SharedModule,
    ProcessusRoutingModule,
    ProcesObjectifsModule,
    ProcedureModule,
    ProcObjectifsModule

  ],
  providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }, DatePipe]
})
export class ProcessusModule { }
