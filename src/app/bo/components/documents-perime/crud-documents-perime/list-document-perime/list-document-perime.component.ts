import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcedureService } from 'src/app/services/Procedure/procedure.service';
import { ManuelQualiteService } from 'src/app/services/manuelQualite/manuelQualite.service';
import { PolitiqueQualiteService } from 'src/app/services/politiqueQualite/politiqueQualite.service';
import { ProcDocumentsService } from 'src/app/services/procDocuments/procDocuments.service';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { ProcessusObjectifsService } from 'src/app/services/processusObjectifs/processusObjectifs.service';
import { GeneralService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-document-perime',
  templateUrl: './list-document-perime.component.html',
})
export class ListDocumentPerimeComponent {
  ShowData: Subscription;
  delete: Subscription;
  is_loading: boolean = true;
  if_show_doc: boolean = false;
  if_show_hist: boolean = false;
  if_show_cg: boolean = false;
  title: string;
  YearNow = new Date();
  skip: any = 0;
  take: any = 10;
  order: any = 'DESC';
  colone: any = 'ID';
  totalRecords: any = 0;
  listProcesObjectifs: any[] = [];
  detailProcessus: any;
  FormmulaireRecherche: FormGroup;
  selectedOdsToPrint: any;
  Header_info: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  data_selected_ddp: any;
  if_show_detail: boolean = false;
  data_selected_phrasier: any;
  data_selected_processus: any;
  NamePilote: string;
  processesWithPilots: any[] = [];
  menu_items: any[] = [];
  items: any[] = [{ label: null, link: null }];
  Subscription_router: Subscription;
  processusId: number;
  data_selected_proces_documents : any;
  Detail_info : any ;
  listProcesDocuments: any;
  Afficher_params : any ;
  processusList : any ;
  procedureList : any ;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public generalService: GeneralService,
    private procesDocumentsService: ProcesDocumentsService,
    private procDocumentsService: ProcDocumentsService,
    private manuelQualite_src: ManuelQualiteService,
    private politiqueQualite_src: PolitiqueQualiteService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private processus_src: ProcessusService,
    private procedure_src :ProcedureService
  ) {
    this.FormmulaireRecherche = new FormGroup({
      code : new FormControl(null),
      version : new FormControl(null),
      libelle: new FormControl(null),
      date: new FormControl(null),
      Processus_ID: new FormControl(null),
      Procedure_ID :new FormControl(null),
      MQ: new FormControl(false),  
      PQ: new FormControl(false) 
    });
  }

  ngOnInit() {
   this.getDetailProcessus();
   this.DisplayDocument();
   this.GetAllProcessus();
  }

  triggerButtonClick() {
    const buttonElement =
      this.elementRef.nativeElement.querySelector('#myButton');
    this.renderer.selectRootElement(buttonElement).click();
  }
  
  onButtonClick(ods: any) {
    const data: any = ods;
    this.selectedOdsToPrint = data;
    this.title = ods.reference;
    setTimeout(() => {
      this.triggerButtonClick();
    }, 200);
  }

  ClearSearch() {
    this.FormmulaireRecherche.reset();
    setTimeout(() => {
      this.SearchProcessus();
    }, 100);
  }

  SearchProcessus() {
    this.skip = 0;
    this.take = 10;
    setTimeout(() => {
      this.DisplayDocument();
    }, 100);
  }

  ShowDetailProcessusDocument(data_selected_proces_documents : any = null){
    this.Detail_info = "Détail du document: "  ;
    console.log(data_selected_proces_documents);
    this.data_selected_proces_documents  = data_selected_proces_documents ;
    this.if_show_detail=true;
  }

  DisplayDocument() {
    this.is_loading = true;
    const code  = this.FormmulaireRecherche.value.code;
    const version = this.FormmulaireRecherche.value.version;
    const libelle = this.FormmulaireRecherche.value.libelle;
    const dateDebut = this.FormmulaireRecherche.value.date
      ? this.FormmulaireRecherche.value.date[0]
      : null;
    const dateFin = this.FormmulaireRecherche.value.date
      ? this.FormmulaireRecherche.value.date[1]
      : null;
    const processusID  = this.FormmulaireRecherche.value.Processus_ID;
    const procedureID  = this.FormmulaireRecherche.value.Procedure_ID;
    const PQ = this.FormmulaireRecherche.value.PQ;
    const MQ = this.FormmulaireRecherche.value.MQ;
    console.log(PQ);
    console.log(MQ);
    this.procesDocumentsService
      .GetDocumentsPerime(
        procedureID,
        processusID,
        MQ,
        PQ,
        dateDebut,
        dateFin,
        code,
        version,
        libelle,
        this.colone,
        this.order,
        this.take,
        this.skip
      ).subscribe(
        (response: any) => {
          try {
            if (response) {
              console.log(response)
              this.listProcesDocuments = response.data || [];
              this.totalRecords = response.TotalRows || 0;
            } else {
              this.generalService.errorSwal(response.Message);
            }
          } catch (error) {
            this.generalService.errorSwal(
              'Une erreur inattendue s\'est produite.'
            );
          } finally {
            this.is_loading = false;
          }
        },
        (error) => {
          this.generalService.errorSwal(
            'Une erreur de communication avec le serveur s\'est produite.',
            error
          );
          this.is_loading = false;
        }
      );
  }
  
  getDetailProcessus() {
    const id = this.generalService.getProcessusID('list');
    this.is_loading = true; // Afficher un indicateur de chargement
  
    this.processus_src.getDetailProcessus(id).subscribe(
      (response: any) => {
        try {
          if (response && response.IsSucceed) {
            this.detailProcessus = response.data || [];
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

  GetAllProcessus() {
    this.Afficher_params = this.processus_src.GetAllProcessus().subscribe((res: any) => {
      console.log(res);
      if (res) {
        /* -------------------------------- Les rôles ------------------------------- */
        if (res.length > 0) {
          this.processusList  = res.map((element: any) => ({
            value: element.id,
            label: element.libelle // Utilisez libelle au lieu de label si c'est le nom correct de la propriété
          }));
        }
      } else {
        this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
      }
    });
  }
  

// Appel à la méthode getSMQ pour récupérer les SMQ
getProceduresByProcessusId(ID : number) {
  this.Afficher_params = this.procedure_src.getAllProcedureByIdProces(ID).subscribe((res: any) => {
    if (res.codeReponse === 200) {
      /* -------------------------------- Les rôles ------------------------------- */
      if (res.data) {
        this.procedureList  = res.data.map((element: any) => ({
          value: element.ID,
          label: element.Libelle
        }));
      }
    } else {
      this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
    }
  });
}

onProcessusChange(event: any) {
  const selectedProcessusId = event.value;
  this.getProceduresByProcessusId(selectedProcessusId);
}


StatutAnProcessusDocuments(p: any) {
  console.log(p)
  const formData = new FormData();  
  formData.append('documentId', p.ID);
  if (p.Processus && p.Processus.ID) {
    formData.append('id', p.Processus.ID); 
  } else if (p.Procedure && p.Procedure.ID) {
    formData.append('id', p.Procedure.ID); 
  } // Utilise p.ProcID s'il est défini, sinon utilise p.ProcessusID
  formData.append('documentType', p.TypeDocument);
  console.log(formData)

  this.procesDocumentsService.DocumentContainsValidDocument(formData).subscribe((hasValidDocument: boolean) => {
      if (hasValidDocument) {
          // Un document non périmé a été trouvé, afficher un message d'avertissement
          Swal.fire({
              title: "Document Validation",
              html: `<b>Attention:</b></br> Un document non périmé a été trouvé pour ${p?.Libelle}. </b></br> Êtes-vous sûr de vouloir désarchiver ce document?`,
              icon: 'warning',
              showCancelButton: true,
              reverseButtons: true,
              cancelButtonText: 'Annuler',
              confirmButtonColor: '#258662',
              cancelButtonColor: '#f50707',
              confirmButtonText: 'Valider',
          }).then((result: any) => {
              if (result?.value) {
                  // Mettre à jour l'état du document
                  this.updatePerimeState(p);
              }
          });
      } else {
          // Aucun document non périmé n'a été trouvé, procéder à la validation directement
          this.updatePerimeState(p);
      }
  });
}

updatePerimeState(p: any) {
  Swal.fire({
    title: ' Désarchiver le document',
    html: `<b>Êtes-vous sûr de vouloir désarchiver ce document  : </b></br>  ${p?.Libelle} ?`,
    icon: 'warning',
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#258662',
    cancelButtonColor: '#f50707',
    confirmButtonText: 'Valider',
  }).then((result: any) => {
    if (result?.value) {
      const body: any = {
        documentId: p?.ID,
        newState: p?.Perime
      };

      this.is_loading = true;
      let service;
      if (p.TypeDocument === "ProcesDocuments") {
        service = this.procesDocumentsService.StatutAnProcessusDocuments(body);
      } else if (p.TypeDocument === "ProcDocuments") {
        service = this.procDocumentsService.StatutAnProcedureDocuments(body);
      } else if (p.TypeDocument === "MQDocuments") {
        service = this.manuelQualite_src.StatutAnMQDocuments(body);
      } else if (p.TypeDocument === "PQDocuments") {
        service = this.politiqueQualite_src.StatutAnPQDocuments(body);
      }

      this.delete = service.subscribe((r: any) => {
        r = JSON.parse(r);
        switch (r?.msg) {
          case 'Modifié':
            this.DisplayDocument();
            this.actualiserPage();
            this.generalService.errorSwal(
              "L'état de Périmé a été mis à jour avec succès!",
              2000,
              'success'
            );
            break;
          default:
            this.generalService.errorSwal(r?.msg);
            this.is_loading = false;
            break;
        }
      });
    }
  });
}



/* ----------------------- La fonction de suppression -----------------------*/
DeleteAnDocuments(p: any) {
  Swal.fire({
    title: 'Suppression',
    html: `<b> Êtes-vous sûr de vouloir supprimer du Document : </b></br>  ${p?.Libelle} ?`,
    icon: 'warning',
    showCancelButton: true,
    reverseButtons: true,
    cancelButtonText: 'Annuler',
    confirmButtonColor: '#258662',
    cancelButtonColor: '#f50707',
    confirmButtonText: 'Valider',
  }).then((result: any) => {
    if (result?.value) {
      const body: any = { ID: p?.ID };
       this.is_loading = true;
      let service;
      if (p.TypeDocument === "ProcesDocuments") {
        service = this.procesDocumentsService.StatutAnProcessusDocuments(body);
      } else if (p.TypeDocument === "ProcDocuments") {
        service = this.procDocumentsService.StatutAnProcedureDocuments(body);
      } else if (p.TypeDocument === "MQDocuments") {
        service = this.manuelQualite_src.StatutAnMQDocuments(body);
      } else if (p.TypeDocument === "PQDocuments") {
        service = this.politiqueQualite_src.StatutAnPQDocuments(body);
      }

      this.delete = service.subscribe((r: any) => {
        r = JSON.parse(r);
        switch (r?.msg) {
          case 'Supprimé':
            this.DisplayDocument();
            this.generalService.errorSwal('Document supprimé !', 2000, 'success');
            break;
          default:
            this.generalService.errorSwal(r?.msg);
            this.is_loading = false;
            break;
        }
      });
    }
  });
}



  paginate(event: any) {
    this.take = event?.rows;
    this.skip = event?.first;
    setTimeout(() => {
      this.DisplayDocument();
    }, 10);
  }

  Sort(event: any) {
    this.colone = event?.field;
    this.order = event?.order == -1 ? 'DESC' : 'asc';
    setTimeout(() => {
      this.DisplayDocument();
    }, 10);
  }

  ShowFormulaire(action: any, data_selected_ddp: any = null) {
    if (action == 'Ajouté') {
      setTimeout(() => {
        this.if_show_ajouter = true;
      }, 100);
    } else if (action == 'modifier') {
      this.data_selected_ddp = data_selected_ddp;
      this.Header_info = `Modifier l'objectif : (${data_selected_ddp?.Title})`;
      setTimeout(() => {
        this.if_show_modifier = true;
      }, 100);
    }
  }

  CloseAjouter(event: boolean) {
    if (!event) {
      this.if_show_ajouter = false;
    } else {
      this.if_show_ajouter = false;
      this.DisplayDocument();
    }
  }

  CloseUpdate(event: boolean) {
    if (!event) {
      this.if_show_modifier = false;
    } else {
      this.if_show_modifier = false;
      this.DisplayDocument();
    }
  }

 

  goToStepInspection(id_ords: Number) {
    this.router.navigate(['/inspection/ajouter', id_ords]);
  }

  message(message: any, error: boolean) {
    Swal.fire({
      title: message,
      icon: error ? 'warning' : 'success',
      showCancelButton: false,
      confirmButtonColor: '#5664d2',
      cancelButtonColor: '#FD991D',
      confirmButtonText: ' <i class="pi pi-check-circle"></i> ' + 'OK',
      reverseButtons: true,
      allowOutsideClick: error ? true : false,
    }).then((result) => {});
  }

  checkRole() {
    if (this.generalService.get_DataSession('id_role') == environment.id_role_rtc)
      return true;
    else return false;
  }

  actualiserPage() {
    window.location.reload();
  }

  onItemClick(event: any) {
    if (event?.item) {
        if (event?.item?.link && event?.item?.link == '/accueil') {
            this.generalService.is_loading = true;
            this.router.navigate([event?.item?.link]).then(() => {
                this.generalService.currentMenu = event?.item?.link;
                setTimeout(() => {
                    this.generalService.is_loading = false;
                }, 250);
            });
        }
    }
}





ngOnDestroy(): void {
    let unsubscribe_liste: any[] = [this.Subscription_router, this.delete];
    unsubscribe_liste.forEach((element: any) => {
        if (element) {
            element.unsubscribe();
        }
    });
}

}
