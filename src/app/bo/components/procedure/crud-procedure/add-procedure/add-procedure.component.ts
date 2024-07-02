import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcedureService } from 'src/app/services/Procedure/procedure.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-procedure',
  templateUrl: './add-procedure.component.html',
  styleUrls: ['./add-procedure.component.scss']
})
export class AddProcedureComponent {
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
  processusList: any;

 constructor(
 
   private generalService: GeneralService,
   private procedureService: ProcedureService,
   private processus_src : ProcessusService
 ) {
 
   this.clientForm = new FormGroup({
     ProcessusID : new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
     Code: new FormControl(null, [Validators.required]),
     Version: new FormControl(null, [Validators.required]),
     Libelle: new FormControl(null, [Validators.required]),
     Description: new FormControl(null, [Validators.required]),
     CreationDate: new FormControl(null, [Validators.required]),
   });
 }


 ngOnInit(): void {
     this.canActivateProcessus();
 }

canActivateProcessus() {
  const id_role = this.generalService.get_DataSession("id_role");
  const role_name = this.generalService.get_DataSession("Roles_name");
  let id_pilote = 0;
  let id_coPilote = 0;

  if (role_name === "Pilote") {
    id_pilote = id_role;
  } else if (role_name === "CoPilote") {
    id_coPilote = id_role;
  }

  if (id_role === environment.id_role_superadministrateur) {
    this.Afficher_params = this.processus_src.GetAllProcessus().subscribe((res: any) => {
      if (res) {
        if (res.length > 0) {
          this.processusList  = res.map((element: any) => ({
            value: element.id,
            label: element.libelle
          }));
        }
      } else {
        this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
      }
    });
  } else {
    this.Afficher_params = this.processus_src.getProcessusByPilote(id_pilote, id_coPilote).subscribe((res: any) => {
      if (res.data) {
        if (res.data.length > 0) {
          this.processusList  = res.data.map((element: any) => ({
            value: element.id,
            label: element.libelle
          }));
        }
      } else {
        this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
      }
    });
  }
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

 get procedureFormErrors() {
   return this.clientForm.controls;
 }

// Lors du click sur valider
 SubmitForm() {
   this.IsFiledVehiculeForm = true;

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
  this.Ajouter = this.procedureService.InsertProcedure(this.clientForm.value)
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
