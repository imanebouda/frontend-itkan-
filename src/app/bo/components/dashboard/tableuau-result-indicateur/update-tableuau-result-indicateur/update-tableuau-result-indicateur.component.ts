import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { IndicateurService } from 'src/app/services/indicateurs/indicateur.service';
import { ResultatIndicateurService } from 'src/app/services/resultatIndicateurs/resultatIndicateurs.service';
@Component({
  selector: 'app-update-tableuau-result-indicateur',
  templateUrl: './update-tableuau-result-indicateur.component.html',
})
export class UpdateTableuauResultIndicateurComponent {

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
listAnnuelle: string[] = ["A1"];
listSemestrielle: string[] = ["S1", "S2"];
listQuadrimestrielle: string[] = ["Q1", "Q2", "Q3"];
listTrimestrielle: string[] = ["T1", "T2", "T3", "T4"];
listMensuelle: string[] = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"];
date: Date = new Date();
listAnnee : number[] =[this.getCurrentYear(),this.getCurrentYear()-1];
afficherParamsSubscription: Subscription;
modifierSubscription: Subscription;


// Les variables du formulaire
UpdateclientForm: FormGroup;
IsFiledVehiculeForm: boolean = false;
IsFiledClientForm: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(
  private generalService: GeneralService,
  private indicateurService:IndicateurService,
  private resultatIndicateurService : ResultatIndicateurService
) {
  const IndicateurID = this.generalService.getIndicateurID('detail');

  this.UpdateclientForm = new FormGroup({
    ID: new FormControl(null, [Validators.required]),
    IndicateurID : new FormControl(IndicateurID),
    Periode: new FormControl(' ', { validators: [Validators.required], updateOn: 'blur' }),
    Annee: new FormControl(' ', { validators: [Validators.required], updateOn: 'blur' }),
    Resultat: new FormControl(null, [Validators.required]),
  });
}


ngOnInit(): void {
  this.UpdateclientForm.get('ID')?.setValue(this.data_selected_ddp.resultatIndicateur.ResultatID);
  this.UpdateclientForm.get('Periode')?.setValue(this.data_selected_ddp.resultatIndicateur.Periode);
  this.UpdateclientForm.get('Resultat')?.setValue(this.data_selected_ddp.resultatIndicateur.Resultat);
  this.UpdateclientForm.get('Annee')?.setValue(this.data_selected_ddp.Annee);
  this.UpdateclientForm.get('IndicateurID')?.setValue(this.data_selected_ddp.IndicateurID);
}


ngOnChanges(changes: SimpleChanges): void {
  if (changes.data_selected_ddp && changes.data_selected_ddp.currentValue) {
  }
}



getCurrentYear(): number {
  return new Date().getFullYear();
}

get resultindicateurFormErrors() {
  return this.UpdateclientForm.controls;
}

// Lors du click sur valider
SubmitForm() {
  if (this.UpdateclientForm.valid) {
    this.is_loading = true;
    this.Disabled = true;
     this.CallAddApi();
  } else {
    this.IsFiledClientForm = true;
    this.error('Formulaire invalide !');
  }
}

CallAddApi() {
  if (this.UpdateclientForm.invalid) {
    // Le formulaire est invalide, ne soumettez pas les données.
    return;
  }
  // Le formulaire est valide, soumettez les données.
  this.Ajouter = this.resultatIndicateurService.UpdateIndicateursResultat(this.UpdateclientForm.value)
    .subscribe((r: any) => {
      r = JSON.parse(r);
      switch (r?.['codeReponse']) {
        case 200:
          this.success('Résultat Indicateur modifié');
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
