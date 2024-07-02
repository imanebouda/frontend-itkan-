import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcedureObjectifsService } from 'src/app/services/procedureObjectifs/procedureObjectifs.service';
import { GeneralService } from 'src/app/services/services';

@Component({
  selector: 'app-add-proc-objectifs',
  templateUrl: './add-proc-objectifs.component.html',
  styleUrls: ['./add-proc-objectifs.component.scss']
})
export class AddProcObjectifsComponent {
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
  private procObjectifs_src: ProcedureObjectifsService,
) {
 const id = this.generalService.getProcedureID('list');
 
  this.clientForm = new FormGroup({
    Title: new FormControl(null, [Validators.required]),
    Description: new FormControl(null, [Validators.required]),
    ProcID :new FormControl(id)
  });
}


ngOnInit(): void {
 
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

get ProcesObjectifsFormErrors() {
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
 this.Ajouter = this.procObjectifs_src.InsertProcObjectifs(this.clientForm.value)
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
