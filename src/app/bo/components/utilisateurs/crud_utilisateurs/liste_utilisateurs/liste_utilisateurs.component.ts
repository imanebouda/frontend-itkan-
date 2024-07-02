import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { UtilisateursService } from 'src/app/services/utilisateurs/utilisateurs.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-liste_utilisateurs',
    templateUrl: './liste_utilisateurs.component.html',
})
export class ListeUtilisateursComponent implements OnInit {
    /* ------------------------- Les variables globales ------------------------- */
    Afficher_excel: Subscription;
    Afficher: Subscription;
    Supprimer: Subscription;
    Afficher_params: Subscription;
    is_loading: boolean = false;
    /* ------------------------ les variables d'affichage ----------------------- */
    skip: any = 0;
    take: any = 10;
    order: any = 'asc';
    colone: any = 'NomCompletUtilisateur';
    totalRecords: any = 0;
    liste_utilisateurs: any[] = [];
    FormmulaireRecherche: FormGroup;
    /* ----------------- Les variables du popup ajout ou update ----------------- */
    Header_info: any;
    if_show_ajouter: boolean = false;
    if_show_modifier: boolean = false;
    data_selected_user: any;
    /* ------------------------- le popup détails image ------------------------- */
    desc_image: any;
    if_show_image: boolean = false;
    image_user: any;
    API_BASE_URL_STORAGE_USERS: any = '';
    /* ----------------------- les liste pour la rechrche ----------------------- */
    liste_autorisations: any[] = [];
    liste_roles: any[] = [];
    liste_departements: any[] = [];
    /* ---------------------- Popup documents --------------------- */
    if_show_document: boolean = false;
    /* ----------------------------- Popup passoword ---------------------------- */
    if_show_update_password: boolean = false;

    constructor(
        private generalService: GeneralService,
        private apiGeneralService: ApiGeneralService,
        private user_service: UtilisateursService
    ) {
        /* ---------------------- Initialisation du formulaire ---------------------- */
        this.FormmulaireRecherche = new FormGroup({
            email: new FormControl(null),
            nom_complet_utilisateur: new FormControl(null),
            id_role: new FormControl(null),
        });
    }

    ngOnInit(): void {
        this.LoadRolesList(); // Chargement des listes
         this.AfficherUtilisateur();
    }

    LoadRolesList() {
        let body: any = {
            roles: true,
        };
        this.Afficher_params = this.apiGeneralService
            .LoadRolesList(body)
            .subscribe((res: any) => {
                res = JSON.parse(res);
             
                if (
                    res.hasOwnProperty('msg') &&
                    res?.['msg'] == 'success'
                ) {
                    /* -------------------------------- les rôles ------------------------------- */
                    if (res.hasOwnProperty('data')) {                        
                        res?.['data'].forEach((element: any) => {

                            this.liste_roles.push({
                                value: element?.Id,
                                label: element?.Name
                            });
                        });
                    }
                } else {
                    this.generalService.errorSwal(
                        'Oups quelque chose a mal tourné ...'
                    );
                }
            });
    }

    /* -------------------------------------------------------------------------- */
    /*                       Les fonctions pour l'affichage                       */
    /* -------------------------------------------------------------------------- */

    ClearSearch() {
        this.FormmulaireRecherche.reset();
        setTimeout(() => {
            this.RechercherUtilisateur();
        }, 100);
    }

    RechercherUtilisateur() {
        this.skip = 0;
        this.take = 10;
        setTimeout(() => {
          this.AfficherUtilisateur();
        }, 100);
    }

