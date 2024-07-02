import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router'; // Utilisez ActivatedRoute au lieu de Route
import { Subscription } from 'rxjs';
import { MenuVisibilityService } from 'src/app/services/dataShared/menu-visibility.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { GeneralService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import {DataService} from "../../../../../services/dataShared/data.service";


@Component({
    selector: 'app-detaill-processus',
    templateUrl: './detaill-processus.component.html',
    styleUrls: ['./detaill-processus.component.scss']
})
export class DetaillProcessusComponent implements OnInit {
    detailProcessus: any;
    is_loading: boolean = true;
    menu_items: any[] = [];
    items: any[] = [{ label: null, link: null }];
    Subscription_router: Subscription;
    detailsId: string;
    detailProcesDocuments: any;
    if_show_ajouter: boolean = false;
    if_show_modifier: boolean = false;
    data_selected_Dp: any;
    Header_info: any;
    Afficher_params: any;
    ShowData: any;
    delete: any;


    constructor(
        private route: ActivatedRoute, // Utilisez ActivatedRoute ici
        public generalService: GeneralService,
        private processus_src: ProcessusService,
        private ProcesDocuments_src: ProcesDocumentsService,
        private elementRef: ElementRef,
        private router: Router,
        private pusherService: PusherService,
        private menuVisibilityService : MenuVisibilityService,
        private dataSharedService :  DataService
    ) {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
              console.log(this.shouldShowMenu(event.url))
              this.menuVisibilityService.setMenuVisibility(this.shouldShowMenu(event.url));
            }
          });
     }


    ngOnInit(): void {
        this.route.params.subscribe(params => {
            const processusId = params['id'];
            this.getDetailProcessus(processusId);
            this.getDetailProcessusDocument();
        });
    }

    shouldShowMenu(url: string): boolean {
      return url.startsWith('/processus/detail');
    }


    getDetailProcessus(ID: number) {
        this.is_loading = true; // Afficher un indicateur de chargement
        this.processus_src.getDetailProcessus(ID).subscribe(
            (response: any) => {
                try {
                    if (response && response.IsSucceed) {
                        this.detailProcessus = response.data || [];
                        console.log(this.detailProcessus)
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
    DeleteAnProcessusDocuments(p: any) {
        Swal.fire({
            title: 'Suppression',
            html: `<b> Êtes-vous sûr de vouloir Processus du Document: </b></br>  ${p?.Libelle} ?`,
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
                this.delete = this.ProcesDocuments_src
                    .DeleteAnProcessusDocuments(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Supprimé':
                                this.getDetailProcessusDocument();
                                this.actualiserPage();
                                this.generalService.errorSwal(
                                    'Processus du Document supprimé !',
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


    /* ----------------------- La fonction de statut -----------------------*/

    StatutAnProcessusDocuments(p: any) {
        Swal.fire({
            title: "Archiver le document",
            html: `<b>Voulez-vous archiver ce document :</b></br> ${p?.Libelle} ?`,
            icon: 'warning',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#258662',
            cancelButtonColor: '#f50707',
            confirmButtonText: 'Archiver',
        }).then((result: any) => {
            if (result?.value) {
                let body: any = {
                    "documentId": p?.ID,
                    "newState": p?.Perime
                };
                this.is_loading = true;
                this.delete = this.ProcesDocuments_src
                    .StatutAnProcessusDocuments(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Modifié':
                                this.getDetailProcessusDocument();
                                this.actualiserPage();
                                this.generalService.errorSwal(
                                    "L'état de Périmé a été mis à jour avec succès!",
                                    2000,
                                    'success'
                                );
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



    getDetailProcessusDocument() {

        const ID = this.generalService.getProcessusID('detail');
        // Afficher un indicateur de chargement

        this.Afficher_params = this.ProcesDocuments_src.DetailAnProcesDocuments(ID).subscribe(
            (response: any) => {
                try {
                    if (response && response.IsSucceed) {
                        this.detailProcesDocuments = response.Data || [];
                        console.log('this.detailProcesDocuments', this.detailProcesDocuments);
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
    downloadDocument(procesDocumentId: number) {
        this.ProcesDocuments_src.DownloadProcesDocument(procesDocumentId).subscribe((data: Blob) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Document Processus'; // Remplacez par le nom souhaité du fichier
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
            this.Header_info = `Modification du document: `;
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
            this.getDetailProcessusDocument();
        }
    }

    /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
    CloseUpdate(event: boolean) {
        if (!event) {
            this.if_show_modifier = false;
        } else {
            this.if_show_modifier = false;
            this.getDetailProcessusDocument();
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

    ngOnDestroy(): void {
        let unsubscribe_liste: any[] = [this.Subscription_router];
        unsubscribe_liste.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
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
