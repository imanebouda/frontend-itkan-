import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Utilisez ActivatedRoute au lieu de Route
import { Subscription } from 'rxjs';
import { ProcedureService } from 'src/app/services/Procedure/procedure.service';
import { MenuVisibilityService } from 'src/app/services/dataShared/menu-visibility.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { IndicateurService } from 'src/app/services/indicateurs/indicateur.service';
import { ProcDocumentsService } from 'src/app/services/procDocuments/procDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { GeneralService } from 'src/app/services/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-indicateur',
  templateUrl: './detail-indicateur.component.html',
  styleUrls: ['./detail-indicateur.component.scss']
})
export class DetailIndicateurComponent {
  detailIndicateur: any;
  is_loading: boolean = true;
  menu_items: any[] = [];
  items: any[] = [{ label: null, link: null }];
  Subscription_router: Subscription;
  detailsId: string;
  detailProcDocuments: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  Header_info: any;
  Afficher_params: any;
  ShowData: any;
  delete: any;
  data_selected_Dp : any ;
  detailProcessus : any


  constructor(
    private route: ActivatedRoute, // Utilisez ActivatedRoute ici
    public generalService: GeneralService,
    private indicateurService: IndicateurService,
    private ProcDocuments_src : ProcDocumentsService,
    private router: Router,
    private pusherService: PusherService,
    private menuVisibilityService: MenuVisibilityService
  ) {
    // const initialUrl = this.router.url;
    // this.menuVisibilityService.setMenuVisibility(this.shouldShowMenu(initialUrl));
    this.Subscription_router = this.pusherService.GetterNavs.subscribe(
      (data_recu: any) => {
          if (data_recu) {
              if (data_recu?.page == '/Indicateurs') {
                  this.items = [
                      {
                          label: 'Gestion des processus',
                          link: '/Indicateurs/detail',
                      },
                  ];
                  this.InitSelected(0);
              }
          }
      }
  );
   }

  
  
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const IndicateurId = params['id'];
      console.log('IndicateurId',IndicateurId);
      this.getdetailIndicateur(IndicateurId);
      this.DetailOngles(IndicateurId);
      this.setTime(IndicateurId)
      //this.getCurrentmenu(IndicateurId); // Appelez la fonction avec l'ID du processus
      
    }); 
  }
  setTime(processusId : number){
    setTimeout(() => {
      this.getCurrentmenu(processusId );
  }, 100);
  }

  // shouldShowMenu(url: string): boolean {    
  //   return url.startsWith('/Indicateurs/detail'); 
  // }

  
  getdetailIndicateur(ID: number) {
    this.is_loading = true; // Afficher un indicateur de chargement
  
    this.indicateurService.getDetailIndicateur(ID).subscribe(
      (response: any) => {
        try {
          if (response && response.IsSucceed) {
            this.detailIndicateur = response.DataIndicateur || [];
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
  /*                           telecharger document                              */
  /* -------------------------------------------------------------------------- */
  
  downloadDocument(procDocumentId: number) {
    this.ProcDocuments_src.DownloadProcDocument(procDocumentId).subscribe((data: Blob) => {
      const blob = new Blob([data], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Document Procédure'; // Remplacez par le nom souhaité du fichier
      a.click();
      window.URL.revokeObjectURL(url);
    });
  }
  
    
  /* -------------------------------------------------------------------------- */
  /*                            Ajout ou modification                           */
  /* -------------------------------------------------------------------------- */
  
  ShowFormulaire(action: any, data_selected_Dp: any = null) {
    if (action == 'Ajouté') {
        setTimeout(() => {
            this.if_show_ajouter = true;
        }, 100);
    } else if (action == 'modifier') {
        this.data_selected_Dp = data_selected_Dp;
        this.Header_info = `Modifier le Procédure du  Document : (${data_selected_Dp?.Libelle})`;
        setTimeout(() => {
            this.if_show_modifier = true;
        }, 100);
    }
  }
  

  
  
    onItemClick(event: any) {
      console.log(event)
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
  
/* -------------------------------------------------------------------------- */
/*             Cette fonction permet de selectionner le menu actif            */
/* -------------------------------------------------------------------------- */

 InitSelected(curent: any) {
     let menu: any = document.getElementById('menu_bar');
     setTimeout(() => {
         let list: any =
             menu.children[0]?.children[1]?.children[0]?.children;
         /* -------------------------------- Le reset -------------------------------- */
         new Promise((resolve) => {
             let elements: any[] = [0]; /// la partie à changer suivant le nombre d'élements du menu
             for (var i = 0; i < elements.length; i++) {
                 if (elements[i] === curent) {
                     elements.splice(i, 1);
                 }
             }
             resolve(elements);
         }).then((data: any[] | any) => {
             setTimeout(() => {
                 data.forEach((key: any) => {
                     let element: any = list.item(key);
                     element.children[0].classList.remove(
                         'p-menuitem-link',
                         'p-button'
                     );
                     element.children[0].classList.add('p-2');
                 });
             }, 10);
             setTimeout(() => {
                 /* -------------------------------- Selection ------------------------------- */
                 let element: any = list.item(curent);
                 element.children[0].classList.remove(
                     'p-menuitem-link',
                     'p-button-info'
                 );
                 element.children[0].classList.add(
                     'p-2',
                     'p-button',
                     'p-button-info'
                 );
             }, 10);
         });
     }, 10);
 }

 getCurrentmenu(IndicateurId :number) {
     switch (this.router.url) {
         case '/Indicateurs':
         case  `/Indicateurs/detail/${IndicateurId}`:
             this.items = [
                 {
                     label: 'Fiche ', link: this.router.url,
                 },
             ];
             this.InitSelected(0);
             break;
     }
 }

 DetailOngles(IndicateurId :number) {
   this.menu_items = [
       {
           label: 'Fiche ',
           icon: 'pi pi-fw pi-box',
           route: `/Indicateurs/detail/${IndicateurId}`,
           command: (e: any) => {
               this.router.navigate([e?.item?.route]);
               this.items = [
                   {
                     label: 'Fiche ', link: this.router.url,
                   },
               ];
               this.InitSelected(0);
           },
       },
   ];
}



ngOnDestroy(): void {
    let unsubscribe_liste: any[] = [this.Subscription_router];
    unsubscribe_liste.forEach((element: any) => {
        if (element) {
            element.unsubscribe();
        }
    });
}

actualiserPage() {
    // Rechargez la page actuelle pour actualiser les données
    window.location.reload();
  }
  


}
