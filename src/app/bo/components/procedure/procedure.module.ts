import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AddProcedureComponent } from './crud-procedure/add-procedure/add-procedure.component';
import { UpdateProcedureComponent } from './crud-procedure/update-procedure/update-procedure.component';
import { ListProcedureComponent } from './crud-procedure/list-procedure/list-procedure.component';
import { DetailProcedureComponent } from './crud-procedure/detail-procedure/detail-procedure.component';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcedureRoutingModule } from './procedure-routing.module';
import { AddProcDocumentsComponent } from './crud-procedure-documents/add-proc-documents/add-proc-documents.component';
import { UpdateProcDocumentsComponent } from './crud-procedure-documents/update-proc-documents/update-proc-documents.component';
import { AddProcDocumentsTlComponent } from './crud-procedure-documents/add-proc-documents-tl/add-proc-documents-tl.component';

@NgModule({
  declarations: [
    AddProcedureComponent,
    UpdateProcedureComponent,
    ListProcedureComponent,
    DetailProcedureComponent,
    AddProcDocumentsComponent,
    UpdateProcDocumentsComponent,
    AddProcDocumentsTlComponent
  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    SharedModule,
    ProcedureRoutingModule,
  ],
  providers:[
    DatePipe
  ]
})
export class ProcedureModule { }

