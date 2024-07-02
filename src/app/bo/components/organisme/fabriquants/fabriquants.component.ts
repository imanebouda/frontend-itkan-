import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import Swal from 'sweetalert2';
import { FabriquantsService } from 'src/app/services/fabriquant/fabriquant.service';

@Component({
  selector: 'app-fabriquants',
  templateUrl: './fabriquants.component.html'
})
export class FabriquantsComponent {
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
  liste_fabriquants: any[] = [];
  FormmulaireRecherche: FormGroup;
  /* ----------------- Les variables du popup ajout ou update ----------------- */
  Header_info: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  if_show_detail: boolean = false;
  data_selected_fabriquant: any;

  constructor(
      public generalService: GeneralService,
      private fabriquantService: FabriquantsService
  ) {
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.FormmulaireRecherche = new FormGroup({
        label: new FormControl(null),
      });
  }

  ngOnInit(): void {
    this.AfficherFabriquant();
  }

  /* -------------------------------------------------------------------------- */
  /*                       Les fonctions pour l'affichage                       */
  /* -------------------------------------------------------------------------- */

  ClearSearch() {
    this.FormmulaireRecherche.reset();
    setTimeout(() => {
        this.RechercherFabriquant();
    }, 100);
  }

  ShowDetailFabriquant(data_selected_fabriquant: any = null){
    this.data_selected_fabriquant = this.data_selected_fabriquant;
    this.if_show_detail=true;
  }

  RechercherFabriquant() {
    this.skip = 0;
    this.take = 10;
    setTimeout(() => {
        this.AfficherFabriquant();
    }, 100);
  }

  AfficherFabriquant() {
    this.is_loading = true;
    let body: any = {
        colone: this.colone,
        order: this.order,
        skip: this.skip,
        take: this.take,
        label: this.FormmulaireRecherche.value.label,
    };
    this.Afficher = this.fabriquantService
        .AfficherFabriquant(body)
        .subscribe((r: any) => {
            r = JSON.parse(r);
            if (r.hasOwnProperty('msg') && r?.msg == 'success') {
                this.liste_fabriquants = r.hasOwnProperty('data')
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
        this.AfficherFabriquant();
    }, 10);
  }

  Sort(event: any) {
    this.colone = event?.field;
    this.order = event?.order == -1 ? 'DESC' : 'asc';
    setTimeout(() => {
        this.AfficherFabriquant();
    }, 10);
  }

  /* ----------------------- La fonction de suppression ----------------------- */
  SupprimerFabriquant(fabriquant: any) {
    Swal.fire({
        title: 'Suppression',
        html: `<b>Êtes-vous sûr de vouloir supprimer fabriquant : </b></br>  ${fabriquant?.name} ?`,
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
                id: fabriquant?.id,
            };
            this.is_loading = true;
            this.Supprimer = this.fabriquantService
                .SupprimerFabriquant(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.AfficherFabriquant();
                            this.generalService.errorSwal(
                                'Equipement supprimé !',
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

  ShowFormulaire(action: any, data_selected_fabriquant: any = null) {
    
    if (action == 'Ajouté') {
        setTimeout(() => {
            this.if_show_ajouter = true;
        }, 100);      
    } else if (action == 'modifier') {
        this.data_selected_fabriquant = data_selected_fabriquant;
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
        this.AfficherFabriquant();
    }
  }

  /* ---------------- Férmeture du popup Update des equipements ---------------- */
  CloseUpdate(event: boolean) {
    if (!event) {
        this.if_show_modifier = false;
    } else {
        this.if_show_modifier = false;
        this.AfficherFabriquant();
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
