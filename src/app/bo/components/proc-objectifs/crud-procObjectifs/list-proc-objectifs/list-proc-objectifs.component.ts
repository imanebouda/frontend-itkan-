import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProcedureService } from 'src/app/services/Procedure/procedure.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { ProcedureObjectifsService } from 'src/app/services/procedureObjectifs/procedureObjectifs.service';
import { GeneralService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-proc-objectifs',
  templateUrl: './list-proc-objectifs.component.html',
  styleUrls: ['./list-proc-objectifs.component.scss']
})
export class ListProcObjectifsComponent {
  ShowData: Subscription;
  delete: Subscription;
  is_loading: boolean = true;
  if_show_doc: boolean = false;
  if_show_hist: boolean = false;
  if_show_cg: boolean = false;
  title: string;
  YearNow = new Date();
  skip: any = 0;
  take: any = 10;
  order: any = 'DESC';
  colone: any = 'ID';
  totalRecords: any = 0;
  listProcObjectifs: any[] = [];
  detailProcedure: any;
  FormmulaireRecherche: FormGroup;
  selectedOdsToPrint: any;
  Header_info: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  data_selected_ddp: any;
  if_show_detail: boolean = false;
  data_selected_phrasier: any;
  data_selected_Procedure: any;
  NamePilote: string;
  ProcsesWithPilots: any[] = [];
  menu_items: any[] = [];
  items: any[] = [{ label: null, link: null }];
  Subscription_router: Subscription;
  ProcedureId: number;
  data_selected_Proc_objectifs : any;
  Detail_info : any ;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public generalService: GeneralService,
    private procedureObjectifs_src: ProcedureObjectifsService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private procedure_src: ProcedureService,
    private pusherService: PusherService,
  ) {
    this.Subscription_router = this.pusherService.GetterNavs.subscribe(
      (data_recu: any) => {
          if (data_recu) {
              if (data_recu?.page == '/procObjectifs') {
                  this.items = [
                      {
                          label: 'Gestion des processus',
                          link: '/procObjectifs/list',
                      },
                  ];
                  this.InitSelected(0);
              }
          }
      }
  );
    this.FormmulaireRecherche = new FormGroup({
      titre: new FormControl(null),
      date: new FormControl(null),
    });
  }



  ngOnInit() {
    this.DetailOngles();
    setTimeout(() => {
      this.getCurrentmenu();
    }, 100); 
   this.getdetailProcedure();
   this.DisplayProcedure();
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
      this.DisplayProcedure();
    }, 100);
  }


  ShowDetailProcedureObjectifs(data_selected_Proc_objectifs: any = null) {
    this.Detail_info = "Détail de  l'objectif : " 
    this.data_selected_Proc_objectifs = data_selected_Proc_objectifs;
    this.if_show_detail = true;
 }



  DisplayProcedure() {
    this.is_loading = true;

    const id = this.generalService.getProcedureID('list');
  
    const titre = this.FormmulaireRecherche.value.titre;
    const dateDebut = this.FormmulaireRecherche.value.date
      ? this.FormmulaireRecherche.value.date[0]
      : null;
    const dateFin = this.FormmulaireRecherche.value.date
      ? this.FormmulaireRecherche.value.date[1]
      : null;
    this.procedureObjectifs_src
      .GetProcedureObjectifs(
        id,
        titre,
        dateDebut,
        dateFin,
        this.colone,
        this.order,
        this.take,
        this.skip
      )
      .subscribe(
        (response: any) => {
          try {
            if (response) {
              this.listProcObjectifs = response.data || [];
              this.totalRecords = response.TotalRows || 0;
            } else {
              this.generalService.errorSwal(response.Message);
            }
          } catch (error) {
            this.generalService.errorSwal(
              'Une erreur inattendue s\'est produite.'
            );
          } finally {
            this.is_loading = false;
          }
        },
        (error) => {
          this.generalService.errorSwal(
            'Une erreur de communication avec le serveur s\'est produite.',
            error
          );
          this.is_loading = false;
        }
      );
  }

  getdetailProcedure() {
    const id = this.generalService.getProcedureID('list');
    this.is_loading = true; // Afficher un indicateur de chargement
  
    this.procedure_src.getDetailProcedure(id).subscribe(
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
  DeleteAnProcedureObj(p: any) {
    Swal.fire({
        title: 'Suppression',
        html: `<b> Êtes-vous sûr de vouloir supprimer objetif : </b></br>  ${p?.Title} ?`,
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
            this.delete = this.procedureObjectifs_src
                .DeleteAnProcedureObj(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.generalService.errorSwal(
                                'Odeclaration supprimé !',
                                2000,
                                'success'
                            );
                            this.DisplayProcedure();
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


  paginate(event: any) {
    this.take = event?.rows;
    this.skip = event?.first;
    setTimeout(() => {
      this.DisplayProcedure();
    }, 10);
  }

  Sort(event: any) {
    this.colone = event?.field;
    this.order = event?.order == -1 ? 'DESC' : 'asc';
    setTimeout(() => {
      this.DisplayProcedure();
    }, 10);
  }

  ShowFormulaire(action: any, data_selected_ddp: any = null) {
      if (action == 'Ajouté') {
      setTimeout(() => {
        this.if_show_ajouter = true;
      }, 100);
    } else if (action == 'modifier') {
      this.data_selected_ddp = data_selected_ddp;
      this.Header_info = `Modification de  l'objectif `;
      setTimeout(() => {
        this.if_show_modifier = true;
      }, 100);
    }
  }

  CloseAjouter(event: boolean) {
    if (!event) {
      this.if_show_ajouter = false;
    } else {
      this.if_show_ajouter = false;
      this.DisplayProcedure();
    }
  }

  CloseUpdate(event: boolean) {
    if (!event) {
      this.if_show_modifier = false;
    } else {
      this.if_show_modifier = false;
      this.DisplayProcedure();
    }
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
    }).then((result) => {});
  }

  checkRole() {
    if (this.generalService.get_DataSession('id_role') == environment.id_role_rtc)
      return true;
    else return false;
  }

  actualiserPage() {
    window.location.reload();
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

getCurrentmenu() {
  const id = this.generalService.getProcedureID('list');

  switch (this.router.url) {
    case '/procedure':
    case  `/procedure/detail/${id}`:
        this.items = [
            {
                label: 'Fiche ', link: this.router.url,
            },
        ];
        this.InitSelected(0);
        break;
     case `/procObjectifs/list/${id}`:
         this.items = [
             { label: 'Objectifs ', link: this.router.url },
         ];
         this.InitSelected(1);
         break;
}
}

DetailOngles() {
 const id = this.generalService.getProcedureID('list');

 this.menu_items = [
  {
      label: 'Fiche ',
      icon: 'pi pi-fw pi-box',
      route: `/procedure/detail/${id}`,
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
      route: `procObjectifs/list/${id}`,
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
    let unsubscribe_liste: any[] = [this.Subscription_router, this.delete];
    unsubscribe_liste.forEach((element: any) => {
        if (element) {
            element.unsubscribe();
        }
    });
}

}
