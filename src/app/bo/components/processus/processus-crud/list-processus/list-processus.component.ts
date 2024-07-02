import { ProcesDocumentsService } from './../../../../../services/procesDocuments/procesDocuments.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription, combineLatest, map } from 'rxjs';
import { OrganismService } from 'src/app/services/OrganismService/organismService.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { SharedDataService } from 'src/app/services/processus/sharedData.service';
import { GeneralService } from 'src/app/services/services';
import { OrganismesService } from 'src/app/services/utilisateurs/organismes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { DataService } from 'src/app/services/dataShared/data.service';


@Component({
  selector: 'app-list-processus',
  templateUrl: './list-processus.component.html',
  styleUrls: ['./list-processus.component.scss']
})
export class ListProcessusComponent {
 /* ------------------------- Les variables globales ------------------------- */
    // Afficher_excel: Subscription;
    ShowData: Subscription;
    delete: Subscription;
    // Afficher_params: Subscription;
    is_loading: boolean = true;
    if_show_doc: boolean = false;
    if_show_hist: boolean = false;
    if_show_cg: boolean = false;
    title: string;
    YearNow = new Date();
    /* ------------------------ les variables d'affichage ----------------------- */
    skip: any = 0;
    take: any = 10;
    order: any = 'DESC';
    colone: any = 'ID';
    totalRecords: any = 0;
    listDeclaration: any[] = [];
    categorieList: any = [];
    detailProcessus :any ;
    FormmulaireRecherche: FormGroup;
    imageUrl: any = 'assets/layout/images/user-cicrle.svg';
    selectedOdsToPrint: any;
    Afficher_params: Subscription;
    Header_info: any;
    if_show_ajouter: boolean = false;
    if_show_modifier: boolean = false;
    data_selected_ddp: any;
    if_show_detail: boolean = false;
    data_selected_phrasier: any;
    data_selected_processus: any;
    NamePilote: string ;
    processesWithPilots: any[]=[];

    constructor(
      private router: Router,
      public generalService: GeneralService,
      private processus_src : ProcessusService,
      private elementRef: ElementRef,
      private renderer: Renderer2,
      private processusService :ProcessusService,
      private ProcesDocuments_src : ProcesDocumentsService,
      private dataSharedService :  DataService 
   
  ) {
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.FormmulaireRecherche = new FormGroup({
          code: new FormControl(null),
          date: new FormControl(null),
          libelle: new FormControl(null),
          categorie: new FormControl(null)
      });
  }
  ngOnInit(): void {
    this.DisplayProcessus();
    this.getCategories();
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
      /* -------------------------------------------------------------------------- */
    /*                       Les fonctions pour l'affichage                       */
    /* -------------------------------------------------------------------------- */

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
          this.DisplayProcessus();
      }, 100);
  }

   DisplayProcessus() {
    this.is_loading = true;
  
    const code = this.FormmulaireRecherche.value.code;
    const libelle = this.FormmulaireRecherche.value.libelle;
    const categorie = this.FormmulaireRecherche.value.categorie;
    this.processus_src.GetProcessus(
      code,
      libelle,
      categorie,
      this.colone, // Assurez-vous que c'est bien "colonne" au lieu de "colone"
      this.order,
      this.take,
      this.skip
    ).subscribe(
      (response: any) => {
        try {
      
          if (response) {
            
            this.listDeclaration = response.data || [];
            this.totalRecords = response.TotalRows || 0;
          } else {
            this.generalService.errorSwal(response.Message);
          }
        } catch (error) {
          this.generalService.errorSwal('Une erreur inattendue s\'est produite.');
        } finally {
          this.is_loading = false;
        }
      },
      (error) => {
        this.generalService.errorSwal('Une erreur de communication avec le serveur s\'est produite.',error);
        this.is_loading = false;
      }
    );

    
  }

    /* -------------------------------------------------------------------------- */
