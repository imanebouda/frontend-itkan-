import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { DashboardsService } from 'src/app/services/dashboard/dashboards.service';
import * as moment from "moment"
import { UtilisateursService } from 'src/app/services/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
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

  constructor(
      public layoutService: LayoutService,
      private user_srv: UtilisateursService,
      private srv_dashboards: DashboardsService
  ) {

  }

  ngOnInit() {
      // this.tablaux();
      // this.GetAllByRoleController();
      this.tablauxIndicateurs();
      this.initCharts();
  }

  GetAllByRoleController() {
      this.Afficher = this.user_srv
          .GetAllByRoleController()
          .subscribe((r: any) => {
              r = JSON.parse(r);
              if (r?.codeReponse == 200) {
                  this.liste_verificateurs = r?.data;
              }
          });
  }
  showPopupReclamation(){
  }

  showPopup(ords: any) {
      this.data_selected_ords = ords;
      this.visible = true;
      this.HeaderInfo = 'Oreder de service';
  }
  

  tablauxIndicateurs() {
      const Annee = new Date().getFullYear() // Utilisez getFullYear() pour obtenir l'année actuelle
      this.srv_dashboards.TableauxResultIndicateur(Annee)
          .subscribe((r: any) => {
              try {          
                  this.ShowDataIndicateurs = r.data;
                  
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

  hasResultForPeriode(resultats: any[], mois: string): boolean {
      return resultats.some(r => r.Periode.toLowerCase() === mois);
  }
  
  getResultForPeriode(resultats: any[], mois: string): any {
      return resultats.find(r => r.Periode.toLowerCase() === mois);
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
  

 
  
  initCharts() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
      
      this.barData = {
          labels: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet'],
          datasets: [
              {
                  label: 'Année en cours ',
                  backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                  borderColor: documentStyle.getPropertyValue('--primary-500'),
                  data: [65, 59, 80, 81, 56, 55, 40]
              },
              {
                  label: 'Années précédente',
                  backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                  borderColor: documentStyle.getPropertyValue('--primary-200'),
                  data: [28, 48, 40, 19, 86, 27, 90]
              }
          ]
      };

      this.barOptions = {
          plugins: {
              legend: {
                  labels: {
                      fontColor: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary,
                      font: {
                          weight: 500
                      }
                  },
                  grid: {
                      display: false,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
          }
      };

      this.pieData = {
          labels: ['A', 'B', 'C'],
          datasets: [
              {
                  data: [540, 325, 702],
                  backgroundColor: [
                      documentStyle.getPropertyValue('--indigo-500'),
                      documentStyle.getPropertyValue('--purple-500'),
                      documentStyle.getPropertyValue('--teal-500')
                  ],
                  hoverBackgroundColor: [
                      documentStyle.getPropertyValue('--indigo-400'),
                      documentStyle.getPropertyValue('--purple-400'),
                      documentStyle.getPropertyValue('--teal-400')
                  ]
              }]
      };

      this.pieOptions = {
          plugins: {
              legend: {
                  labels: {
                      usePointStyle: true,
                      color: textColor
                  }
              }
          }
      };

      this.lineData = {
          labels: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet'],
          datasets: [
              {
                  label: 'Année en cours',
                  data: [65, 59, 80, 81, 56, 55, 40],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--primary-500'),
                  borderColor: documentStyle.getPropertyValue('--primary-500'),
                  tension: .4
              },
              {
                  label: 'Années précédente',
                  data: [28, 48, 40, 19, 86, 27, 90],
                  fill: false,
                  backgroundColor: documentStyle.getPropertyValue('--primary-200'),
                  borderColor: documentStyle.getPropertyValue('--primary-200'),
                  tension: .4
              }
          ]
      };

      this.lineOptions = {
          plugins: {
              legend: {
                  labels: {
                      fontColor: textColor
                  }
              }
          },
          scales: {
              x: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
          }
      };

      this.polarData = {
          datasets: [{
              data: [
                  11,
                  16,
                  7,
                  3
              ],
              backgroundColor: [
                  documentStyle.getPropertyValue('--indigo-500'),
                  documentStyle.getPropertyValue('--purple-500'),
                  documentStyle.getPropertyValue('--teal-500'),
                  documentStyle.getPropertyValue('--orange-500')
              ],
              label: 'My dataset'
          }],
          labels: [
              'Indigo',
              'Purple',
              'Teal',
              'Orange'
          ]
      };

      this.polarOptions = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              r: {
                  grid: {
                      color: surfaceBorder
                  }
              }
          }
      };

      this.radarData = {
          labels: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet'],
          datasets: [
              {
                  label: 'Année en cours',
                  borderColor: documentStyle.getPropertyValue('--indigo-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--indigo-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--indigo-400'),
                  data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                  label: 'Années précédente',
                  borderColor: documentStyle.getPropertyValue('--purple-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--purple-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--purple-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--purple-400'),
                  data: [28, 48, 40, 19, 96, 27, 100]
              }
          ]
      };

      this.radarOptions = {
          plugins: {
              legend: {
                  labels: {
                      fontColor: textColor
                  }
              }
          },
          scales: {
              r: {
                  grid: {
                      color: textColorSecondary
                  }
              }
          }
      };
  }

  /* -------------------------------------------------------------------------- */
/*                            Ajout ou modification                           */
/* -------------------------------------------------------------------------- */

ShowFormulaire(data_selected_ddp: any ,mois :string) {
      data_selected_ddp.mois = mois;
      this.data_selected_ddp = data_selected_ddp;
      this.Header_info = `Ajouter Résultat indicateur : ` + mois ;
      setTimeout(() => {
          this.if_show_ajouter = true;
      }, 100);
}



  

  ngOnDestroy() {
      if (this.subscription) {
          this.subscription.unsubscribe();
      }
  }

  getFavInsp(inspections: any[]) {
      return inspections?.filter(p => p.resultat == "Conforme").length
  }

  getDeFavInsp(inspections: any[]) {
      return inspections?.filter(p => p.resultat == "Non conforme").length
  }

  ClearSearch() {
      this.id_verificateur=null;
      this.dateStart=[new Date(), new Date(this.DateNow.getFullYear(), this.DateNow.getMonth() + 1, 0)];
      // setTimeout(() => {
      //     this.tablaux();
      // }, 100);
  }

}
