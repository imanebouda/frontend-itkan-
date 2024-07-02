import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DeclarationComponent } from './declaration.component';
import { DeclarationListComponent } from './declaration-de-perte-crud/declaration-list/declaration-list.component';
import { ImportcsvDdpComponent } from './declaration-de-perte-crud/importcsv-ddp/importcsv-ddp.component';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: DeclarationComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list',
                        component: DeclarationListComponent,
                        canActivate: [AutorisedGuard],
                        data: { role: 'Déclarations-Consulter'},
                    },
                    {
                        path: 'import',
                        component: ImportcsvDdpComponent,
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class DeclarationRoutingModule { }


