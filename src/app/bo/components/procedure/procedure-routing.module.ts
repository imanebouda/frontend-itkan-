import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { ProcedureComponent } from './procedure.component';
import { ListProcedureComponent } from './crud-procedure/list-procedure/list-procedure.component';
import { DetailProcedureComponent } from './crud-procedure/detail-procedure/detail-procedure.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:ProcedureComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list',
                        component:ListProcedureComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Procédure-Consulter'},
                    },
                    {
                        path: 'detail/:id',
                        component:DetailProcedureComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Procédure-Détail'},
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class ProcedureRoutingModule { }
