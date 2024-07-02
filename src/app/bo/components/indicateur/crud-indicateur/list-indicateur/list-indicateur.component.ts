
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, combineLatest, map } from 'rxjs';
import { OrganismService } from 'src/app/services/OrganismService/organismService.service';
import { GeneralService } from 'src/app/services/services';
import { OrganismesService } from 'src/app/services/utilisateurs/organismes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { Observable, of } from 'rxjs';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { IndicateurService } from 'src/app/services/indicateurs/indicateur.service';
import { MenuVisibilityService } from 'src/app/services/dataShared/menu-visibility.service';

@Component({
  selector: 'app-list-indicateur',
  templateUrl: './list-indicateur.component.html',
  styleUrls: ['./list-indicateur.component.scss']
})
export class ListIndicateurComponent {
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
    listIndicateur: any[] = [];
    categorieList: any = [];
    detailProcedure :any ;
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
    data_selected_Procedure: any;
    NamePilote: string ;
    processesWithPilots: any[]=[];
    detailProcessus : any ;
    listFrequence : string[] = ["Annuelle","Semestrielle", "Quadrimestrielle","Trimestrielle", "Mensuelle"];
  items: { label: string; link: string; }[];
  menu_items: { label: string; icon: string; route: string; command: (e: any) => void; }[];


    constructor(
      private router: Router,
      public generalService: GeneralService,
      private  processus_src : ProcessusService,
      private elementRef: ElementRef,
      private renderer: Renderer2,
      private indicateurService :IndicateurService,
      private ProcesDocuments_src : ProcesDocumentsService,
      private menuVisibilityService: MenuVisibilityService
  ) {
    const initialUrl = this.router.url;
    this.menuVisibilityService.setMenuVisibility(this.shouldShowMenu(initialUrl));
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.FormmulaireRecherche = new FormGroup({
          frequence: new FormControl(null),
          libelle: new FormControl(null),
      });
    }
  ngOnInit(): void {
    this.getDetailProcessus();
    this.DisplayIndicateur();
    const initialUrl = this.router.url;
    this.menuVisibilityService.setMenuVisibility(this.shouldShowMenu(initialUrl));
  }

  shouldShowMenu(url: string): boolean {    
    return url.startsWith('/Indicateurs/list'); 
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
          this.SearchProcedure();
      }, 100);
  }

  SearchProcedure() {
      this.skip = 0;
      this.take = 10;
      setTimeout(() => {
          this.DisplayIndicateur();
      }, 100);
  }

   DisplayIndicateur() {
    this.is_loading = true;
    const id = this.generalService.getIndicateurID('list');
    const frequence = this.FormmulaireRecherche.value.frequence;
    console.log(frequence);
    const titre = this.FormmulaireRecherche.value.libelle;
    
    this.indicateurService.GetIndicateurs(
      id,
      titre,
      frequence,
      this.colone, // Assurez-vous que c'est bien "colonne" au lieu de "colone"
      this.order,
      this.take,
      this.skip
    ).subscribe(
      (response: any) => {
        try {
      
          if (response) {          
            this.listIndicateur = response.data || [];  
            console.log("listIndicateur",this.listIndicateur); 
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
  this.ProcesDocuments_src.DownloadProcesDocument(procesDocumentId).subscribe((data: Blob) => {
    const blob = new Blob([data], { type: 'application/octet-stream' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Document Procedure'; // Remplacez par le nom souhaité du fichier
    a.click();
    window.URL.revokeObjectURL(url);
  });
}


 
  DetailAnProcedure(p: any) {
    this.router.navigate(['Indicateurs/detail', p.ID]);
  }

  paginate(event: any) {
      this.take = event?.rows;
      this.skip = event?.first;
      setTimeout(() => {
          this.DisplayIndicateur();
      }, 10);
  }

  Sort(event: any) {
      this.colone = event?.field;
      this.order = event?.order == -1 ? 'DESC' : 'asc';
      setTimeout(() => {
          this.DisplayIndicateur();
      }, 10);
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



  /* ----------------------- La fonction de suppression -----------------------*/
  DeleteAnProcedure(p: any) {
    Swal.fire({
        title: 'Suppression',
        html: `<b> Êtes-vous sûr de vouloir supprimer indicateur : </b></br>  ${p?.Libelle} ?`,
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
            this.delete = this.indicateurService
                .DeleteAnIndicateur(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.DisplayIndicateur();
                            this.generalService.errorSwal(
                                'Indicateur supprimé !',
                                2000,
                                'success'
                            );
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
        this.Header_info = `Modification de l'indicateur`;
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
        this.DisplayIndicateur();
    }
}

/* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
CloseUpdate(event: boolean) {
    if (!event) {
        this.if_show_modifier = false;
    } else {
        this.if_show_modifier = false;
        this.DisplayIndicateur();
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
