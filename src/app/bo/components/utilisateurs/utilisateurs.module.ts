import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilisateursRoutingModule } from './utilisateurs-routing.module';
import { UtilisateursComponent } from './utilisateurs.component';
import { ListeUtilisateursComponent } from './crud_utilisateurs/liste_utilisateurs/liste_utilisateurs.component';
import { UpdateUtilisateurComponent } from './crud_utilisateurs/utilisateurs_update/utilisateurs_update.component';
import { RolesComponent } from './crud_roles/roles/roles.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PermissionsComponent } from './permissions/permissions.component';
import { AjoutUtilisateurComponent } from './crud_utilisateurs/utilisateurs_ajout/utilisateurs_ajout.component';
import { AjoutRoleComponent } from './crud_roles/role_ajout/role_ajout.component';
import { UpdateRoleComponent } from './crud_roles/role_update/role_update.component';

@NgModule({
    imports: [CommonModule, UtilisateursRoutingModule, SharedModule],
    declarations: [
        UtilisateursComponent,
        ListeUtilisateursComponent,
        AjoutUtilisateurComponent,
        UpdateUtilisateurComponent,
        RolesComponent,
        PermissionsComponent,
        AjoutRoleComponent,
        UpdateRoleComponent
    ],
})
export class UtilisateursModule {}
