import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganismeComponent } from './organisme.component';
import { OrganismeInfoComponent } from './organisme-info/organisme-info.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: OrganismeComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'organismeinfo',
                        pathMatch: 'full',
                    },
                    {
                        path: 'organismeinfo',
                        component: OrganismeInfoComponent,
                    },
                    { path: '**', redirectTo: 'organismeinfo', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class OrganismesRoutingModule {}
