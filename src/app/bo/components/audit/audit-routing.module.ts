import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { ListAuditComponent } from './list-audit/list-audit.component'; // Import du composant AuditListComponent
import { AddAuditComponent } from './add-audit/add-audit.component'; // Import du composant AddAuditComponent
import { UpdateAuditComponent } from './update-audit/update-audit.component'; // Import du composant UpdateAuditComponent

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: 'audit', // Chemin de base pour les fonctionnalités Audit
                children: [
                    {
                        path: '',
                        redirectTo: 'list',
                        pathMatch: 'full',
                    },
                    {
                        path: 'list',
                        component: ListAuditComponent, // Composant pour afficher la liste des audits
                        canActivate: [AutorisedGuard],
                        data: { role: 'Audit-Consulter' }, // Rôle nécessaire pour accéder à cette fonctionnalité
                    },
                    {
                        path: 'add',
                        component: AddAuditComponent, // Composant pour ajouter un nouvel audit
                        canActivate: [AutorisedGuard],
                        data: { role: 'Audit-Ajouter' }, // Rôle nécessaire pour accéder à cette fonctionnalité
                    },
                    {
                        path: 'update/:id',
                        component: UpdateAuditComponent, // Composant pour mettre à jour un audit existant
                        canActivate: [AutorisedGuard],
                        data: { role: 'Audit-Modifier' }, // Rôle nécessaire pour accéder à cette fonctionnalité
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class AuditRoutingModule { }
