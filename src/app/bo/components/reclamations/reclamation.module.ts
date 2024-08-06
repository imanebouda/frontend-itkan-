import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListReclamationsComponent } from './list-reclamations/list-reclamations.component'; // Import du composant ListReclamationsComponent
//import { AddReclamationComponent } from './add-reclamations/add-reclamations.component'; // Import du composant AddReclamationComponent
import { ReclamationRoutingModule } from './reclamation-routing.module'; // Import du fichier de routage pour les réclamations
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CalendarModule } from 'primeng/calendar';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { MessageService } from 'primeng/api';
import { DefineComiteComponent } from './define-comite/define-comite.component';
import { ReclamationDetailsComponent } from './reclamation-details/reclamation-details.component';

@NgModule({
  declarations: [
    ListReclamationsComponent,
    DefineComiteComponent,
    ReclamationDetailsComponent,
    //AddReclamationComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    CalendarModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReclamationRoutingModule, // Utilisation du module de routage pour les réclamations
  ],
  providers: [MessageService]
})
export class ReclamationModule { }
