import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import Swal from 'sweetalert2';
import { TaillesService } from 'src/app/services/tailles/taille.service';

@Component({
  selector: 'app-tailles',
  templateUrl: './tailles.component.html'
})
export class TaillesComponent {
  /* ------------------------- Les variables globales ------------------------- */
  Afficher_excel: Subscription;
  Afficher: Subscription;
  Supprimer: Subscription;
  Afficher_params: Subscription;
  is_loading: boolean = false;
  /* ------------------------ les variables d'affichage ----------------------- */
  skip: any = 0;
  take: any = 10;
  order: any = 'asc';
  colone: any = 'label';
  totalRecords: any = 0;
  liste_tailles: any[] = [];
  FormmulaireRecherche: FormGroup;
  /* ----------------- Les variables du popup ajout ou update ----------------- */
  Header_info: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  if_show_detail: boolean = false;
  data_selected_taille: any;

  constructor(
      public generalService: GeneralService,
      private tailleService: TaillesService
  ) {
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.FormmulaireRecherche = new FormGroup({
        label: new FormControl(null),
      });
  }

  ngOnInit(): void {
    this.AfficherTaille();
  }

  /* -------------------------------------------------------------------------- */
  /*                       Les fonctions pour l'affichage                       */
  /* -------------------------------------------------------------------------- */

  ClearSearch() {
    this.FormmulaireRecherche.reset();
    setTimeout(() => {
        this.RechercherTaille();
    }, 100);
  }

  ShowDetailTaille(data_selected_taille: any = null){
    this.data_selected_taille = this.data_selected_taille;
    this.if_show_detail=true;
  }

  RechercherTaille() {
    this.skip = 0;
    this.take = 10;
    setTimeout(() => {
        this.AfficherTaille();
    }, 100);
  }

  AfficherTaille() {
    this.is_loading = true;
    let body: any = {
        colone: this.colone,
        order: this.order,
        skip: this.skip,
        take: this.take,
        label: this.FormmulaireRecherche.value.label,
    };
    this.Afficher = this.tailleService
        .AfficherTaille(body)
        .subscribe((r: any) => {
            r = JSON.parse(r);
            if (r.hasOwnProperty('msg') && r?.msg == 'success') {
                this.liste_tailles = r.hasOwnProperty('data')
                    ? r?.['data']
                    : [];
                this.totalRecords = r.hasOwnProperty('TotalRows')
                    ? r?.['TotalRows']
                    : 0;
                this.is_loading = false;
            } else {
                this.generalService.errorSwal(r?.msg);
                this.is_loading = false;
            }
        });
  }

  paginate(event: any) {
    this.take = event?.rows;
    this.skip = event?.first;
    setTimeout(() => {
        this.AfficherTaille();
    }, 10);
  }

  Sort(event: any) {
    this.colone = event?.field;
    this.order = event?.order == -1 ? 'DESC' : 'asc';
    setTimeout(() => {
        this.AfficherTaille();
    }, 10);
  }

  /* ----------------------- La fonction de suppression ----------------------- */
  SupprimerTaille(taille: any) {
    Swal.fire({
        title: 'Suppression',
        html: `<b>Êtes-vous sûr de vouloir supprimer taille : </b></br>  ${taille?.name} ?`,
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
                id: taille?.id,
            };
            this.is_loading = true;
            this.Supprimer = this.tailleService
                .SupprimerTaille(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.AfficherTaille();
                            this.generalService.errorSwal(
                                'taille supprimé !',
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

  ShowFormulaire(action: any, data_selected_taille: any = null) {
    
    if (action == 'Ajouté') {
        setTimeout(() => {
            this.if_show_ajouter = true;
        }, 100);      
    } else if (action == 'modifier') {
        this.data_selected_taille = data_selected_taille;
        setTimeout(() => {
            this.if_show_modifier = true;
        }, 100);
    }
  }

  /* ---------------- Férmeture du popup Ajout des equipements ---------------- */
  CloseAjouter(event: boolean) {
    if (!event) {
        this.if_show_ajouter = false;
    } else {
        this.if_show_ajouter = false;
        this.AfficherTaille();
    }
  }

  /* ---------------- Férmeture du popup Update des equipements ---------------- */
  CloseUpdate(event: boolean) {
    if (!event) {
        this.if_show_modifier = false;
    } else {
        this.if_show_modifier = false;
        this.AfficherTaille();
    }
  }

  /* --------------------- Pour éviter les mémories leaks --------------------- */
  ngOnDestroy(): void {
    let unsubscribeListe: any = [
        this.Afficher,
        this.Afficher_excel,
        this.Supprimer,
        this.Afficher_params,
    ];
    unsubscribeListe.forEach((element: any) => {
        if (element) {
            element?.unsubscribe();
        }
    });
  }
}
