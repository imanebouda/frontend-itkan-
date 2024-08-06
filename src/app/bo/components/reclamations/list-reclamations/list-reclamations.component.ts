import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { ReclamationsModel } from 'src/app/models/reclamation.model';
import { ReclamationService } from 'src/app/services/reclamations/reclamations.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UsersModel } from 'src/app/models/users.model';
import { UtilisateursService } from 'src/app/services/utilisateurs/utilisateurs.service';
import { ReclamantsService } from 'src/app/services/reclamations/reclamants.service';
import { ReclamantModel } from 'src/app/models/reclamant.model';

@Component({
  selector: 'app-list-reclamations',
  templateUrl: './list-reclamations.component.html',
  styleUrls: ['./list-reclamations.component.scss'],
  providers: [MessageService]
})
export class ListReclamationsComponent implements OnInit {
  [x: string]: any;
  selectedDate: Date;
  reclamations: ReclamationsModel[] = [];
  selectedReclamation: ReclamationsModel | null = null;
  displayEditModal: boolean = false;
  displayDetailsModal: boolean = false;
  displayAddModal: boolean = false;
  users: UsersModel[] = [];
  searchForm: FormGroup;
  editForm: FormGroup;
 // addForm: FormGroup;
  reclamantForm: FormGroup;
  reclamationForm: FormGroup;
  editReclamantForm : FormGroup;
  editReclamationForm : FormGroup; 
  currentTab: string = 'reclamant';
  analyseForm: FormGroup;
  comiteForm: FormGroup;
  displayAnalyseModal: boolean = false;
  displayComiteModal: boolean = false;
  selectedUsers: UsersModel[] = [];
  showDefineComiteModal = false;
  selectedReclamationId: number | null = null;
  createdReclamantId: number | null = null;
  isReclamantCreated: boolean = false;
  currentEditTab: string = 'reclamant';

  // Liste des statuts possibles
  statusList = [
    { label: 'En attente', value: 'En attente' },
    { label: 'En cours', value: 'En cours' },
    { label: 'Résolu', value: 'Résolu' }
  ];
 
  constructor(private reclamationsService: ReclamationService, private fb: FormBuilder, 
    private messageService: MessageService,
    private utilisateursService: UtilisateursService, private reclamantService: ReclamantsService
   ) { }

  ngOnInit(): void {
    this.loadUsers();
    this.fetchReclamations();
    //this.initializeForms();
    this.reclamantForm = this.fb.group({
      nom: ['', Validators.required],
      prénom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      creationDate: [new Date(), Validators.required],
       reclamations: [[]]
    });
     
    this.reclamationForm = this.fb.group({
      objet: ['', Validators.required],
      détail: ['', Validators.required],
      analyse: [''],
      status: ['', Validators.required],
      reclamantID: [null, Validators.required],
      responsableID: [null, Validators.required],
      creationDate: [new Date(), Validators.required]
    });
    this.searchForm = this.fb.group({
      status: [''],
      date: ['']
    });
    this.editReclamantForm = this.fb.group({
      nom: ['', Validators.required],
      prénom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      adresse: ['', Validators.required],
      ville: ['', Validators.required],
      creationDate: ['', Validators.required]
    });

    this.editReclamationForm = this.fb.group({
      objet: ['', Validators.required],
      détail: ['', Validators.required],
      analyse: [''],
      status: ['', Validators.required],
      reclamantID: ['', Validators.required],
      responsableID: ['', Validators.required],
      creationDate: ['', Validators.required]
    });
    
    this.analyseForm = this.fb.group({
      analyse: ['', Validators.required]
    });
    this.comiteForm = this.fb.group({
      users: [[], Validators.required]
    });
   this.fetchAllUsers();
   
  }
 
    fetchReclamations() {
      this.is_loading = true;
      this.reclamationsService.getReclamationsWithReclamant().subscribe(
        (data: ReclamationsModel[]) => {
          console.log('Fetched reclamations:', data); // Debug log
          this.reclamations = data;
          this.is_loading = false;
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la récupération des réclamations:', error);
          this.is_loading = false;
        }
      );
    }
    

