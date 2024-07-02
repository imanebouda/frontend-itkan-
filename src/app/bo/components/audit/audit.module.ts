import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ListAuditComponent } from './list-audit/list-audit.component'; // Import du composant ListAuditComponent
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { AuditRoutingModule } from './audit-routing.module'; // Import du fichier de routage pour l'audit
import { AddAuditComponent } from './add-audit/add-audit.component'; // Import du composant AddAuditComponent
import { UpdateAuditComponent } from './update-audit/update-audit.component';
import { GestionAuditComponent } from './gestion-audit/gestion-audit.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { ProgrammeAuditComponent } from './programme-audit/programme-audit.component'; // Import du composant UpdateAuditComponent

@NgModule({
    declarations: [


    
   // GestionAuditComponent,
          // DropdownComponent,
           ProgrammeAuditComponent
  ],
    imports: [
        CommonModule,
        NgxPrintModule,
        SharedModule,
        AuditRoutingModule, // Utilisation du module de routage pour l'audit
    ],
    providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }, DatePipe]
})
export class AuditModule { }

