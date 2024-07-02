import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DetailContexteComponent } from './crud-contexte/detail-contexte/detail-contexte.component';
import { AddPolitiqueQualiteComponent } from './crud-politique-qualite/add-politique-qualite/add-politique-qualite.component';
import { UpdatePolitiqueQualiteComponent } from './crud-politique-qualite/update-politique-qualite/update-politique-qualite.component';
import { DetailPolitiqueQualiteComponent } from './crud-politique-qualite/detail-politique-qualite/detail-politique-qualite.component';
import { AddManuelQualiteComponent } from './crud-manuel-qualite/add-manuel-qualite/add-manuel-qualite.component';
import { UpdateManuelQualiteComponent } from './crud-manuel-qualite/update-manuel-qualite/update-manuel-qualite.component';
import { DetailManuelQualiteComponent } from './crud-manuel-qualite/detail-manuel-qualite/detail-manuel-qualite.component';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { LeadershipRoutingModule } from './leadership-routing.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';



@NgModule({
  declarations: [
    DetailContexteComponent,
    AddPolitiqueQualiteComponent,
    UpdatePolitiqueQualiteComponent,
    DetailPolitiqueQualiteComponent,
    AddManuelQualiteComponent,
    UpdateManuelQualiteComponent,
    DetailManuelQualiteComponent,
    PdfViewerComponent,
  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    SharedModule,
    LeadershipRoutingModule,
    NgxExtendedPdfViewerModule,

  ],
  providers: [
    DatePipe,
  ],
})
export class LeadershipModule { }