  /*saveNewReclamation() {
    if (this.addForm.valid) {
      const newReclamation = this.adjustDateForServer(this.addForm.value);

      console.log('Creating new reclamation:', newReclamation);
   
      this.reclamationsService.addReclamation(newReclamation).subscribe(
        response => {
          console.log('Reclamation created successfully:', response);
          this.displayAddModal = false;
          this.currentTab = 'reclamant';
          this.fetchReclamations();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Réclamation ajoutée avec succès' });
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la création:', error);
          if (error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Échec de l\'ajout de la réclamation' });
        }
      );
    } else {
      console.warn('Add form is invalid:', this.addForm);
      this.addForm.markAllAsTouched(); // Mark all fields as touched to show validation errors
    }
  }
  */

  openEditModal(reclamation: ReclamationsModel): void {
    this.selectedReclamation = reclamation;
  
    this.reclamantService.getReclamantById(reclamation.reclamantID).subscribe((reclamant: ReclamantModel) => {
      this.editReclamantForm.patchValue({
        nom: reclamant.nom || '',
        prénom: reclamant.prénom || '',
        email: reclamant.email || '',
        mobile: reclamant.mobile || '',
        adresse: reclamant.adresse || '',
        ville: reclamant.ville || '',
        creationDate: new Date(reclamant.creationDate) // Ensure correct date format
      });
    });
  
    this.editReclamationForm.patchValue({
      objet: reclamation.objet || '',
      détail: reclamation.détail || '',
      analyse: reclamation.analyse || '',
      status: reclamation.status || '',
      reclamantID: reclamation.reclamantID || '',
      responsableID: reclamation.responsableID || '',
      creationDate: new Date(reclamation.creationDate)  
    });
  
    this.currentEditTab = 'reclamant';
    this.displayEditModal = true;
  }
  
