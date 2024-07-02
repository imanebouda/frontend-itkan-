import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { ListTableuauResultIndicateurComponent } from './tableuau-result-indicateur/list-tableuau-result-indicateur/list-tableuau-result-indicateur.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:DashboardComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '',
                        pathMatch: 'full',
                    },
                    {
                        path: '',
                        component:ListTableuauResultIndicateurComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Résultat Indicateurs-Consulter'},
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class DashboardsRoutingModule { }
