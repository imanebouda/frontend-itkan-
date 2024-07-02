import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './library-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LibraryComponent } from './library.component';
import { ListLibraryComponent } from './list-library/list-library.component';
import { AddDocumentComponent } from './crud-documents/add-document/add-document.component';
import { UpdateDocumentProcedureComponent } from './crud-documents/update-document-procedure/update-document-procedure.component';
import { UpdateDocumentProcessusComponent } from './crud-documents/update-document-processus/update-document-processus.component';

@NgModule({
  declarations: [LibraryComponent, ListLibraryComponent, AddDocumentComponent, UpdateDocumentProcedureComponent, UpdateDocumentProcessusComponent],
  imports: [CommonModule, HomeRoutingModule, SharedModule],
})
export class LibraryModule { }
