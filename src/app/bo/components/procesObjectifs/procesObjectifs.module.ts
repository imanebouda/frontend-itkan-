import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NgxPrintModule } from 'ngx-print';
import { ListProcesObjectifsComponent } from './procesObjectifs-crud/list-proces-objectifs/list-proces-objectifs.component';
import { ProcesObjectifsRoutingModule } from './procesObjectifs-routing.module';
import { AddProcesObjectifsComponent } from './procesObjectifs-crud/add-proces-objectifs/add-proces-objectifs.component';
import { UpdateProcesObjectifsComponent } from './procesObjectifs-crud/update-proces-objectifs/update-proces-objectifs.component';
import { StyleClassModule } from 'primeng/styleclass';
import { ProcesObjectifsComponent } from './procesObjectifs.component';
import { DetailProcesObjectifsComponent } from './procesObjectifs-crud/detail-proces-objectifs/detail-proces-objectifs.component';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    ProcesObjectifsComponent,
    ListProcesObjectifsComponent,
    AddProcesObjectifsComponent,
    UpdateProcesObjectifsComponent,
    DetailProcesObjectifsComponent,
    
  ],
  imports: [
    CommonModule,
    StyleClassModule,
    NgxPrintModule,
    SharedModule,
    ProcesObjectifsRoutingModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }, DatePipe]
})


export class ProcesObjectifsModule { }
