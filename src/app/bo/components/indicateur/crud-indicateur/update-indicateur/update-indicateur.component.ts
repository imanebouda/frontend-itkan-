import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { IndicateurService } from 'src/app/services/indicateurs/indicateur.service';


@Component({
  selector: 'app-update-indicateur',
  templateUrl: './update-indicateur.component.html',
  styleUrls: ['./update-indicateur.component.scss']
})
export class UpdateIndicateurComponent {
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
listFrequence : string[] = ["Annuelle","Semestrielle", "Quadrimestrielle","Trimestrielle", "Mensuelle"];


// Les variables du formulaire
UpdateclientForm: FormGroup;
IsFiledVehiculeForm: boolean = false;
IsFiledUpdateclientForm : boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(

  private generalService: GeneralService,
  private indicateurService:IndicateurService,
) {

  const ProcessusID = this.generalService.getProcessusID('list');

  this.UpdateclientForm = new FormGroup({
    ID: new FormControl(null, [Validators.required]),
    ProcessusID : new FormControl(ProcessusID),
    Libelle: new FormControl(null, [Validators.required]),
    Frequence: new FormControl(' ', { validators: [Validators.required], updateOn: 'blur' }),
    Cible: new FormControl(null, [Validators.required]),
    Tolerance: new FormControl(null, [Validators.required]),
    Formule: new FormControl(null, [Validators.required]),
  });
}


ngOnInit(): void {
  const ProcessusID = this.generalService.getProcessusID('list');
  this.UpdateclientForm.get('ID')?.setValue(this.data_selected_ddp.ID);
  this.UpdateclientForm.get('Cible')?.setValue(this.data_selected_ddp.Cible);
  this.UpdateclientForm.get('Tolerance')?.setValue(this.data_selected_ddp.Tolerance);
  this.UpdateclientForm.get('Libelle')?.setValue(this.data_selected_ddp.Libelle);
  this.UpdateclientForm.get('Frequence')?.setValue(this.data_selected_ddp.Frequence);
  this.UpdateclientForm.get('Formule')?.setValue(this.data_selected_ddp.Formule);
  this.UpdateclientForm.get('ProcessusID')?.setValue(ProcessusID);
}


ngOnChanges(changes: SimpleChanges): void {
  if (changes.data_selected_ddp && changes.data_selected_ddp.currentValue) {
      // Mettez à jour le formulaire avec la nouvelle valeur de l'ID
  }
}


get indicateurFormErrors() {
  return this.UpdateclientForm.controls;
}

// Lors du click sur valider
SubmitForm() {
  if (this.UpdateclientForm.valid) {
    this.is_loading = true;
    this.Disabled = true;
     this.CallAddApi();
  } else {
    this.IsFiledUpdateclientForm  = true;
    this.error('Formulaire invalide !');
  }
}

CallAddApi() {
  if (this.UpdateclientForm.invalid) {
    // Le formulaire est invalide, ne soumettez pas les données.
    return;
  }
  // Le formulaire est valide, soumettez les données.
  this.indicateurService.UpdateIndicateur(this.UpdateclientForm.value)
  .subscribe((r: any) => {
    r = JSON.parse(r);
    switch (r?.['codeReponse']) {
      case 200:
        this.success('Indicateur  modifié');
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
