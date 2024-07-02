import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
@Component({
  selector: 'app-update-processus',
  templateUrl: './update-processus.component.html',
  styleUrls: ['./update-processus.component.scss']
})
export class UpdateProcessusComponent {
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
UpdateclientForm: FormGroup;
IsFiledVehiculeForm: boolean = false;
IsFiledClientForm: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(

  private generalService: GeneralService,
  private processusService: ProcessusService,
  private datePipe: DatePipe
) {
 const userId = this.generalService.get_DataSession("user_id");
  this.UpdateclientForm = new FormGroup({
    ID: new FormControl(null, [Validators.required]),
    Code: new FormControl(null, [Validators.required]),
    Version: new FormControl(null, [Validators.required]),
    Libelle: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    SMQ_ID :new FormControl(null, [Validators.required]),
    Categorie_ID :new FormControl(null, [Validators.required]),
    Pilote :new FormControl(null, [Validators.required]),
    CoPilote :new FormControl(null, [Validators.required]),
    CreationDate :new FormControl(null, [Validators.required]),
    USER_ID :new FormControl(userId)
  });
}


ngOnInit(): void {
  this.UpdateclientForm.get('ID')?.setValue(this.data_selected_ddp.ID);
  this.UpdateclientForm.get('Code')?.setValue(this.data_selected_ddp.Code);
  this.UpdateclientForm.get('Version')?.setValue(this.data_selected_ddp.Version);
  this.UpdateclientForm.get('Libelle')?.setValue(this.data_selected_ddp.Libelle);
  this.UpdateclientForm.get('Description')?.setValue(this.data_selected_ddp.Description);
  this.UpdateclientForm.get('SMQ_ID')?.setValue(this.data_selected_ddp.SMQ.ID);
  this.UpdateclientForm.get('Categorie_ID')?.setValue(this.data_selected_ddp.Categories.ID);
  this.UpdateclientForm.get('USER_ID')?.setValue(this.data_selected_ddp.Users.Id);
  this.UpdateclientForm.get('Pilote')?.setValue(this.data_selected_ddp.Pilote);
  this.UpdateclientForm.get('CoPilote')?.setValue(this.data_selected_ddp.CoPilote);
  this.UpdateclientForm.get('CreationDate')?.setValue(this.datePipe.transform(this.data_selected_ddp.CreationDate, 'dd/MM/yyyy'));
 this. getSMQ();
 this.getCategories();
 this.getUsers();
 this.getAllPilote();
 this.getAllCoPilote();
}


ngOnChanges(changes: SimpleChanges): void {
  if (changes.data_selected_ddp && changes.data_selected_ddp.currentValue) {
      // Mettez à jour le formulaire avec la nouvelle valeur de l'ID
  }
}


get ProcessusFormErrors() {
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
  this.processusService.UpdateProcessus(this.UpdateclientForm.value)
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

// Appel à la méthode getCategories pour récupérer les catégories
getCategories() {
 this.Afficher_params = this.processusService.getCategories().subscribe((res: any) => {
   if (res.codeReponse === 200) {
     /* -------------------------------- Les rôles ------------------------------- */
     if (res.data) {
       this.categorieList  = res.data.map((element: any) => ({
         value: element.ID,
         label: element.Libelle
       }));
     }
   } else {
     this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
   }
 });
}

// Appel à la méthode getSMQ pour récupérer les SMQ
getSMQ() {
 this.Afficher_params = this.processusService.getSMQ().subscribe((res: any) => {
   if (res.codeReponse === 200) {
     /* -------------------------------- Les rôles ------------------------------- */
     if (res.data) {
       this.smqList  = res.data.map((element: any) => ({
         value: element.ID,
         label: element.Libelle
       }));
     }
   } else {
     this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
   }
 });
}

getUsers() {
  this.Afficher_params = this.processusService.getUsers().subscribe((res: any) => {
    if (res) {
      /* -------------------------------- Les rôles ------------------------------- */
      if (res) {
        this.userList  = res.map((element: any) => ({
          value: element.id,
          label: element.nomCompletUtilisateur
        }));
      }
    } else {
      this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
    }
  });
}


getAllPilote() {
  this.Afficher_params = this.processusService.getUsers().subscribe((res: any) => {
    if (res) {
      /* -------------------------------- Les rôles ------------------------------- */
      if (res) {
        this.userPilote  = res.map((element: any) => ({
          value: element.id,
          label: element.nomCompletUtilisateur
        }));
      }
    } else {
      this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
    }
  });
}

getAllCoPilote() {
  this.Afficher_params = this.processusService.getUsers().subscribe((res: any) => {
    if (res) {
      /* -------------------------------- Les rôles ------------------------------- */
      if (res) {
        this.userCoPilote  = res.map((element: any) => ({
          value: element.id,
          label: element.nomCompletUtilisateur
        }));
      }
    } else {
      this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
    }
  });
}

}
