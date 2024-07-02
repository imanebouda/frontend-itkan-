
import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgxPrintModule } from 'ngx-print';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { DocumentModule } from '../Documents/documents.module';
import { DeclarationComponent } from './declaration.component';
import { DeclarationListComponent } from './declaration-de-perte-crud/declaration-list/declaration-list.component';
import { AddDeclarationComponent } from './declaration-de-perte-crud/add-declaration/add-declaration.component';
import { UpdateDeclarationComponent } from './declaration-de-perte-crud/update-declaration/update-declaration.component';
import { ImportcsvDdpComponent } from './declaration-de-perte-crud/importcsv-ddp/importcsv-ddp.component';
import { DeclarationRoutingModule } from './declaration-routing.module';

registerLocaleData(localeFr, 'fr');
@NgModule({
    imports: [
        CommonModule,
        DeclarationRoutingModule,
        SharedModule,
        NgxPrintModule,
        DocumentModule
    ],
    declarations: [
        DeclarationComponent,
        DeclarationListComponent,
        AddDeclarationComponent,
        UpdateDeclarationComponent,
        ImportcsvDdpComponent,
    ],
    providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }, DatePipe]
})
export class DeclarationModule { }
