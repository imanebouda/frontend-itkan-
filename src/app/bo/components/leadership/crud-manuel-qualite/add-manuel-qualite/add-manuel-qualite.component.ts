import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { GeneralService } from 'src/app/services/services';
import { MessageService } from 'primeng/api';
import { ManuelQualiteService } from 'src/app/services/manuelQualite/manuelQualite.service';

interface UploadEvent {
  originalEvent: Event;
  files: File[];
}

@Component({
  selector: 'app-add-manuel-qualite',
  templateUrl: './add-manuel-qualite.component.html',
  styleUrls: ['./add-manuel-qualite.component.scss']
})
export class AddManuelQualiteComponent {
 // Les variables globales
 Afficher_params: Subscription;
 Ajouter: Subscription;
 ShowDataMarque: Subscription;
 ShowDataTypeMarque: Subscription;
 SearchVehicule: Subscription;
 Restaurer: Subscription;
 @Output() FermerPopUp = new EventEmitter<boolean>();
 is_loading: boolean = false;
 has_access_yes: any = [];
 selectedItem: any;
 smqList: any = [];
 userList: any = [];
 userCoPilote: any = [];
 userPilote: any = [];
 categorieList: any = [];
 listMarqueDefault: any = [];
 listTypeMarqueDefault: any = [];
 uploadedFiles: any[] = [];

 // Les variables du formulaire
 clientForm: FormGroup;
 IsFiledClientForm: boolean = false;
 Ifmessage: boolean = false;
 Error: number = 0;
 ApiMessage: any;
 Disabled: boolean = false;

 constructor(
     private generalService: GeneralService,
     private processusService: ProcessusService,
     private ProcesDocuments_src: ProcesDocumentsService,
     private manuelQualite_src : ManuelQualiteService,
     private messageService: MessageService
 ) {

     this.clientForm = new FormGroup({
         libelle: new FormControl(null, [Validators.required]),
         smqID: new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
         version: new FormControl(null, [Validators.required]),
         description: new FormControl(null, [Validators.required]),
         dateApplication: new FormControl(null, [Validators.required]),
     });
 }

 ngOnInit(): void {
    this.getSMQ()
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

 onUpload(event: UploadEvent) {
     if (event.files && event.files.length > 0) {
         // Réinitialisez la liste des fichiers téléchargés
         this.uploadedFiles = [];
 
         for (let file of event.files) {
             this.uploadedFiles.push(file);
         }
     }
 }
 
 CallAddApi() {
     if (this.clientForm.invalid) {
         // Le formulaire est invalide, ne soumettez pas les données.
         return;
     }
     // Le formulaire est valide, soumettez les données.
     this.is_loading = true;
     this.Disabled = true;
     const formData = new FormData();  
     formData.append('file',this.uploadedFiles[0]);
     formData.append('libelle', this.clientForm.get('libelle').value);
     formData.append('smqID', this.clientForm.get('smqID').value);
     formData.append('version', this.clientForm.get('version').value);
     formData.append('description', this.clientForm.get('description').value);
     formData.append('dateApplication', this.clientForm.get('dateApplication').value.toISOString());
     this.Ajouter = this.manuelQualite_src.InsertMQdocuments(formData)
         .subscribe((response: any) => {
         if (response && response.codeReponse === 200) {
             this.success('Document ajoutée');
         } else {
             this.error(response.msg);
         }
     });
 }
 
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
