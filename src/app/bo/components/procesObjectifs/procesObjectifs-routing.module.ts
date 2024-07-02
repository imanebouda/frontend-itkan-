import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { ListProcesObjectifsComponent } from './procesObjectifs-crud/list-proces-objectifs/list-proces-objectifs.component';
import { ProcesObjectifsComponent } from './procesObjectifs.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:ProcesObjectifsComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list/:id',
                        component:ListProcesObjectifsComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Processus Objectifs-Consulter'},
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class ProcesObjectifsRoutingModule { }