    AfficherUtilisateur() {
        this.is_loading = true;
        let body: any = {
            colone: this.colone,
            order: this.order,
            skip: this.skip,
            take: this.take,
            nom_complet_utilisateur:
                this.FormmulaireRecherche.value.nom_complet_utilisateur,
            email: this.FormmulaireRecherche.value.email,
            id_role: this.FormmulaireRecherche.value.id_role
        };
        this.Afficher = this.user_service
            .AfficherUtilisateur(body)
            .subscribe((r: any) => {
                r = JSON.parse(r);
                if (
                    r.hasOwnProperty('msg') &&
                    r?.msg == 'success'
                ) {
                    this.liste_utilisateurs = r.hasOwnProperty('data')
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
          this.AfficherUtilisateur();
        }, 10);
    }

    Sort(event: any) {
        this.colone = event?.field;
        this.order = event?.order == -1 ? 'DESC' : 'asc';
        setTimeout(() => {
         this.AfficherUtilisateur();
        }, 10);
    }

    exportToExcel() {
        this.is_loading = true;
        let body: any = {
            if_excel: true,
            colone: this.colone,
            order: this.order,
            nom_complet_utilisateur:
                this.FormmulaireRecherche.value.nom_complet_utilisateur,
            email: this.FormmulaireRecherche.value.email,
            id_role: this.FormmulaireRecherche.value.id_role
        };
        this.Afficher_excel = this.user_service
            .AfficherUtilisateur(body)
            .subscribe((res: any) => {
                if (
                    res.hasOwnProperty('msg') &&
                    res?.['msg'] == 'success'
                ) {
                    if (res?.Data.length > 0) {
                        new Promise((resolve) => {
                            let myFormatedData: any[] = [];
                            res?.['data'].forEach((element: any) => {
                                /* ------------------------------- Remplissage ------------------------------ */
                                myFormatedData.push({
                                    "Autorisation d'accès":
                                        element?.label_has_access,
                                    Email: element?.email,
                                    Rôle: element?.Roles_name
                                        ? element?.Roles_name
                                        : '',
                                    'Nom complet utilisateur(e)':
                                        element?.nom_complet_utilisateur,
                                    Téléphone: element?.telephone_user
                                        ? element?.telephone_user
                                        : '',
                                    Civilité: element?.libelle_type_civilite
                                        ? element?.libelle_type_civilite
                                        : '',
                                    Ville: element?.libelle_ville
                                        ? element?.libelle_ville
                                        : '',
                                    Observation: element?.description
                                        ? element?.description
                                        : '',
                                    Superviseur: element?.libelle_superviseur
                                        ? element?.libelle_superviseur
                                        : '',
                                    "Date d'ajout sur le système":
                                        element?.created_at_formated
                                            ? element?.created_at_formated
                                            : '',
                                    'Date de la dernière modification':
                                        element?.updated_at_formated
                                            ? element?.updated_at_formated
                                            : '',
                                });
                            });
                            resolve(myFormatedData);
                        }).then((myFormatedData) => {
                            setTimeout(() => {
                                this.generalService.exportAsExcelFile(
                                    myFormatedData,
                                    'liste_employees'
                                );
                                this.is_loading = false;
                            }, 100);
                        });
                    } else {
                        this.generalService.errorSwal('Aucun uttilisateur');
                        this.is_loading = false;
                    }
                } else {
                    this.generalService.errorSwal(
                        'Oups quelque chose a mal tourné ...'
                    );
                    this.is_loading = false;
                }
            });
    }

    /* ----------------------- La fonction de suppression ----------------------- */
    SupprimerUtilisateur(utilisateur: any) {
        Swal.fire({
            title: 'Suppression',
            html: `<b>Êtes-vous sûr de vouloir supprimer l'utilisateur(e) : </b></br>  ${utilisateur?.NomCompletUtilisateur} ?`,
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
                    id: utilisateur?.Id
                };
                this.is_loading = true;
                this.Supprimer = this.user_service
                    .SupprimerUtilisateur(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Supprimé':
                             this.AfficherUtilisateur();
                                this.generalService.errorSwal(
                                    'Utilisateur supprimé !',
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

    ShowFormulaire(action: any, data_selected_user: any = null) {
        if (action == 'Ajouté') {
            setTimeout(() => {
                this.if_show_ajouter = true;
            }, 100);
        } else if (action == 'modifier') {
            this.data_selected_user = data_selected_user;
            this.Header_info = `Modification de l'utilisateur(e) : (${data_selected_user?.NomCompletUtilisateur})`;
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
         this.AfficherUtilisateur();
        }
    }

    /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
    CloseUpdate(event: boolean) {
        if (!event) {
            this.if_show_modifier = false;
        } else {
            this.if_show_modifier = false;
         this.AfficherUtilisateur();
        }
    }

    /* -------------------------------------------------------------------------- */
    /*                       Les documents de l'utilisateur                       */
    /* -------------------------------------------------------------------------- */

    GegerDocument(data_selected_user: any) {
        this.data_selected_user = data_selected_user;
        this.Header_info = `Documents de l'utilisateur(e) : (${data_selected_user?.NomCompletUtilisateur})`;
        setTimeout(() => {
            this.if_show_document = true;
        }, 100);
    }

    CloseDocuments(event: boolean) {
        if (event) {
          this.AfficherUtilisateur();
            this.if_show_document = false;
        } else {
            this.if_show_document = false;
        }
    }

    /* -------------------------------------------------------------------------- */
    /*              Fonction pour agrandir une image de l'utilisateur             */
    /* -------------------------------------------------------------------------- */
    Showimage(dataItem: any) {
        this.is_loading = true;
        this.image_user = dataItem?.image_user;
        this.desc_image = dataItem?.NomCompletUtilisateur;
        setTimeout(() => {
            this.if_show_image = true;
            setTimeout(() => {
                this.is_loading = false;
            }, 500);
        }, 100);
    }

    /* -------------------------------------------------------------------------- */
    /*                Modification d'un mot de passe d'utilisateur                */
    /* -------------------------------------------------------------------------- */

    ShowUpdatePassword(dataItem: any) {
        this.data_selected_user = {
            same_user_as_connected: dataItem?.same_user_as_connected,
            id_user: dataItem?.id,
        };
        this.Header_info = `Modification du mot de passe de l'utilisateur(e) : (${dataItem?.NomCompletUtilisateur})`;
        setTimeout(() => {
            this.if_show_update_password = true;
        }, 100);
    }

    ClosePassword(event: boolean) {
        if (event) {
          this.AfficherUtilisateur();
            this.if_show_update_password = false;
        } else {
            this.if_show_update_password = false;
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
