import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuVisibilityService } from 'src/app/services/dataShared/menu-visibility.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { ProcessusObjectifsService } from 'src/app/services/processusObjectifs/processusObjectifs.service';
import { GeneralService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-proces-objectifs',
  templateUrl: './list-proces-objectifs.component.html',
})
export class ListProcesObjectifsComponent {
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
  listProcesObjectifs: any[] = [];
  detailProcessus: any;
  FormmulaireRecherche: FormGroup;
  selectedOdsToPrint: any;
  Header_info: any;
  if_show_ajouter: boolean = false;
  if_show_modifier: boolean = false;
  data_selected_ddp: any;
  if_show_detail: boolean = false;
  data_selected_phrasier: any;
  data_selected_processus: any;
  NamePilote: string;
  processesWithPilots: any[] = [];
  menu_items: any[] = [];
  items: any[] = [{ label: null, link: null }];
  Subscription_router: Subscription;
  processusId: number;
  data_selected_proces_objectifs : any;
  Detail_info : any ;
  id : number;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public generalService: GeneralService,
    private processusObjectifs_src: ProcessusObjectifsService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private processus_src: ProcessusService,
    private menuVisibilityService: MenuVisibilityService,
  ) {
    // this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.menuVisibilityService.setMenuVisibility(this.shouldShowMenu(event.url));
    //   }
    // });
    const initialUrl = this.router.url;
    this.menuVisibilityService.setMenuVisibility(this.shouldShowMenu(initialUrl));
    
     this.id = this.generalService.getProcessusID('list');
     this.FormmulaireRecherche = new FormGroup({
      titre: new FormControl(null),
      date: new FormControl(null),
    });
  }

  ngOnInit() {
  
   this.getDetailProcessus();
   this.DisplayProcessus();
  }

  shouldShowMenu(url: string): boolean {    
    return url.startsWith('/procesObjectifs/list'); 
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
      this.SearchProcessus();
    }, 100);
  }

  SearchProcessus() {
    this.skip = 0;
    this.take = 10;
    setTimeout(() => {
      this.DisplayProcessus();
    }, 100);
  }

  ShowDetailProcessusObjectifs(data_selected_proces_objectifs : any = null){
    this.Detail_info = "Détail de  l'objectif : " ;
    this.data_selected_proces_objectifs  = data_selected_proces_objectifs ;
    this.if_show_detail=true;
  }

  DisplayProcessus() {
    this.is_loading = true;
    this.id = this.generalService.getProcessusID('list');
    const titre = this.FormmulaireRecherche.value.titre;
    const dateDebut = this.FormmulaireRecherche.value.date
      ? this.FormmulaireRecherche.value.date[0]
      : null;
    const dateFin = this.FormmulaireRecherche.value.date
      ? this.FormmulaireRecherche.value.date[1]
      : null;
    this.processusObjectifs_src
      .GetProcessusObjectifs(
        this.id,
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
              this.listProcesObjectifs = response.data || [];
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
  DeleteAnProcessusObj(p: any) {
    Swal.fire({
        title: 'Suppression',
        html: `<b> Êtes-vous sûr de vouloir supprimer l'objectif: </b></br>  ${p?.Title} ?`,
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
            this.delete = this.processusObjectifs_src
                .DeleteAnProcessusObj(body)
                .subscribe((r: any) => {
                    r = JSON.parse(r);
                    switch (r?.msg) {
                        case 'Supprimé':
                            this.DisplayProcessus();
                            this.generalService.errorSwal(
                                'Odeclaration supprimé !',
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


  paginate(event: any) {
    this.take = event?.rows;
    this.skip = event?.first;
    setTimeout(() => {
      this.DisplayProcessus();
    }, 10);
  }

  Sort(event: any) {
    this.colone = event?.field;
    this.order = event?.order == -1 ? 'DESC' : 'asc';
    setTimeout(() => {
      this.DisplayProcessus();
    }, 10);
  }

  ShowFormulaire(action: any, data_selected_ddp: any = null) {
    if (action == 'Ajouté') {
      setTimeout(() => {
        this.if_show_ajouter = true;
      }, 100);
    } else if (action == 'modifier') {
      this.data_selected_ddp = data_selected_ddp;
      this.Header_info = `Modification de l'objectif `;
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
      this.DisplayProcessus();
    }
  }

  CloseUpdate(event: boolean) {
    if (!event) {
      this.if_show_modifier = false;
    } else {
      this.if_show_modifier = false;
      this.DisplayProcessus();
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




ngOnDestroy(): void {
    let unsubscribe_liste: any[] = [this.Subscription_router, this.delete];
    unsubscribe_liste.forEach((element: any) => {
        if (element) {
            element.unsubscribe();
        }
    });
}

  
}
