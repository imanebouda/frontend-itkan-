import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { IndicateurComponent } from './indicateur.component';
import { ListIndicateurComponent } from './crud-indicateur/list-indicateur/list-indicateur.component';
import { DetailIndicateurComponent } from './crud-indicateur/detail-indicateur/detail-indicateur.component';



@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:IndicateurComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list/:id',
                        component:ListIndicateurComponent ,
                       canActivate: [AutorisedGuard],
                       data: { role: 'Indicateurs-Consulter'},
                    },
                    {
                        path: 'detail/:id',
                        component:DetailIndicateurComponent ,
                       canActivate: [AutorisedGuard],
                       data: { role: 'Indicateurs-Détail'},
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class ResultatIndicateurRoutingModule { }
