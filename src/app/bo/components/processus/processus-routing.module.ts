import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { ProcessusComponent } from './processus.component';
import { ListProcessusComponent } from './processus-crud/list-processus/list-processus.component';
import { DetaillProcessusComponent } from './processus-crud/detaill-processus/detaill-processus.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:ProcessusComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list',
                        component:ListProcessusComponent ,
                        canActivate: [AutorisedGuard],
                         data: { role: 'Processus-Consulter'},
                    },
                    {
                        path: 'detail/:id',
                        component:DetaillProcessusComponent ,
                        canActivate: [AutorisedGuard],
                       data: { role: 'Processus-Détail'},
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class ProcessusRoutingModule { }
