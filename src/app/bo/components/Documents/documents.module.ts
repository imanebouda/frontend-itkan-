import { LOCALE_ID, NgModule } from '@angular/core';
import localeFr from '@angular/common/locales/fr';
import { CommonModule, DatePipe, registerLocaleData } from '@angular/common';
import { SharedModule } from 'primeng/api';
import { NgxPrintModule } from 'ngx-print';

registerLocaleData(localeFr, 'fr');
@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        NgxPrintModule,
    ],
    providers: [{ provide: LOCALE_ID, useValue: "fr-FR" }, DatePipe]
})
export class DocumentModule { }
