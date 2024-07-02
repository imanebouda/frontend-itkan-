import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MenuVisibilityService } from 'src/app/services/dataShared/menu-visibility.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { ManuelQualiteService } from 'src/app/services/manuelQualite/manuelQualite.service';
import { ProcesDocumentsService } from 'src/app/services/procesDocuments/procesDocuments.service';
import { ProcessusService } from 'src/app/services/processus/processus.service';
import { GeneralService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail-manuel-qualite',
  templateUrl: './detail-manuel-qualite.component.html',
  styleUrls: ['./detail-manuel-qualite.component.scss']
})
export class DetailManuelQualiteComponent {
    detailProcessus: any;
    is_loading: boolean = true;
    menu_items: any[] = [];
    items: any[] = [{ label: null, link: null }];
    Subscription_router: Subscription;
    detailsId: string;
    detailMQDocuments: any;
    if_show_ajouter: boolean = false;
    if_show_modifier: boolean = false;
    if_show_pdf: boolean = false;
    Header_info: any;
    Afficher_params: any;
    ShowData: any;
    delete: any;
    data_selected_Dp: any;
  
    constructor(
        public generalService: GeneralService,
        private manuelQualite_src: ManuelQualiteService,
        private router: Router,
    ) {  
     }
  
  
    ngOnInit(): void {
      setTimeout(() => {
          this.getDetailMQDocument();
      }, 100); 
    }
  
 
  
   
    /* ----------------------- La fonction de suppression -----------------------*/
    DeleteAnMQDocuments(p: any) {
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
                this.delete = this.manuelQualite_src
                    .DeleteAnMQDocuments(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Supprimé':
                                this.getDetailMQDocument();
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
  
    StatutAnMQDocuments(p: any) {
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
                this.delete = this.manuelQualite_src
                    .StatutAnMQDocuments(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Modifié':
                                this.getDetailMQDocument();
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
  
  
    CloseDocument(event: boolean) {
        if (!event) {
            this.if_show_pdf = false;
        }else {
            this.if_show_pdf = false;
            this.getDetailMQDocument();
        }
    }
    
    getDetailMQDocument() {
        this.Afficher_params = this.manuelQualite_src.DetailAnMQdDocuments().subscribe(
            (response: any) => {
                try {
                  console.log('response', response);
                    if (response && response.IsSucceed) {
                        this.detailMQDocuments = response.DataMQ || [];
                        console.log('this.detailMQDocuments', this.detailMQDocuments);
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
    downloadDocument(documentId: number) {
        this.manuelQualite_src.DownloadMQDocument(documentId).subscribe((data: Blob) => {
            const blob = new Blob([data], { type: 'application/octet-stream' });
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'Document Politique qualité'; // Remplacez par le nom souhaité du fichier
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
            this.getDetailMQDocument();
        }
    }
  
    /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
    CloseUpdate(event: boolean) {
        if (!event) {
            this.if_show_modifier = false;
        } else {
            this.if_show_modifier = false;
            this.getDetailMQDocument();
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
  
    ViewPDFDocument(data_selected_Dp: any ){
        console.log('data_selected_Dp',data_selected_Dp)
        setTimeout(() => {
            this.is_loading=false 
        }, 100);
        this.Header_info = `Visualisateur de Documents: ${data_selected_Dp?.Libelle}`;
        this.data_selected_Dp = data_selected_Dp;
        this.if_show_pdf=true
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
