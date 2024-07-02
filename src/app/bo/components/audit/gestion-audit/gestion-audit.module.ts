import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionAuditComponent } from './gestion-audit.component';
import { TableModule } from 'primeng/table';
import {NgxPrintModule} from "ngx-print";
import {SharedModule} from "../../../../shared/shared.module";
import {ProcessusRoutingModule} from "../../processus/processus-routing.module";
import {ProcesObjectifsModule} from "../../procesObjectifs/procesObjectifs.module";
import {ProcedureModule} from "../../procedure/procedure.module";
import {ProcObjectifsModule} from "../../proc-objectifs/proc-objectifs.module"; // Importez TableModule depuis PrimeNG

@NgModule({
    declarations: [
        GestionAuditComponent
    ],
    imports: [
        CommonModule,
        CommonModule,
        NgxPrintModule,
        SharedModule,
        ProcessusRoutingModule,
        ProcesObjectifsModule,
        ProcedureModule,
        ProcObjectifsModule
    ],
    exports: [
        GestionAuditComponent
    ]
})
export class GestionAuditModule { }
