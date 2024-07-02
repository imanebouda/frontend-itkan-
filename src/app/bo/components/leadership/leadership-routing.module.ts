import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { DetailPolitiqueQualiteComponent } from './crud-politique-qualite/detail-politique-qualite/detail-politique-qualite.component';
import { DetailManuelQualiteComponent } from './crud-manuel-qualite/detail-manuel-qualite/detail-manuel-qualite.component';
import { LeadershipComponent } from './leadership.component';
import { DetailContexteComponent } from './crud-contexte/detail-contexte/detail-contexte.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:LeadershipComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'Contexte',
                        pathMatch: 'full',
                    },
                    {
                        path: 'Contexte',
                        component:DetailContexteComponent ,
                    },
                    {
                        path: 'Politique-Qualite',
                        component:DetailPolitiqueQualiteComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Politique Qualité-Consulter'},
                    },
                    {
                        path: 'Manuel-Qualite',
                        component:DetailManuelQualiteComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Manuel Qualité-Consulter'},
                    },
                    { path: '**', redirectTo: 'Contexte', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class LeadershipRoutingModule { }
