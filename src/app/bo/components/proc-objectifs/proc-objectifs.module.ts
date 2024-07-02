import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProcObjectifsComponent } from './crud-procObjectifs/list-proc-objectifs/list-proc-objectifs.component';
import { AddProcObjectifsComponent } from './crud-procObjectifs/add-proc-objectifs/add-proc-objectifs.component';
import { UpdateProcObjectifsComponent } from './crud-procObjectifs/update-proc-objectifs/update-proc-objectifs.component';
import { DetailProcObjectifsComponent } from './crud-procObjectifs/detail-proc-objectifs/detail-proc-objectifs.component';
import { StyleClassModule } from 'primeng/styleclass';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProcObjectifsRoutingModule } from './proc-objectifs-routing.module';



@NgModule({
  declarations: [
    ListProcObjectifsComponent,
    AddProcObjectifsComponent,
    UpdateProcObjectifsComponent,
    DetailProcObjectifsComponent
  ],
  imports: [
    CommonModule,
    StyleClassModule,
    NgxPrintModule,
    SharedModule,
    ProcObjectifsRoutingModule
  ]
})
export class ProcObjectifsModule { }
