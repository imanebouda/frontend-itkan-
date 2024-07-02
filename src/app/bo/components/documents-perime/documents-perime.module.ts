import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DocumentsPerimeComponent } from './documents-perime.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPrintModule } from 'ngx-print';
import { StyleClassModule } from 'primeng/styleclass';
import { DocumentsPerimeRoutingModule } from './documents-perime-routing.module';
import { ListDocumentPerimeComponent } from './crud-documents-perime/list-document-perime/list-document-perime.component';
import { DetailDocumentPerimeComponent } from './crud-documents-perime/detail-document-perime/detail-document-perime.component';

@NgModule({
  declarations: [
    DocumentsPerimeComponent,
    ListDocumentPerimeComponent,
    DetailDocumentPerimeComponent,
  ],
  imports: [
    CommonModule,
    StyleClassModule,
    NgxPrintModule,
    SharedModule,
    DocumentsPerimeRoutingModule
  ]
})
export class DocumentsPerimeModule { }