/*                           telecharger document                              */
/* -------------------------------------------------------------------------- */
downloadDocument(procesDocumentId: number) {
  this.ProcesDocuments_src.DownloadProcesDocument(procesDocumentId).subscribe(
    (data: Blob) => {
      if (data && data.size > 0) {
        // Si les données ont une longueur supérieure à 0, téléchargez le document
        const blob = new Blob([data], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'Document Processus'; // Remplacez par le nom souhaité du fichier
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        // Affichez une alerte pour informer que le document est introuvable
        Swal.fire({
          title: 'Attention',
          text: 'Document introuvable.',
          icon: 'warning',
          confirmButtonText: 'OK'
        });
      }
    },
    (error: any) => {
      // Affichez une alerte pour informer de l'erreur
      Swal.fire({
        title: 'Attention',
        text: "Aucun document n'est disponible .",
        icon: 'warning',
        confirmButtonText: 'OK'
      });
      console.error(error); // Vous pouvez également afficher les détails de l'erreur dans la console
    }
  );
}



 
  DetailAnProcessus(p: any) {
    this.router.navigate(['processus/detail', p.ID]);
    this.dataSharedService.setSelectedItemId(p.ID)
  }

  paginate(event: any) {
      this.take = event?.rows;
      this.skip = event?.first;
      setTimeout(() => {
          this.DisplayProcessus();
      }, 10);
  }

  Sort(event: any) {
      this.colone = event?.field;
      this.order = event?.order == -1 ? 'DESC' : 'asc';
      setTimeout(() => {
          this.DisplayProcessus();
      }, 10);
  }


  /* ----------------------- La fonction de suppression -----------------------*/
  DeleteAnProcessus(p: any) {
    Swal.fire({
        title: 'Suppression',
        html: `<b> Êtes-vous sûr de vouloir supprimer Processus : </b></br>  ${p?.Code} ?`,
        icon: 'warning',
        showCancelButton: true,
        reverseButtons: true,
        cancelButtonText: 'Annuler',
        confirmButtonColor: '#258662',
        cancelButtonColor: '#f50707',
        confirmButtonText: 'Valider',
    }).then((result: any) => {
        if (result?.value) {
            let body: any = {
                ID: p?.ID,
            };
            this.is_loading = true;
            this.delete = this.processus_src
                .DeleteAnProcessus(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.generalService.errorSwal(
                                'Odeclaration supprimé !',
                                2000,
                                'success'
                            );
                            this.DisplayProcessus();
                            break;
                        default:
                            this.generalService.errorSwal(r?.msg);
                            this.is_loading = false;
                            break;
                    }
                }); // end subscribe
        } // fin if result swal
    }); // fin then swal 
}


/* -------------------------------------------------------------------------- */
/*                            Ajout ou modification                           */
/* -------------------------------------------------------------------------- */

ShowFormulaire(action: any, data_selected_ddp: any = null) {
    if (action == 'Ajouté') {
        setTimeout(() => {
            this.if_show_ajouter = true;
        }, 100);
    } else if (action == 'modifier') {
        this.data_selected_ddp = data_selected_ddp;
        this.Header_info = `${data_selected_ddp?.Libelle}`;
        setTimeout(() => {
            this.if_show_modifier = true;
        }, 100);
    }
}

/* ---------------- Férmeture du popup Ajout des utilisateurs ---------------- */
CloseAjouter(event: boolean) {
    if (!event) {
        this.if_show_ajouter = false;
    } else {
        this.if_show_ajouter = false;
        this.DisplayProcessus();
    }
}

/* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
CloseUpdate(event: boolean) {
    if (!event) {
        this.if_show_modifier = false;
    } else {
        this.if_show_modifier = false;
        this.DisplayProcessus();
    }
}

/* --------------------- Pour éviter les mémories leaks --------------------- */
ngOnDestroy(): void {
    let unsubscribeListe: any = [
        this.ShowData,
        // this.Afficher_excel,
        this.delete,
         this.Afficher_params,
    ];
    unsubscribeListe.forEach((element: any) => {
        if (element) {
            element?.unsubscribe();
        }
    });
}

goToStepInspection(id_ords: Number) {
    this.router.navigate(['/inspection/ajouter', id_ords]);
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
    }).then((result) => {
    });
}


checkRole() {
    if (this.generalService.get_DataSession("id_role") == environment.id_role_rtc)
        return true
    else
        return false
}

actualiserPage() {
    // Rechargez la page actuelle pour actualiser les données
    window.location.reload();
}



}
