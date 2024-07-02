import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard.component';
import { ChartModule } from 'primeng/chart';
import { MenuModule } from 'primeng/menu';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { StyleClassModule } from 'primeng/styleclass';
import { PanelMenuModule } from 'primeng/panelmenu';
import { SharedModule } from 'src/app/shared/shared.module';
import { DashboardsRoutingModule } from './dashboard-routing.module';
import { ListTableuauResultIndicateurComponent } from './tableuau-result-indicateur/list-tableuau-result-indicateur/list-tableuau-result-indicateur.component';
import { AddTableuauResultIndicateurComponent } from './tableuau-result-indicateur/add-tableuau-result-indicateur/add-tableuau-result-indicateur.component';
import { UpdateTableuauResultIndicateurComponent } from './tableuau-result-indicateur/update-tableuau-result-indicateur/update-tableuau-result-indicateur.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ChartModule,
        MenuModule,
        TableModule,
        StyleClassModule,
        PanelMenuModule,
        ButtonModule,
        SharedModule,
        DashboardsRoutingModule
    ],
    declarations: [DashboardComponent , ListTableuauResultIndicateurComponent , AddTableuauResultIndicateurComponent, UpdateTableuauResultIndicateurComponent ],
})
export class DashboardModule {}
