import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { IndicateurService } from 'src/app/services/indicateurs/indicateur.service';
import { ResultatIndicateurService } from 'src/app/services/resultatIndicateurs/resultatIndicateurs.service';

@Component({
  selector: 'app-add-rsultat-indicateur',
  templateUrl: './add-rsultat-indicateur.component.html',
  styleUrls: ['./add-rsultat-indicateur.component.scss']
})
export class AddRsultatIndicateurComponent {
// Les variables globales
Afficher_params: Subscription;
Ajouter: Subscription;
ShowDataMarque: Subscription;
ShowDataTypeMarque: Subscription;
SearchVehicule: Subscription;
Restaurer: Subscription;
@Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
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


// Les variables du formulaire
clientForm: FormGroup;
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

  this.clientForm = new FormGroup({
    IndicateurID : new FormControl(IndicateurID),
    Periode: new FormControl(' ', { validators: [Validators.required], updateOn: 'blur' }),
    Annee: new FormControl(' ', { validators: [Validators.required], updateOn: 'blur' }),
    Resultat: new FormControl(null, [Validators.required]),
  });
}


ngOnInit(): void {
   this.getdetailIndicateur();
}


getCurrentYear(): number {
  return new Date().getFullYear();
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

get resultindicateurFormErrors() {
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

  
getdetailIndicateur() {
  this.is_loading = true; // Afficher un indicateur de chargement
  const ID = this.generalService.getIndicateurID('detail');
  this.indicateurService.getDetailIndicateur(ID).subscribe(
    (response: any) => {
      try {
        if (response && response.IsSucceed) {
          this.detailIndicateur = response.DataIndicateur || [];
        } else {
          this.generalService.errorSwal(response.Message || 'Une erreur inattendue s\'est produite.');
        }
      } catch (error) {
        this.generalService.errorSwal('Une erreur inattendue s\'est produite.');
      } finally {
        this.is_loading = false;
      }
    },
    (error) => {
      this.generalService.errorSwal('Une erreur de communication avec le serveur s\'est produite.', error);
      this.is_loading = false;
    }
  );
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
