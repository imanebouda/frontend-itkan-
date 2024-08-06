import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ListReclamationsComponent } from './list-reclamations/list-reclamations.component'; // Import du composant ListReclamationsComponent
//import { AddReclamationComponent } from './add-reclamations/add-reclamations.component'; // Import du composant AddReclamationComponent
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'reclamations/list', // Chemin de base pour les fonctionnalités de réclamation
        children: [
          {
            path: '',
            redirectTo: 'list',
            pathMatch: 'full',
          },
          {
            path: 'list',
            component: ListReclamationsComponent, // Composant pour afficher la liste des réclamations
            canActivate: [AutorisedGuard],
          },
          {
            path: 'add',
            //component: AddReclamationComponent, // Composant pour ajouter une nouvelle réclamation
            canActivate: [AutorisedGuard],
          },
          { path: '**', redirectTo: 'list', pathMatch: 'full' },
        ],
      },
      { path: '**', redirectTo: '', pathMatch: 'full' },
    ]),
  ],
  exports: [RouterModule],
})
export class ReclamationRoutingModule { }