    saveReclamant(): void {
      if (this.reclamantForm.valid) {
        const newReclamant = this.reclamantForm.value;
        // Ensure creationDate is handled appropriately
        newReclamant.creationDate = this.adjustDateToUTC(newReclamant.creationDate);
    
        this.reclamantService.addReclamant(newReclamant).subscribe(
          (reclamant: ReclamantModel) => {
            this.createdReclamantId = reclamant.id;
            this.isReclamantCreated = true;
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Réclamant enregistré avec succès' });
            this.reclamationForm.patchValue({ reclamantID: this.createdReclamantId });
            this.switchTab('reclamation');
          },
          (_error: HttpErrorResponse) => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Échec de l\'enregistrement du réclamant' });
          }
        );
      }
    }
    

  saveNewReclamation(): void {
    if (this.reclamationForm.valid) {
      const payload = this.reclamationForm.value;
      payload.creationDate = this.adjustDateToUTC(payload.creationDate);
      console.log('Payload being sent:', payload);
  
      this.reclamationsService.addReclamation(payload).subscribe(
        (_reclamation: ReclamationsModel) => {
          this.messageService.add({ severity: 'success', summary: 'Réclamation ajoutée', detail: 'La réclamation a été ajoutée avec succès.' });
          this.displayAddModal = false;
          this.fetchReclamations(); 
          this.resetForms();
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de l\'ajout de la réclamation:', error);
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de l\'ajout de la réclamation.' });
        }
      );
    }
  }
  
  adjustDateToUTC(date: Date): Date {
    if (!date) {
      return null; 
    }
  
    const utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
    return utcDate;
  }
  
  
  onHide(): void {
    this.resetForms();
  }
  loadUsers(): void {
    this.utilisateursService.getUserByRole([5, 6]).subscribe(users => {
      this.users = users;
    });
  }
  

  resetForms(): void {
    this.reclamantForm.reset();
    this.reclamationForm.reset();
    this.createdReclamantId = null;
    this.isReclamantCreated = false;
    this.currentTab = 'reclamant';
  }
  /*saveReclamation() {
    if (this.editForm.valid) {
      // Ajuster la date avant d'envoyer les données au serveur
      const adjustedReclamation = this.adjustDateForServer(this.editForm.value);
      
      console.log('Updating reclamation:', adjustedReclamation);
      this.reclamationsService.updateReclamation(adjustedReclamation.id, adjustedReclamation).subscribe(
        response => {
          console.log('Reclamation updated successfully:', response);
          this.displayEditModal = false;
          this.fetchReclamations();
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Réclamation modifiée avec succès' });
        },
        (error: HttpErrorResponse) => {
          console.error('Erreur lors de la modification:', error);
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Échec de la modification de la réclamation' });
        }
      );
    } else {
      console.warn('Edit form is invalid:', this.editForm);
      this.editForm.markAllAsTouched(); 
    }
  }*/
  
  searchReclamations() {
    const status = this.searchForm.get('status')?.value;
    const date = this.searchForm.get('date')?.value;
    const formattedDate = date ? new Date(date).toISOString() : null;
  
    this.is_loading = true;
    this.reclamationsService.searchReclamations(status, formattedDate).subscribe(
      (data: ReclamationsModel[]) => {
        console.log('Search results:', data);  
        this.reclamations = data;
        this.is_loading = false;
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la recherche:', error);
        this.is_loading = false;
      }
    );
  }
  clearSearch() {
    this.searchForm.reset();
    this.fetchReclamations();
  }

 /* editReclamation(reclamation: any) {
    this.selectedReclamation = { ...reclamation };
    this.editForm.patchValue(this.selectedReclamation);
    this.displayEditModal = true;
  }*/
  switchEditTab(tab: string) {
    this.currentEditTab = tab;
  }
  onHideEdit() {
    this.displayEditModal = false;
    this.currentEditTab = 'reclamant';
    this.isReclamantCreated = false;
    this.resetForms();
  }
 
  saveEditedReclamant(): void {
    if (this.editReclamantForm.valid && this.selectedReclamation) {
      const updatedReclamant = { ...this.editReclamantForm.value, id: this.selectedReclamation.reclamantID };
  
      this.reclamantService.updateReclamant(updatedReclamant).subscribe(
        (_response: ReclamantModel) => {
          this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Réclamant mis à jour avec succès.' });
          this.isReclamantCreated = true; // Indicate that the reclamant is updated
          this.reclamationForm.patchValue({ reclamantID: this.selectedReclamation.reclamantID });
          this.switchEditTab('reclamation'); // Pass to the 'Reclamation' tab
        },
        (error: HttpErrorResponse) => {
          this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la mise à jour du réclamant.' });
          console.error('Erreur lors de la mise à jour du réclamant:', error);
        }
      );
    }
  }
  
  saveEditedReclamation(): void {
    if (this.editReclamationForm.valid) {
        const editedReclamation = this.editReclamationForm.value;
        editedReclamation.creationDate = this.adjustDateToUTC(editedReclamation.creationDate);

        const reclamationId = this.selectedReclamation?.id;
        if (!reclamationId) {
            console.error('ID de la réclamation non défini.');
            return;
        }

        editedReclamation.id = reclamationId;

        console.log('Edited Reclamation:', editedReclamation);

        this.reclamationsService.updateReclamation(reclamationId, editedReclamation).subscribe(
            _response => {
                this.messageService.add({ severity: 'success', summary: 'Réclamation modifiée', detail: 'La réclamation a été modifiée avec succès.' });
                this.displayEditModal = false;
                this.fetchReclamations();
            },
            (error: HttpErrorResponse) => {
                console.error('Erreur lors de la modification de la réclamation:', error);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Une erreur est survenue lors de la modification de la réclamation.' });
            }
        );
    } else {
        console.warn('Edit form is invalid:', this.editReclamationForm);
    }
}

  viewDetails(reclamation: any) {
    this.selectedReclamation = { ...reclamation };
    this.displayDetailsModal = true;
   
  }

  deleteReclamation(reclamation: any) {
    if (confirm(`Are you sure you want to delete the reclamation with ID ${reclamation.id}?`)) {
      this.reclamationsService.deleteReclamation(reclamation.id).subscribe(
        () => {
          this.reclamations = this.reclamations.filter(r => r.id !== reclamation.id);
          console.log(`Reclamation with ID ${reclamation.id} deleted successfully.`);
        },
        error => {
          console.error('Erreur lors de la suppression:', error);
        }
      );
    }
  }

  showAddModal(): void {
    this.displayAddModal = true;
  }
  switchTab(tab: string) {
    this.currentTab = tab;
  }
 
  loadReclamations(): void {
    this.reclamationsService.getReclamations().subscribe(data => {
      this.reclamations = data;
    });
  }

  onSubmit(): void {
    const reclamationData = this.reclamationForm.value;
    console.log('Submitting data:', reclamationData);
    this.reclamationService.updateReclamation(reclamationData.id, reclamationData).subscribe(
      (      response: any) => {
        console.log('Update success:', response);
      
      },
      (      error: any) => {
        console.error('Update error:', error);
       
      }
    );
  }

  createReclamation() {
    this.reclamationsService.addReclamation(this.newReclamation).subscribe(
      response => {
        console.log('Réclamation créée avec succès', response);
        this.getReclamations(); 
      },
      (error: HttpErrorResponse) => {
        console.error('Erreur lors de la création:', error);
        if (error.error) {
          console.error('Détails de l\'erreur:', error.error);
        }
      }
    );
  }

  private adjustDateForServer(formValue: any): any {
    const adjustedValue = { ...formValue };
    if (adjustedValue.creationDate) {
      const date = new Date(adjustedValue.creationDate);
      date.setMinutes(date.getMinutes() - date.getTimezoneOffset());
      adjustedValue.creationDate = date.toISOString().split('T')[0]; // Convert to YYYY-MM-DD format
    }
    return adjustedValue;
  }

  onDateSelect(event: any): void {
    const selectedDate = event;
    this.selectedReclamation = this.reclamations.find(reclamation => 
      new Date(reclamation.creationDate).toDateString() === selectedDate.toDateString()
    );
  }

  openAnalyseModal(reclamation: ReclamationsModel): void {
    this.selectedReclamation = reclamation;
    this.analyseForm.reset(); // Réinitialiser le formulaire
    this.analyseForm.patchValue({ analyse: reclamation.analyse });
    this.displayAnalyseModal = true;
  }

  saveAnalyse() {
    if (this.analyseForm.valid) {
      const analyseValue = this.analyseForm.value.analyse;
      this.selectedReclamation.analyse = analyseValue;
      this.reclamationsService.updateReclamation(this.selectedReclamation.id, this.selectedReclamation).subscribe(() => {
        this.displayAnalyseModal = false;
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Analyse saved successfully' });
        this.fetchReclamations(); // Mettre à jour la liste localement
      }, _error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to save analysis' });
      });
    }
  }

  fetchAllUsers(): void {
    this.utilisateursService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
      },
      error: (err) => {
        console.error('Error fetching users', err);
      }
    });
  }
  /*openComiteModal(reclamation: ReclamationsModel): void {
    this.selectedReclamation = reclamation;
    this.selectedUsers = [];
    this.comiteForm.reset(); // Réinitialiser le formulaire
    this.displayComiteModal = true;
  }
  saveComite(): void {
    if (this.comiteForm.valid && this.selectedReclamation) {
      const comiteData = {
        reclamationId: this.selectedReclamation.id,
        userIds: this.selectedUsers.map(user => user.id)
      };
      this.reclamationsService.defineComite(comiteData).subscribe(
        () => {
          this.loadReclamations(); // Recharger la liste des réclamations
          this.displayComiteModal = false; // Fermer la modal
        },
        (        error: any) => {
          console.error('Error defining comite', error);
        }
      );
    }
  }*/
    openDefineComiteModal(reclamation: ReclamationsModel | undefined) {
     
      this.selectedUsers = [];
    
      if (!reclamation || !reclamation.id) {
        console.error('Invalid reclamation object:', reclamation);
       
        return; 
      }
    
      this.selectedReclamationId = reclamation.id;
      this.selectedReclamation = reclamation;
      this.showDefineComiteModal = true;
    }
    
  
    closeDefineComiteModal(): void {
      this.showDefineComiteModal = false;
    }
  
    submitSelectedUsers(): void {
     
      console.log('Utilisateurs sélectionnés:', this.selectedUsers);
      this.closeDefineComiteModal();
    }
    onUserSelect(user: UsersModel): void {
      const index = this.selectedUsers.findIndex(u => u.id === user.id);
      if (index === -1) {
        this.selectedUsers.push(user);
      } else {
        this.selectedUsers.splice(index, 1);
      }
    }

 
}
