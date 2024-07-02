import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { GeneralService } from 'src/app/services/services';
import { MessageService } from 'primeng/api';

interface UploadEvent {
    originalEvent: Event;
    files: File[];
}

@Component({
    selector: 'app-add-proces-documents',
    templateUrl: './add-proces-documents.component.html',
    providers: [MessageService]
})
export class AddProcesDocumentsComponent {
    // Les variables globales
    Afficher_params: Subscription;
    Ajouter: Subscription;
    ShowDataMarque: Subscription;
    ShowDataTypeMarque: Subscription;
    SearchVehicule: Subscription;
    Restaurer: Subscription;
    @Output() FermerPopUp = new EventEmitter<boolean>();
    is_loading: boolean = false;
    has_access_yes: any = [];
    selectedItem: any;
    smqList: any = [];
    userList: any = [];
    userCoPilote: any = [];
    userPilote: any = [];
    categorieList: any = [];
    listMarqueDefault: any = [];
    listTypeMarqueDefault: any = [];
    uploadedFiles: any[] = [];

    // Les variables du formulaire
    clientForm: FormGroup;
    IsFiledClientForm: boolean = false;
    Ifmessage: boolean = false;
    Error: number = 0;
    ApiMessage: any;
    Disabled: boolean = false;

    constructor(
        private generalService: GeneralService,
        private processusService: ProcessusService,
        private ProcesDocuments_src: ProcesDocumentsService,
        private messageService: MessageService
    ) {
        const id = this.generalService.getProcessusID('detail');

        this.clientForm = new FormGroup({
            Libelle: new FormControl(null, [Validators.required]),
            ProcessusID: new FormControl(id)
        });
    }

    ngOnInit(): void {
 
    }
    
    
    // Gestion des erreurs
    error(message: any) {
      this.is_loading = false;
      this.Error = 1;
      this.ApiMessage = message;
      this.Disabled = false;
      this.Ifmessage = true;
      setTimeout(() => {
        this.Ifmessage = false;
      }, 3000);
    }
    
    success(message: any) {
      this.Error = 0;
      this.ApiMessage = message;
      this.Ifmessage = true;
      setTimeout(() => {
        this.ClosePopUp(true);
        this.Ifmessage = false;
        this.Error = 0;
        this.ApiMessage = '';
        this.Disabled = false;
        this.is_loading = false;
      }, 500);
    }
    
    get ProcesObjectifsFormErrors() {
      return this.clientForm.controls;
    }
    
    // Lors du click sur valider
    SubmitForm() {
      this.IsFiledClientForm = true;
      if (this.clientForm.valid) {
        this.is_loading = true;
        this.Disabled = true;
         this.CallAddApi();
      } else {
        this.IsFiledClientForm = true;
        this.error('Formulaire invalide !');
      }
    }

    onUpload(event: UploadEvent) {
        if (event.files && event.files.length > 0) {
            // Réinitialisez la liste des fichiers téléchargés
            this.uploadedFiles = [];
    
            for (let file of event.files) {
                this.uploadedFiles.push(file);
            }
        }
    }
    
    CallAddApi() {
        if (this.clientForm.invalid) {
            // Le formulaire est invalide, ne soumettez pas les données.
            return;
        }
    
        // Le formulaire est valide, soumettez les données.
        this.is_loading = true;
        this.Disabled = true;
        const formData = new FormData();  
        formData.append('file',this.uploadedFiles[0]);
        formData.append('Libelle', this.clientForm.get('Libelle').value);
        formData.append('ProcessusID', this.clientForm.get('ProcessusID').value);
        this.Ajouter = this.ProcesDocuments_src.InsertProcessusDocuments(formData)
            .subscribe((response: any) => {
            if (response && response.codeReponse === 200) {
                this.success('Déclaration ajoutée');
            } else {
                this.error(response.msg);
            }
        });
    }
    
    
    // Fermer le popup
    ClosePopUp(state: boolean) {
      this.FermerPopUp.emit(state);
    }
    
    // Lors de la destruction du composant pour ne pas avoir les memory leaks
    ngOnDestroy(): void {
      let unsubscribe_liste: any[] = [
        this.Ajouter,
        this.Restaurer,
        this.Afficher_params,
      ];
      unsubscribe_liste.forEach((element: any) => {
        if (element) {
          element.unsubscribe();
        }
      });
    }
 }
