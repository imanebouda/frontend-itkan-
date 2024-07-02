import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { ParametrageService } from 'src/app/services/parametrages/parametrage.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html'
})
export class SettingComponent implements OnInit {
  /* ------------------------- Les variables globales ------------------------- */
  Afficher_excel: Subscription;
  Afficher: Subscription;
  Supprimer: Subscription;
  Afficher_params: Subscription;
  is_loading: boolean = true;
  /* ------------------------ les variables d'affichage ----------------------- */
  skip: any = 0;
  take: any = 10;
  order: any = 'asc';
  colone: any = 'label';
  totalRecords: any = 0;
  liste_parametrages: any[] = [];
  FormmulaireRecherche: FormGroup;
  /* ----------------- Les variables du popup ajout ou update ----------------- */
  Header_info: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  data_selected_parametrage: any;

  constructor(
      private generalService: GeneralService,
      private apiGeneralService: ApiGeneralService,
      private parametrage_service: ParametrageService
  ) {
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.FormmulaireRecherche = new FormGroup({
          label: new FormControl(null),
      });
  }

  ngOnInit(): void {
      this.Afficherparametrage();
  }


  /* -------------------------------------------------------------------------- */
  /*                       Les fonctions pour l'affichage                       */
  /* -------------------------------------------------------------------------- */

  ClearSearch() {
      this.FormmulaireRecherche.reset();
      setTimeout(() => {
          this.RechercherParametrage();
      }, 100);
  }

  RechercherParametrage() {
      this.skip = 0;
      this.take = 10;
      setTimeout(() => {
          this.Afficherparametrage();
      }, 100);
  }

  Afficherparametrage() {
      this.is_loading = true;
      let body: any = {
          colone: this.colone,
          order: this.order,
          skip: this.skip,
          take: this.take,
          label: this.FormmulaireRecherche.value.label,
      };
      this.Afficher = this.parametrage_service
          .AfficherParametrage(body)
          .subscribe((r: any) => {
              r = JSON.parse(r);
              if (
                  r.hasOwnProperty('msg') &&
                  r?.msg == 'success'
              ) {
                  this.liste_parametrages = r.hasOwnProperty('data')
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
          this.Afficherparametrage();
      }, 10);
  }

  Sort(event: any) {
      this.colone = event?.field;
      this.order = event?.order == -1 ? 'DESC' : 'asc';
      setTimeout(() => {
          this.Afficherparametrage();
      }, 10);
  }

  /* ----------------------- La fonction de suppression ----------------------- */
  SupprimerParametrage(utilisateur: any) {
      Swal.fire({
          title: 'Suppression',
          html: `<b>Êtes-vous sûr de vouloir supprimer parametrage : </b></br>  ${utilisateur?.label} ?`,
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
                  id: utilisateur?.id
              };
              this.is_loading = true;
              this.Supprimer = this.parametrage_service
                  .SupprimerParametrage(body)
                  .subscribe((r: any) => {
                      r = JSON.parse(r);
                      switch (r?.msg) {
                          case 'Supprimé':
                              this.Afficherparametrage();
                              this.generalService.errorSwal(
                                  'Parametrage supprimé !',
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

  ShowFormulaire(action: any, data_selected_parametrage: any = null) {
      if (action == 'Ajouté') {
          setTimeout(() => {
              this.if_show_ajouter = true;
          }, 100);
      } else if (action == 'modifier') {
          this.data_selected_parametrage = data_selected_parametrage;
          this.Header_info = `Modifier paramètre : (${data_selected_parametrage?.label})`;
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
          this.Afficherparametrage();
      }
  }

  /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
  CloseUpdate(event: boolean) {
      if (!event) {
          this.if_show_modifier = false;
      } else {
          this.if_show_modifier = false;
          this.Afficherparametrage();
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
