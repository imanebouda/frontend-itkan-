import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardsService } from 'src/app/services/dashboard/dashboards.service';
import * as moment from "moment"
import { GeneralService, UtilisateursService } from 'src/app/services/services';
import Swal from 'sweetalert2';
import { ResultatIndicateurService } from 'src/app/services/resultatIndicateurs/resultatIndicateurs.service';

@Component({
  selector: 'app-list-tableuau-result-indicateur',
  templateUrl: './list-tableuau-result-indicateur.component.html',
  styleUrls: ['./list-tableuau-result-indicateur.component.scss']
})
export class ListTableuauResultIndicateurComponent {
  delete: Subscription;
  items!: MenuItem[];
  ShowData: Subscription;
  Afficher:Subscription;
  chartData: any;
  chartOptions: any;
  chartDataODSENCOURS: any;
  chartOptionsODSENCOURS: any;
  chartDataODSRE: any;
  chartOptionsODSRE: any;
  chartDataFAV: any;
  chartOptionsFAV: any;
  chartDataDEFAV: any;
  chartOptionsDEFAV: any;
  subscription!: Subscription;
  dataOrds: any;
  is_loading: boolean = false;
  visible: boolean = false;
  showReclamation: boolean = false;
  HeaderInfo: any;
  data_selected_ords: any
  DateNow = new Date();
  dateStart: Date[] = [new Date(), new Date(this.DateNow.getFullYear(), this.DateNow.getMonth() + 1, 0)];
  id_verificateur:any=null;
  liste_verificateurs: any[] = []
  ShowDataIndicateurs: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  data_selected_ddp: any;
  Header_info:any;
  lineData: any;
  barData: any;
  pieData: any;
  polarData: any;
  radarData: any;
  lineOptions: any;
  barOptions: any;
  pieOptions: any;
  polarOptions: any;
  radarOptions: any;
  selectedAction: string;

  constructor(
      public layoutService: LayoutService,
      private srv_dashboards: DashboardsService,
      private resultatIndicateurService : ResultatIndicateurService,
      public generalService: GeneralService,
  ) {

  }

  ngOnInit() {
      this.tablauxIndicateurs();
  }
  

  tablauxIndicateurs() {
      const Annee = new Date().getFullYear() // Utilisez getFullYear() pour obtenir l'année actuelle
      this.srv_dashboards.TableauxResultIndicateur(Annee)
          .subscribe((r: any) => {
              try {          
                  this.ShowDataIndicateurs = r.data;
                  console.log('this.showDataIndicateurs',this.ShowDataIndicateurs);
              } catch (error) {
                  console.error("Erreur lors de l'analyse de la réponse JSON :", error);
                  // Gérez l'erreur d'analyse JSON ici si nécessaire
              }
          });
  }

  CloseAjouter(event: boolean) {
      if (!event) {
          this.if_show_ajouter = false;
      } else {
          this.if_show_ajouter = false;
          this.tablauxIndicateurs();
      }
    }

    /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
CloseUpdate(event: boolean) {
    if (!event) {
        this.if_show_modifier = false;
    } else {
        this.if_show_modifier = false;
        this.tablauxIndicateurs();
    }
  }

  hasResultForPeriode(resultats: any[], mois: string): boolean {
      return resultats.some(r => r.Periode.toLowerCase() === mois.toLowerCase());
  }
  
  getResultForPeriode(resultats: any[], mois: string): any {
      return resultats.find(r => r.Periode.toLowerCase() === mois.toLowerCase());
  }

  getColorClass(resultat: any, mois: string, cible: number): string {
      const result = this.getResultForPeriode(resultat, mois);
      if (result == null) {
        return 'bg-yellow';
      } else if (result.Resultat >= cible) {
        return 'bg-green';
      } else {
        return 'bg-red';
      }
    }
  

 
 
  /* -------------------------------------------------------------------------- */
/*                            Ajout ou modification                           */
/* -------------------------------------------------------------------------- */

ShowFormulaire(action: string, data_selected_ddp: any = null, resultatIndicateur :any) {
    if (action == 'Ajouté') {
        data_selected_ddp.resultatIndicateur = resultatIndicateur;
        this.data_selected_ddp = data_selected_ddp;
        this.Header_info = `Ajouter Résultat indicateur : ` + resultatIndicateur ;
        setTimeout(() => {
            this.if_show_ajouter = true;
        }, 100);
    } else if (action == 'Modifier') {
        data_selected_ddp.resultatIndicateur = resultatIndicateur;
        this.data_selected_ddp = data_selected_ddp;
        this.Header_info = `Modifier  Résultat indicateur :` + resultatIndicateur?.Periode;
        setTimeout(() => {
            this.if_show_modifier = true;
        }, 100);
    }
}

ModifyResultatIndicateur(p: any, mois: string) {
    const resultatIndicateur = p.Resultats.find((r: any) => r.Periode.toLowerCase() === mois.toLowerCase());
    Swal.fire({
      title: 'Action',
      text: `Que voulez-vous faire avec le Résultat indicateur pour la période de ${mois} ?`,
      icon: 'question',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Modifier',
      cancelButtonText: 'Supprimer',
      cancelButtonColor: '#d33',
      reverseButtons: true,
      preConfirm: (choice) => {
        return Promise.resolve(choice);
      }
    }).then((dialogResult) => {
      if (dialogResult.isConfirmed === false) {
        this.DeleteAnResultatIndicateur(resultatIndicateur);
      } else if (dialogResult.isConfirmed === true) {
        this.ShowFormulaire('Modifier', p, resultatIndicateur);
      } else {
        console.log('Opération annulée ou inattendue');
      }
    }).catch(error => {
      console.error(error);
    });
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
            const body: any = { ID: p?.ResultatID };
            this.is_loading = true;
            this.delete = this.resultatIndicateurService
                .DeleteAnIndicateursResultat(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.tablauxIndicateurs();
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



  

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

 
  ClearSearch() {
      this.id_verificateur=null;
      this.dateStart=[new Date(), new Date(this.DateNow.getFullYear(), this.DateNow.getMonth() + 1, 0)];
      // setTimeout(() => {
      //     this.tablaux();
      // }, 100);
  }

}
