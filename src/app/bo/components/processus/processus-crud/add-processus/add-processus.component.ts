import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';

@Component({
  selector: 'app-add-processus',
  templateUrl: './add-processus.component.html',
  styleUrls: ['./add-processus.component.scss']
})
export class AddProcessusComponent {
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
 listMarqueDefault: any = [];
 listTypeMarqueDefault: any = [];

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
   private processusService: ProcessusService,
 ) {
  const userId = this.generalService.get_DataSession("user_id");
 
  
   this.clientForm = new FormGroup({
     Code: new FormControl(null, [Validators.required]),
     Version: new FormControl(null, [Validators.required]),
     Libelle: new FormControl(null, [Validators.required]),
     Description: new FormControl(null, [Validators.required]),
     SMQ_ID: new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
     Categorie_ID: new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
     Pilote: new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
     CoPilote: new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
     CreationDate :new FormControl(null, [Validators.required]),
     USER_ID :new FormControl(userId)
   });
 }


 ngOnInit(): void {
  //  this.GetAllMarque();
  this.getSMQ();
  this.getCategories();
  this.getUsers();
  this.getAllPilote();
  this.getAllCoPilote();
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

 get ProcessusFormErrors() {
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
     this.IsFiledClientForm = false;
     this.error('Formulaire invalide !');
   }
 }

 CallAddApi() {
  if (this.clientForm.invalid) {
    // Le formulaire est invalide, ne soumettez pas les données.
    return;
  }
  // Le formulaire est valide, soumettez les données.
  this.Ajouter = this.processusService.InsertProcessus(this.clientForm.value)
    .subscribe((r: any) => {
      r = JSON.parse(r);
      switch (r?.['codeReponse']) {
        case 200:
          this.success('Processus ajoutée');
          break;
        default:
          this.error(r?.msg);
          break;
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
