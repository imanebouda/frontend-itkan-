import { DatePipe } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { ProcedureService } from 'src/app/services/Procedure/procedure.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-update-procedure',
  templateUrl: './update-procedure.component.html',
  styleUrls: ['./update-procedure.component.scss']
})
export class UpdateProcedureComponent {
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
processusList : any ;

// Les variables du formulaire
UpdateclientForm: FormGroup;
IsFiledVehiculeForm: boolean = false;
IsFiledClientForm: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(
  private datePipe : DatePipe,
  private generalService: GeneralService,
  private procedureService: ProcedureService,
  private processus_src : ProcessusService
) {

  this.UpdateclientForm = new FormGroup({
    ProcessusID : new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
    ID: new FormControl(null, [Validators.required]),
    Code: new FormControl(null, [Validators.required]),
    Version: new FormControl(null, [Validators.required]),
    Libelle: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    CreationDate :new FormControl(null, [Validators.required])
  });
}


ngOnInit(): void {
  this.canActivateProcessus();
  this.UpdateclientForm.get('ID')?.setValue(this.data_selected_ddp.ID);
  this.UpdateclientForm.get('Code')?.setValue(this.data_selected_ddp.Code);
  this.UpdateclientForm.get('Version')?.setValue(this.data_selected_ddp.Version);
  this.UpdateclientForm.get('Libelle')?.setValue(this.data_selected_ddp.Libelle);
  this.UpdateclientForm.get('Description')?.setValue(this.data_selected_ddp.Description);
  this.UpdateclientForm.get('CreationDate')?.setValue(this.datePipe.transform(this.data_selected_ddp.CreationDate,'dd/MM/yyyy'));
  this.UpdateclientForm.get('ProcessusID')?.setValue(this.data_selected_ddp.ProcessusID);
}


ngOnChanges(changes: SimpleChanges): void {
  if (changes.data_selected_ddp && changes.data_selected_ddp.currentValue) {
  }
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
  this.procedureService.UpdateProcedure(this.UpdateclientForm.value)
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

}
