import { HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Renderer2 } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrganismService } from 'src/app/services/OrganismService/organismService.service';
import { DeclarationService } from 'src/app/services/declaration/declaration.service';
import { InspectionService } from 'src/app/services/inspections/inspections.service';
import { GeneralService, OrdreService } from 'src/app/services/services';
import { OrganismesService } from 'src/app/services/utilisateurs/organismes.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-declaration-list',
    templateUrl: './declaration-list.component.html',
    styleUrls: ['./declaration-list.component.scss']
})
export class DeclarationListComponent {
    /* ------------------------- Les variables globales ------------------------- */
    // Afficher_excel: Subscription;
    ShowData: Subscription;
    delete: Subscription;
    // Afficher_params: Subscription;
    is_loading: boolean = true;
    if_show_doc: boolean = false;
    if_show_hist: boolean = false;
    if_show_cg: boolean = false;
    title: string;
    YearNow = new Date();
    /* ------------------------ les variables d'affichage ----------------------- */
    skip: any = 0;
    take: any = 10;
    order: any = 'DESC';
    colone: any = 'id';
    totalRecords: any = 0;
    listDeclaration: any[] = [];
    FormmulaireRecherche: FormGroup;
    imageUrl: any = 'assets/layout/images/user-cicrle.svg';
    selectedOdsToPrint: any;
    organism: any = {
        id: '',
        address: '',
        approval: '',
        city: '',
        code: '',
        email: '',
        gsm: '',
        logo: '',
        phone: '',
        social_reason: '',
        zip_code: '',
        open_date: '',
        brand: ''
    };
    /* ----------------- Les variables du popup ajout ou update ----------------- */
    Header_info: any;
    if_show_ajouter: boolean = false;
    if_show_modifier: boolean = false;
    data_selected_ddp: any;

    constructor(
        private router: Router,
        public generalService: GeneralService,
        private _ordreService: OrdreService,
        private declaration_src: DeclarationService,
        private inspection_src: InspectionService,
        private elementRef: ElementRef,
        private renderer: Renderer2,
        private _organismService: OrganismService,
        private organismesService: OrganismesService,
        private sanitizer: DomSanitizer
    ) {
        /* ---------------------- Initialisation du formulaire ---------------------- */
        this.FormmulaireRecherche = new FormGroup({
            numero: new FormControl(null),
            date: new FormControl(null),
            client: new FormControl(null),
            immatricule: new FormControl(null)
        });
    }

