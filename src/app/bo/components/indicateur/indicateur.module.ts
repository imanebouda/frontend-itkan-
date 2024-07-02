import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListIndicateurComponent } from './crud-indicateur/list-indicateur/list-indicateur.component';
import { AddIndicateurComponent } from './crud-indicateur/add-indicateur/add-indicateur.component';
import { DetailIndicateurComponent } from './crud-indicateur/detail-indicateur/detail-indicateur.component';
import { AddRsultatIndicateurComponent } from './crud-ResultatIndicateur/add-rsultat-indicateur/add-rsultat-indicateur.component';
import { ListRsultatIndicateurComponent } from './crud-ResultatIndicateur/list-rsultat-indicateur/list-rsultat-indicateur.component';
import { DetailRsultatIndicateurComponent } from './crud-ResultatIndicateur/detail-rsultat-indicateur/detail-rsultat-indicateur.component';
import { NgxPrintModule } from 'ngx-print';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultatIndicateurRoutingModule } from './resultat-indicateur-routing.module';
import { UpdateIndicateurComponent } from './crud-indicateur/update-indicateur/update-indicateur.component';
import { UpdateResultatIndicateurComponent } from './crud-ResultatIndicateur/update-resultat-indicateur/update-resultat-indicateur.component';


@NgModule({
  declarations: [
    ListIndicateurComponent,
    AddIndicateurComponent,
    DetailIndicateurComponent,
    AddRsultatIndicateurComponent,
    ListRsultatIndicateurComponent,
    DetailRsultatIndicateurComponent,
    UpdateIndicateurComponent,
    UpdateResultatIndicateurComponent
  ],
  imports: [ 
    CommonModule,
    NgxPrintModule,
    SharedModule,
    ResultatIndicateurRoutingModule,
  ]
})
export class IndicateurModule { }
