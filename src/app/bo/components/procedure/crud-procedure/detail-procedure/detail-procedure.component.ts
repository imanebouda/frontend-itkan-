import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'; // Utilisez ActivatedRoute au lieu de Route
import { Subscription } from 'rxjs';
import { ProcedureService } from 'src/app/services/Procedure/procedure.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { ProcDocumentsService } from 'src/app/services/procDocuments/procDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { GeneralService } from 'src/app/services/services';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-procedure',
  templateUrl: './detail-procedure.component.html',
  styleUrls: ['./detail-procedure.component.scss']
})
export class DetailProcedureComponent {
  detailProcedure: any;
  is_loading: boolean = true;
  menu_items: any[] = [];
  items: any[] = [{ label: null, link: null }];
  Subscription_router: Subscription;
  detailsId: string;
  detailProcDocuments: any;
  if_show_ajouter_AS: boolean = false;
  if_show_ajouter_TL: boolean = false;
  if_show_modifier: boolean = false;
  Header_info: any;
  Afficher_params: any;
  ShowData: any;
  delete: any;
  data_selected_Dp : any ;
  detailProcessus : any;
  listProcDocuments : any;
  ProcDocumentTelecharger : any ;
  


  constructor(
    private route: ActivatedRoute, // Utilisez ActivatedRoute ici
    public generalService: GeneralService,
    private procedureService: ProcedureService,
    private processus_src : ProcessusService,
    private ProcDocuments_src : ProcDocumentsService,
    private elementRef: ElementRef,
    private router: Router,
    private pusherService: PusherService
  ) {
    this.Subscription_router = this.pusherService.GetterNavs.subscribe(
      (data_recu: any) => {
          if (data_recu) {
              if (data_recu?.page == '/procedure') {
                  this.items = [
                      {
                          label: 'Gestion des procedures',
                          link: 'procedure/detail',
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
      const processusId = params['id'];
      this.getdetailProcedure(processusId);
      this.DetailOngles(processusId);
      this.setTime(processusId);
      this.getdetailProcedureDocument();
    });
    this.GetAllProcDocumentAssocie();
    this.getdetailProcedureDocument();
  }

  setTime(processusId : number ){
    setTimeout(() => {
      this.getCurrentmenu(processusId);
  }, 100);
  }
  
  getdetailProcedure(ID: number) {
    this.is_loading = true; // Afficher un indicateur de chargement
  
    this.procedureService.getDetailProcedure(ID).subscribe(
      (response: any) => {
        try {
          if (response && response.IsSucceed) {
           
            this.detailProcedure = response.DataProcedure || [];
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
    DeleteAnProcedureDocuments(p: any) {
        Swal.fire({
            title: 'Suppression',
            html: `<b> Êtes-vous sûr de vouloir ce document :: </b></br>  ${p?.Libelle} ?`,
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
                this.delete = this.ProcDocuments_src
                    .DeleteAnProcedureDocuments(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Supprimé':
                                this.generalService.errorSwal(
                                    'Procédure du Document supprimé !',
                                    2000,
                                    'success'
                                );
                                this.GetAllProcDocumentAssocie();
                                this.getdetailProcedureDocument();
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
  
    
      /* ----------------------- La fonction de statut -----------------------*/
  
      StatutAnProcedureDocuments(p: any) {
        Swal.fire({
            title: "Archiver le document",
            html: `<b>Voulez-vous archiver ce document :</b></br> ${p?.Libelle} ?`,
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#258662',
            cancelButtonColor: '#f50707',
            confirmButtonText: 'Archiver ',
        }).then((result: any) => {
            if (result?.value) {
                let body: any = {
                    "documentId": p?.ID,
                    "newState": p?.Perime
                };
                this.is_loading = true;
                this.delete = this.ProcDocuments_src
                    .StatutAnProcedureDocuments(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Modifié':
                                this.generalService.errorSwal(
                                    "L'état de Périmé a été mis à jour avec succès!",
                                    2000,
                                    'success'
                                );
                                this.GetAllProcDocumentAssocie();
                                this.getdetailProcedureDocument();
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
    
    GetAllProcDocumentAssocie(){
      const ID = this.generalService.getProcedureID('detail');

      this.Afficher_params = this.ProcDocuments_src.GetAllProcDocumentNonPerime(ID).subscribe(
        (response: any) => {
          try {
            if (response && response.IsSucceed) {
              this.listProcDocuments = response.data || [];
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
      this.is_loading = true; 
    }
    
    
  
  
    getdetailProcedureDocument() {
   
      const ID = this.generalService.getProcedureID('detail');
      // Afficher un indicateur de chargement
      this.Afficher_params = this.ProcDocuments_src.DetailAnProcDocuments(ID).subscribe(
        (response: any) => {
          try {
            if (response && response.IsSucceed) {
              this.detailProcDocuments = response.ProcDocument || [];
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
      this.is_loading = true; 
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
    if (action == 'Ajouté-Document-TL') {
        setTimeout(() => {
            this.if_show_ajouter_TL = true;
          
        }, 100);
    } else if (action == 'Ajouté-Document-AS'){
      setTimeout(() => {
        this.if_show_ajouter_AS = true;
    }, 100);
    } else if (action == 'modifier') {
        this.data_selected_Dp = data_selected_Dp;
        this.Header_info = `Modification du document : `;
        setTimeout(() => {
            this.if_show_modifier = true;
        }, 100);
    }
  }
  
  /* ---------------- Férmeture du popup Ajout des utilisateurs ---------------- */
  CloseAjouter(event: boolean) {
    if (!event) {
        this.if_show_ajouter_TL = false;
        this.if_show_ajouter_AS = false;
    } else {
      this.if_show_ajouter_TL = false;
      this.if_show_ajouter_AS = false;
        this.GetAllProcDocumentAssocie();
        this.getdetailProcedureDocument();
    }
  }
  
  /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
  CloseUpdate(event: boolean) {
    if (!event) {
        this.if_show_modifier = false;
    } else {
        this.if_show_modifier = false;
        this.GetAllProcDocumentAssocie();
        this.getdetailProcedureDocument();
    }
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
             let elements: any[] = [0, 1, 2,3,4]; /// la partie à changer suivant le nombre d'élements du menu
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

 getCurrentmenu(processusId :number) {
     switch (this.router.url) {
         case '/procedure':
         case  `/procedure/detail/${processusId}`:
             this.items = [
                 {
                     label: 'Fiche ', link: this.router.url,
                 },
             ];
             this.InitSelected(0);
             break;
          case `/procObjectifs/list/${processusId}`:
              this.items = [
                  { label: 'Objectifs ', link: this.router.url },
              ];
              this.InitSelected(1);
              break;
          case `/procedure/list/${processusId}`:
                this.items = [
                    { label: 'Procédures', link: this.router.url },
                ];
                this.InitSelected(3);
                break;
     }
 }

 DetailOngles(processusId :number) {
   this.menu_items = [
       {
           label: 'Fiche ',
           icon: 'pi pi-fw pi-box',
           route: `/procedure/detail/${processusId}`,
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
       {
         label: 'Objectifs ',
           icon: 'pi pi-fw pi-box',
           route: `procObjectifs/list/${processusId}`,
           command: (e: any) => {
               this.router.navigate([e?.item?.route]);
               this.items = [
                 { label: 'Objectifs ', link: this.router.url },
               ];
               this.InitSelected(1);
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
