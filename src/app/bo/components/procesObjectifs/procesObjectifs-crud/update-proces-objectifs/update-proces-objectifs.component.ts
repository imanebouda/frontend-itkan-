import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcessusObjectifsService } from 'src/app/services/processusObjectifs/processusObjectifs.service';
import { GeneralService } from 'src/app/services/services';

@Component({
  selector: 'app-update-proces-objectifs',
  templateUrl: './update-proces-objectifs.component.html',
})
export class UpdateProcesObjectifsComponent {
// Les variables globales
Afficher_params: Subscription;
Ajouter: Subscription;
ShowDataMarque: Subscription;
ShowDataTypeMarque: Subscription;
SearchVehicule: Subscription;
Restaurer: Subscription;
@Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
@Input('data_selected_ddp') data_selected_ddp: any;
is_loading: boolean = false;
has_access_yes: any = [];
selectedItem: any;
smqList: any = [];
userList : any =[];
userPilote : any =[];
userCoPilote : any =[];
categorieList: any = [];
listMarqueDefault: any = [];
listTypeMarqueDefault: any = [];
afficherParamsSubscription: Subscription;
modifierSubscription: Subscription;

// Les variables du formulaire
updateClientForm: FormGroup;
IsFiledVehiculeForm: boolean = false;
IsFiledupdateClientForm: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(
  private generalService: GeneralService,
  private processusObjectifs_src: ProcessusObjectifsService,
) {
   const ProcessusID  =this.generalService.getProcessusID('list');

  this.updateClientForm = new FormGroup({
    ID :new FormControl(null, Validators.required),
    Title: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    ProcessusID :new FormControl(ProcessusID)
  });
}

ngOnInit(): void {
  this.updateClientForm.get('ID')?.setValue(this.data_selected_ddp.ID);
  this.updateClientForm.get('Title')?.setValue(this.data_selected_ddp.Title);
  this.updateClientForm.get('Description')?.setValue(this.data_selected_ddp.Description);
}



ngOnChanges(changes: SimpleChanges): void {
  if (changes.data_selected_ddp && changes.data_selected_ddp.currentValue) {
      // Mettez à jour le formulaire avec la nouvelle valeur de l'ID
  }
}


get ProcessusFormErrors() {
  return this.updateClientForm.controls;
}

// Lors du click sur valider
SubmitForm() {
  if (this.updateClientForm.valid) {
    this.is_loading = true;
    this.Disabled = true;
     this.CallAddApi();
  } else {
    this.IsFiledupdateClientForm = true;
    this.error('Formulaire invalide !');
  }
}

CallAddApi() {
  if (this.updateClientForm.invalid) {
    // Le formulaire est invalide, ne soumettez pas les données.
    return;
  }

  // Le formulaire est valide, soumettez les données.
  this.processusObjectifs_src.UpdateProcesObjectifs(this.updateClientForm.value)
  .subscribe((r: any) => {
    r = JSON.parse(r);
    switch (r?.['codeReponse']) {
      case 200:
        this.success('Déclaration ajoutée');
        break;
      default:
        this.error(r?.msg);
        break;
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

get ProcesObjectifsFormErrors() {
  return this.updateClientForm.controls;
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
