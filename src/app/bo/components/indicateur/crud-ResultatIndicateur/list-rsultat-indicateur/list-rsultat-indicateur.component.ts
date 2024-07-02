import { ProcessusService } from 'src/app/services/processus/processus.service';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, combineLatest, map } from 'rxjs';
import { GeneralService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { ResultatIndicateurService } from 'src/app/services/resultatIndicateurs/resultatIndicateurs.service';
import { Location } from '@angular/common';
import { DataService } from 'src/app/services/dataShared/data.service';
@Component({
  selector: 'app-list-rsultat-indicateur',
  templateUrl: './list-rsultat-indicateur.component.html',
  styleUrls: ['./list-rsultat-indicateur.component.scss']
})
export class ListRsultatIndicateurComponent {
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
    data_selected_ResultatIndicateur: any;
    NamePilote: string ;
    processesWithPilots: any[]=[];
    listIndicateursResultat : any ;
    Detail_info : any ;
    date: Date = new Date();
    listAnnee : number[] =[this.getCurrentYear(),this.getCurrentYear()-1];
    data_selected_Resultat_indicateur : any;
    detailProcessus :any ;
    selectedItemId: number = 0;
    subscription: Subscription;

    constructor(
      private router: Router,
      private elementRef: ElementRef,
      private renderer: Renderer2,
      private resultatIndicateurService : ResultatIndicateurService,
      public generalService: GeneralService,
      public processus_src :ProcessusService,
      private location: Location,
      private dataService: DataService
   
  ) {
    this.subscription = this.dataService.selectedItemId$.subscribe(id => {
      this.selectedItemId = id;
      // Faire quelque chose avec l'ID, par exemple, charger des données en fonction de cet ID
    });
    this.FormmulaireRecherche = new FormGroup({
      periode: new FormControl(null),
      annee: new FormControl(null),
  });
  
  }
  ngOnInit(): void {
    console.log('selectedItemId',this.selectedItemId);
    this.getDetailProcessus(this.selectedItemId)
    this.DisplayIndicateursResultat();
  }

  getCurrentYear(): number {
    return new Date().getFullYear();
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
          this.SearchResultatIndicateur();
      }, 100);
  }

  SearchResultatIndicateur() {
      this.skip = 0;
      this.take = 10;
      setTimeout(() => {
          this.DisplayIndicateursResultat();
      }, 100);
  }

   DisplayIndicateursResultat() {
    this.is_loading = true;
    const id = this.generalService.getProcessusID('detail'); 
    const periode = this.FormmulaireRecherche.value.periode;
    const annee = this.FormmulaireRecherche.value.annee;
    this.resultatIndicateurService.GetIndicateursResultat(
      id ,
      periode,
      annee,
      this.colone, // Assurez-vous que c'est bien "colonne" au lieu de "colone"
      this.order,
      this.take,
      this.skip
      ).subscribe(
      (response: any) => {
        try {
          if (response) {
            console.log('response : ',response)
            this.listIndicateursResultat = response.data || [];     
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
   /* ----------------------- La fonction de suppression -----------------------*/
   DeleteAnResultatIndicateur(p: any) {
    Swal.fire({
        title: 'Suppression',
        html: `<b> Êtes-vous sûr de vouloir supprimer Résultat indicateur : </b></br>  ${p?.Periode} ?`,
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
            this.delete = this.resultatIndicateurService
                .DeleteAnIndicateursResultat(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.DisplayIndicateursResultat();
                            this.generalService.errorSwal(
                                ' Résultat indicateur supprimé !',
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

ShowDetailResulatIndicateur(data_selected_Resultat_indicateur: any = null) {
  this.Detail_info = 'Détail Résultat Indicateur : '
  this.data_selected_Resultat_indicateur = data_selected_Resultat_indicateur;
  this.if_show_detail = true;
}


  paginate(event: any) {
    this.take = event?.rows;
    this.skip = event?.first;
    setTimeout(() => {
        this.DisplayIndicateursResultat();
    }, 10);
}

Sort(event: any) {
    this.colone = event?.field;
    this.order = event?.order == -1 ? 'DESC' : 'asc';
    setTimeout(() => {
        this.DisplayIndicateursResultat();
    }, 10);
}

getDetailProcessus(id : any) {
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
        this.Header_info = `Modifier  Résultat  :`;
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
      this.DisplayIndicateursResultat();
  }
}

/* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
CloseUpdate(event: boolean) {
  if (!event) {
      this.if_show_modifier = false;
  } else {
      this.if_show_modifier = false;
      this.DisplayIndicateursResultat();
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


