import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { IndicateurService } from 'src/app/services/indicateurs/indicateur.service';
import { ResultatIndicateurService } from 'src/app/services/resultatIndicateurs/resultatIndicateurs.service';

@Component({
  selector: 'app-add-tableuau-result-indicateur',
  templateUrl: './add-tableuau-result-indicateur.component.html',
  styleUrls: ['./add-tableuau-result-indicateur.component.scss']
})
export class AddTableuauResultIndicateurComponent {
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
userCoPilote : any =[];
userPilote : any =[];
categorieList: any = [];
detailIndicateur : any = [];
listMarqueDefault: any = [];
listTypeMarqueDefault: any = [];
afficherParamsSubscription: Subscription;
modifierSubscription: Subscription;


// Les variables du formulaire
clientForm: FormGroup;
IsFiledVehiculeForm: boolean = false;
IsFiledClientForm: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(
  private resultatIndicateurService : ResultatIndicateurService
) {

  this.clientForm = new FormGroup({
    IndicateurID : new FormControl(null,[Validators.required]),
    Periode: new FormControl(null,[Validators.required]),
    Annee: new FormControl(null,[Validators.required]),
    Resultat: new FormControl(null, [Validators.required]),
  });
}


ngOnInit(): void {
console.log(this.data_selected_ddp);
  this.clientForm.get('Periode')?.setValue(this.data_selected_ddp.resultatIndicateur);
  this.clientForm.get('Annee')?.setValue(this.data_selected_ddp.Annee);
  this.clientForm.get('IndicateurID')?.setValue(this.data_selected_ddp.IndicateurID);
}


ngOnChanges(changes: SimpleChanges): void {
  if (changes.data_selected_ddp && changes.data_selected_ddp.currentValue) {
  }
}



getCurrentYear(): number {
  return new Date().getFullYear();
}

get resultindicateurFormErrors() {
  return this.clientForm.controls;
}

// Lors du click sur valider
SubmitForm() {
  if (this.clientForm.valid) {
    this.is_loading = true;
    this.Disabled = true;
     this.CallAddApi();
  } else {
    this.IsFiledClientForm = true;
    this.error('Formulaire invalide !');
  }
}

CallAddApi() {
  if (this.clientForm.invalid) {
    // Le formulaire est invalide, ne soumettez pas les données.
    return;
  }
  // Le formulaire est valide, soumettez les données.
  this.Ajouter = this.resultatIndicateurService.InsertIndicateursResultat(this.clientForm.value)
    .subscribe((r: any) => {
      r = JSON.parse(r);
      switch (r?.['codeReponse']) {
        case 200:
          this.success('Résultat Indicateur ajoutée');
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
  return this.clientForm.controls;
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