    ngOnInit(): void {
        this.DisplayDeclaration();
        this.GetOrganism();
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

    /* -------------------------------------------------------------------------- */
    /*                       Les fonctions pour l'affichage                       */
    /* -------------------------------------------------------------------------- */

    ClearSearch() {
        this.FormmulaireRecherche.reset();
        setTimeout(() => {
            this.SearchDDP();
        }, 100);
    }

    SearchDDP() {
        this.skip = 0;
        this.take = 10;
        setTimeout(() => {
            this.DisplayDeclaration();
        }, 100);
    }

    DisplayDeclaration() {
        this.is_loading = true;
        let body: any = {
            colone: this.colone,
            order: this.order,
            skip: this.skip,
            take: this.take,
            numero: this.FormmulaireRecherche.value.numero,
            datestart:
                this.FormmulaireRecherche.value.date != null
                    ? this.FormmulaireRecherche.value.date[0]
                    : null,
            dateend:
                this.FormmulaireRecherche.value.date != null
                    ? this.FormmulaireRecherche.value.date[1]
                    : null,
            client: this.FormmulaireRecherche.value.client,
            immatricule: this.FormmulaireRecherche.value.immatricule,
            isrtc: false
        };
        this.ShowData = this.declaration_src
            .GetDeclaration(this.FormmulaireRecherche)
            .subscribe((r: any) => {
                r = JSON.parse(r);
                 console.log("response data",r);
                if (r.hasOwnProperty('msg') && r?.msg == 'success' ) {
                    this.listDeclaration = r.hasOwnProperty('data')
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


    GetOrganism() {
        let body: any = {
            colone: this.colone,
            order: this.order,
            skip: this.skip,
            take: this.take,
        };
        this.ShowData = this._organismService
            .GetOrganism(body)
            .subscribe((r: any) => {
                r = JSON.parse(r);
                if (r.hasOwnProperty('msg') && r?.msg == 'success') {
                    let org: any[] = r.hasOwnProperty('data')
                        ? r?.['data']
                        : [];
                    this.organism = org[0] ? org[0] : null;
                    this.GetCurrentImage();
                } else {
                    this.generalService.errorSwal(r?.msg);
                }
            });
    }

    GetCurrentImage() {
        this.organismesService.GetImage().subscribe({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    const downloadedFile = new Blob([event.body], {
                        type: event.body.type,
                    });
                    let objectURl = URL.createObjectURL(downloadedFile);
                    this.imageUrl =
                        this.sanitizer.bypassSecurityTrustUrl(objectURl);
                    this.organism.logo = this.imageUrl;
                } else {
                    this.imageUrl = 'assets/layout/images/user-cicrle.svg';
                }
            },
        });
    }




    paginate(event: any) {
        this.take = event?.rows;
        this.skip = event?.first;
        setTimeout(() => {
            this.DisplayDeclaration();
        }, 10);
    }

    Sort(event: any) {
        this.colone = event?.field;
        this.order = event?.order == -1 ? 'DESC' : 'asc';
        setTimeout(() => {
            this.DisplayDeclaration();
        }, 10);
    }

    /* ----------------------- La fonction de suppression ----------------------- */
    DeleteAnDeclaration(ddp: any) {
        Swal.fire({
            title: 'Suppression',
            html: `<b> Êtes-vous sûr de vouloir supprimer declaration : </b></br>  ${ddp?.numero} ?`,
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
                    id: ddp?.id,
                };
                this.is_loading = true;
                this.delete = this.declaration_src
                    .DeleteAnDeclaration(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Supprimé':
                                this.DisplayDeclaration();
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

    /* -------------------------------------------------------------------------- */
    /*                            Ajout ou modification                           */
    /* -------------------------------------------------------------------------- */

    ShowFormulaire(action: any, data_selected_ddp: any = null) {
        if (action == 'Ajouté') {
            setTimeout(() => {
                this.if_show_ajouter = true;
            }, 100);
        } else if (action == 'modifier') {
            this.data_selected_ddp = data_selected_ddp;
            this.Header_info = `Modifier déclaration de perte : (${data_selected_ddp?.NumeroSerie})`;
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
            this.DisplayDeclaration();
        }
    }

    /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
    CloseUpdate(event: boolean) {
        if (!event) {
            this.if_show_modifier = false;
        } else {
            this.if_show_modifier = false;
            this.DisplayDeclaration();
        }
    }

    /* --------------------- Pour éviter les mémories leaks --------------------- */
    ngOnDestroy(): void {
        let unsubscribeListe: any = [
            this.ShowData,
            // this.Afficher_excel,
            this.delete,
            // this.Afficher_params,
        ];
        unsubscribeListe.forEach((element: any) => {
            if (element) {
                element?.unsubscribe();
            }
        });
    }

    goToStepInspection(id_ords: Number) {
        this.router.navigate(['/inspection/ajouter', id_ords]);
    }

    ShowValider(ords: any) {
        Swal.fire({
            title: 'Confirmation',
            html: `<b> Vous êtes sur de clôturer le Ordre de Service N° : </b></br>  ${ords?.numero} ?`,
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
                    id: ords?.id,
                };

                this.is_loading = true;
                this.delete = this.inspection_src
                    .ClosingeInspection(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        this.is_loading = false;
                        if (r?.codeReponse == 200) {
                            this.DisplayDeclaration();
                        }
                    });

            }
        })
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

    async ChangerStatutDeclaration(declarationId: number, nouveauStatut: number, numero: string) {
        const confirmation = Swal.fire({
            title: 'Changer le statut',
            html: `<b>Êtes-vous sûr de vouloir changer le statut de la déclaration avec  N° de série : </b></br>  ${numero} ?`,
            icon: 'question',
            showCancelButton: true,
            reverseButtons: true,
            cancelButtonText: 'Annuler',
            confirmButtonColor: '#258662',
            cancelButtonColor: '#f50707',
            confirmButtonText: 'Valider',
        });

        if ((await confirmation).isConfirmed) {
            // L'utilisateur a cliqué sur "Valider"
            this.is_loading = true;
            // Effectuez l'appel API pour changer le statut de la déclaration ici
            this.declaration_src.changerStatutDeclaration(declarationId, nouveauStatut)
                .subscribe(
                    response => {
                        Swal.fire('Succès', 'Statut de déclaration modifié avec succès', 'success');
                        this.DisplayDeclaration();
                    },
                    error => {
                        // Gérer les erreurs de l'appel API ici
                        console.error('Erreur lors de la modification du statut de déclaration', error);
                        // Affichez un message d'erreur en cas d'échec
                        Swal.fire('Erreur', 'Erreur lors de la modification du statut de déclaration', 'error');
                        this.is_loading = false;
                    }
                );
        } else {
            // L'utilisateur a cliqué sur "Annuler" ou a fermé la boîte de dialogue
        }
    }

    actualiserPage() {
        // Rechargez la page actuelle pour actualiser les données
        window.location.reload();
    }
}
