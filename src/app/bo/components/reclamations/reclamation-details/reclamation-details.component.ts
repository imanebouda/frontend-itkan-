import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReclamationService } from 'src/app/services/reclamations/reclamations.service';
import { ReclamationDetailsModel } from 'src/app/models/reclamation-details.model';
import { DatePipe } from '@angular/common';
import { UsersModel } from 'src/app/models/users.model';
import { UtilisateursService } from 'src/app/services/utilisateurs/utilisateurs.service'; // Adjusted import path
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-reclamation-details',
  templateUrl: './reclamation-details.component.html',
  styleUrls: ['./reclamation-details.component.scss'],
  providers: [DatePipe]
})
export class ReclamationDetailsComponent implements OnInit {
  reclamation: ReclamationDetailsModel = {
    id: 0,
    objet: '',
    détail: '',
    analyse: '',
    status: '',
    creationDate: new Date(),
    reclamantNom: '',
    reclamantPrenom: '',
    responsableNomComplet: '',
    reclamantID: 0,
    responsableID: 0
  };

  formattedCreationDate: string | null = null;
  users: UsersModel[] = []; 
  filteredUsers: UsersModel[] = [];
  selectedUser: UsersModel | null = null;
  addUserDialogVisible: boolean = false;
  roleIds: number = 5;
  concernedUsers: UsersModel[] = [];
  analyseDialogVisible: boolean = false;
  constructor(
    private reclamationService: ReclamationService, 
    private route: ActivatedRoute,
    private datePipe: DatePipe,
    private utilisateursService: UtilisateursService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id'];
      this.reclamationService.getReclamationDetails(id).subscribe(
        data => {
          this.reclamation = data;
          if (this.reclamation.creationDate) {
            this.reclamation.creationDate = new Date(this.reclamation.creationDate);
            this.formattedCreationDate = this.datePipe.transform(this.reclamation.creationDate, 'dd/MM/yyyy');
          }
          // Charger les utilisateurs concernés en premier
          this.loadConcernedUsers();
        },
        error => console.error(error)
      );
    });
  
    // Charger tous les utilisateurs
    this.utilisateursService.getAllUsers().subscribe(
      (data: UsersModel[]) => {
        this.users = data;
        // Filtrer les utilisateurs disponibles après avoir chargé les utilisateurs concernés
        this.filterAvailableUsers();
      },
      (error: any) => console.error(error)
    );
  }

  filterAvailableUsers() {
    // Filtrer les utilisateurs dont l'idRole est soit 5 soit 6 et qui ne sont pas déjà concernés
    this.filteredUsers = this.users.filter(user => 
      (user.idRole === 5 || user.idRole === 6) &&
      !this.concernedUsers.some(concernedUser => concernedUser.id === user.id)
    );
  }

  loadConcernedUsers() {
    this.reclamationService.getConcernedUsers(this.reclamation.id).subscribe(
      (data: UsersModel[]) => {
        this.concernedUsers = data;
        // Après avoir chargé les utilisateurs concernés, filtrer les utilisateurs disponibles
        this.filterAvailableUsers();
      },
      (error: any) => console.error(error)
    );
  }

  
  /*loadConcernedUsers() {
    this.reclamationService.getConcernedUsers(this.reclamation.id).subscribe(
      (data: UsersModel[]) => {
        this.concernedUsers = data;
      },
      (error: any) => console.error(error)
    );
  }*/
  openUpdateDialog(_user: UsersModel) {

  }
  showAddUserModal() {
    this.addUserDialogVisible = true;
  }
  addUserToCard() {
    if (this.selectedUser) {
      // Ajouter l'utilisateur sélectionné au comité si non déjà présent
      if (!this.concernedUsers.some(user => user.id === this.selectedUser.id)) {
        this.concernedUsers.push(this.selectedUser);
      }
  
      // Mettre à jour la liste des utilisateurs disponibles pour la sélection
      this.filteredUsers = this.filteredUsers.filter(user => user.id !== this.selectedUser.id);
  
      // Réinitialiser la sélection
      this.selectedUser = null;
    }
  }
  
  
  removeUserFromCard(user: UsersModel) {
    this.concernedUsers = this.concernedUsers.filter(u => u.id !== user.id);
  }
  saveComitee() {
    const userIds = this.concernedUsers.map(user => user.id);
    this.reclamationService.defineComite(this.reclamation.id, userIds).subscribe(
      _response => {
        this.loadConcernedUsers();
        this.addUserDialogVisible = false;
      },
      error => console.error('Erreur lors de la mise à jour du comité:', error)
    );
  }
  

  removeUserFromComitee(user: UsersModel) {
    this.reclamationService.removeUserFromComitee(this.reclamation.id, user.id).subscribe(
      _response => {
        // Supprimer l'utilisateur de la liste concernedUsers
        this.concernedUsers = this.concernedUsers.filter(u => u.id !== user.id);
  
        // Ajouter l'utilisateur à la liste filteredUsers pour qu'il puisse être à nouveau sélectionné
        this.filteredUsers.push(user);
        
        // Optionnel : Trier la liste filteredUsers après ajout
        this.filteredUsers.sort((a, b) => a.nomCompletUtilisateur.localeCompare(b.nomCompletUtilisateur));
      },
      error => console.error('Erreur lors de la suppression de l\'utilisateur du comité:', error)
    );
  }
  
  saveReclamation() {
    if (this.selectedUser) {
      this.concernedUsers.push(this.selectedUser);
      this.selectedUser = null; 
      this.addUserDialogVisible = false; 

      const userIds = [this.selectedUser.id];
      this.reclamationService.defineComite(this.reclamation.id, userIds).subscribe(
        response => {
          console.log('Comité de réclamation mis à jour:', response);
        },
        error => console.error(error)
      );
    }
  }
  showAnalyseDialog(): void {
    this.analyseDialogVisible = true;
  }

  hideAnalyseDialog(): void {
    this.analyseDialogVisible = false;
  }
  

  
}
