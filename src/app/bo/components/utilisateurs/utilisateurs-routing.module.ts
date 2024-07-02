import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UtilisateursComponent } from './utilisateurs.component';
import { RolesComponent } from './crud_roles/roles/roles.component';
import { ListeUtilisateursComponent } from './crud_utilisateurs/liste_utilisateurs/liste_utilisateurs.component';
import { PermissionsComponent } from './permissions/permissions.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: UtilisateursComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'liste',
                        pathMatch: 'full',
                    },
                    {
                        path: 'liste',
                        component: ListeUtilisateursComponent,
                    },
                    {
                        path: 'roles',
                        component: RolesComponent,
                    },
                    {
                        path: 'permissions',
                        component: PermissionsComponent,
                    },
                    { path: '**', redirectTo: 'liste', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class UtilisateursRoutingModule {}
