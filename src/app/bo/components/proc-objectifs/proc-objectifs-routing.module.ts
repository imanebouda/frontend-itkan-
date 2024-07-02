import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { ProcObjectifsComponent } from './proc-objectifs.component';
import { ListProcObjectifsComponent } from './crud-procObjectifs/list-proc-objectifs/list-proc-objectifs.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:ProcObjectifsComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list/:id',
                        component:ListProcObjectifsComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Procédures Objectifs-Consulter'},
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class ProcObjectifsRoutingModule { }
