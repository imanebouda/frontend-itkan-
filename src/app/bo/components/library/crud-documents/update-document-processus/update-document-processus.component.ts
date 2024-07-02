import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';


interface UploadEvent {
  originalEvent: Event;
  files: File[];
}
@Component({
  selector: 'app-update-document-processus',
  templateUrl: './update-document-processus.component.html',
  styleUrls: ['./update-document-processus.component.scss']
})
export class UpdateDocumentProcessusComponent {
// Les variables globales
Afficher_params: Subscription;
Ajouter: Subscription;
ShowDataMarque: Subscription;
ShowDataTypeMarque: Subscription;
SearchVehicule: Subscription;
Restaurer: Subscription;
@Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
@Input('data_selected_Dp') data_selected_Dp: any;
is_loading: boolean = false;
has_access_yes: any = [];
selectedItem: any;
afficherParamsSubscription: Subscription;
modifierSubscription: Subscription;

// Les variables du formulaire
UpdateclientForm: FormGroup;
IsFiledVehiculeForm: boolean = false;
IsFiledClientForm: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
disabled: boolean = false;
uploadedFiles: any[] = [];
  Disabled: boolean;

constructor(

  private generalService: GeneralService,
  private processusService: ProcessusService,
  private ProcesDocuments_src : ProcesDocumentsService,
) {
  const id = this.generalService.getProcessusID('detail');

 
  this.UpdateclientForm = new FormGroup({
     ID :new FormControl(null, Validators.required),
     Libelle: new FormControl(null, [Validators.required]),
     ProcessusID :new FormControl(id)
  });
}


ngOnInit(): void {
  this.UpdateclientForm.get('ID')?.setValue(this.data_selected_Dp.key);
  this.UpdateclientForm.get('Libelle')?.setValue(this.data_selected_Dp.label);
  this.UpdateclientForm.get('ProcessusID')?.setValue(this.data_selected_Dp.parent.parent.key);
}


ngOnChanges(changes: SimpleChanges): void {
  if (changes.data_selected_Dp && changes.data_selected_Dp.currentValue) {
      // Mettez à jour le formulaire avec la nouvelle valeur de l'ID
  }
}


get ProcessusFormErrors() {
  return this.UpdateclientForm.controls;
}

// Lors du click sur valider la mise à jour
SubmitForm() {
  this.IsFiledClientForm = true;
  if (this.UpdateclientForm.valid) {
    this.is_loading = true;
    this.Disabled = true;
     this.callUpdateApi();
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

callUpdateApi() {
  if (this.UpdateclientForm.invalid ) {
    // Le formulaire est invalide ou aucun fichier n'est sélectionné, ne soumettez pas les données.
    return;
  }
  this.is_loading = true;
  this.disabled = true;
  const formData = new FormData();
  formData.append('ID',  this.UpdateclientForm.get('ID').value);
  formData.append('Libelle',this.UpdateclientForm.get('Libelle').value);

  this.Ajouter = this.ProcesDocuments_src.UpdateProcessusDocuments(formData)
    .subscribe((response: any) => {
      if (response && response.codeReponse === 200) {
        this.success('Document du processus mis à jour');
      } else {
        this.error(response.msg);
      }
    });
}



handleResponse(response: any) {
  // Traitez ici la réponse réussie de votre service
  this.is_loading = false;
  this.Disabled = false;
  this.success('DDP modifié');
}


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

success(message: any, if_same_as_logger: boolean = false) {
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

get ODSFormErrors() {
  return this.UpdateclientForm.controls;
}

handleError(error: any) {
  // Traitez ici les erreurs, affichez des messages à l'utilisateur, etc.
  this.is_loading = false;
  this.Disabled = false;
  this.Error = 1;
  this.ApiMessage = error;
  this.Ifmessage = true;
  setTimeout(() => {
      this.Ifmessage = false;
  }, 3000);
}

ClosePopUp(state: boolean) {
  this.FermerPopUp.emit(state);
}

ngOnDestroy(): void {
  if (this.modifierSubscription) {
      this.modifierSubscription.unsubscribe();
  }
  if (this.afficherParamsSubscription) {
      this.afficherParamsSubscription.unsubscribe();
  }
}


}
