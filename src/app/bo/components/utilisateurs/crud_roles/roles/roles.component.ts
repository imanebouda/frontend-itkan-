import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { RoleService } from 'src/app/services/utilisateurs/role.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
})
export class RolesComponent implements OnInit {
    /* ------------------------------ Les variables globales ----------------------------- */
    is_loading: boolean = false;
    Afficher_role: Subscription;
    Supprimer: Subscription;
    /* ------------------------ les variables d'affichage ----------------------- */
    skip: any = 0;
    take: any = 10;
    order: any = 'asc';
    colone: any = 'name';
    totalRecords: any = 0;
    ListeRoles: any[] = [];

    /* ----------------- Les variables du popup ajout ou update ----------------- */
    Header_info: any;
    if_show_ajouter: boolean = false;
    if_show_modifier: boolean = false;
    data_selected_role: any;

    constructor(
        private generalService: GeneralService,
        private role_Service: RoleService
    ) { }

    ngOnInit(): void {
        /* ------------------------- Récupératio des données ------------------------ */
        this.AfficherRole();
    }

    /* -------------------------------------------------------------------------- */
    /*                       Les fonctions pour l'affichage                       */
    /* -------------------------------------------------------------------------- */

    AfficherRole() {
        this.is_loading = true;
        let body: any = {
            colone: this.colone,
            order: this.order,
            skip: this.skip,
            take: this.take,
        };
        this.Afficher_role = this.role_Service.AfficherRole(body).subscribe(
            (r: any) => {
                r = JSON.parse(r);
                if (
                    r.hasOwnProperty('msg') &&
                    r?.msg == 'success'
                ) {
                    this.ListeRoles = r.hasOwnProperty('data')
                        ? r?.['data']
                        : [];
                        console.log(this.ListeRoles);
                    this.totalRecords = r.hasOwnProperty('TotalRows')
                        ? r?.['TotalRows']
                        : 0;
                    this.is_loading = false;
                } else {
                    this.generalService.errorSwal(
                        'Oups quelque chose a mal tourné ...'
                    );
                    this.is_loading = false;
                }
            }
        );
    }

    paginate(event: any) {
        this.take = event?.rows;
        this.skip = event?.first;
        setTimeout(() => {
            this.AfficherRole();
        }, 10);
    }

    Sort(event: any) {
        this.colone = event?.field;
        this.order = event?.order == -1 ? 'DESC' : 'asc';
        setTimeout(() => {
            this.AfficherRole();
        }, 10);
    }

    /* -- Lors de la destruction du composant pour ne pas avoir les memories leaks --*/

    ngOnDestroy(): void {
        let unsubscribeRole = [this.Afficher_role];
        unsubscribeRole.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
    }

     /* ----------------------- La fonction de suppression ----------------------- */
     SupprimerRole(role: any) {
        Swal.fire({
            title: 'Suppression',
            html: `<b>Êtes-vous sûr de vouloir supprimer profile : </b></br>  ${role?.Name} ?`,
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
                    id: role?.Id
                };
                this.is_loading = true;
                this.Supprimer = this.role_Service
                    .SupprimerRole(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r);
                        switch (r?.msg) {
                            case 'Supprimé':
                                this.AfficherRole();
                                this.generalService.errorSwal(
                                    'Role supprimé !',
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

    ShowFormulaire(action: any, data_selected_role: any = null) {
        if (action == 'Ajouté') {
            setTimeout(() => {
                this.if_show_ajouter = true;
            }, 100);
        } else if (action == 'modifier') {
            this.data_selected_role = data_selected_role;
            this.Header_info = `Modifier rôle : (${data_selected_role?.Name})`;
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
            this.AfficherRole();
        }
    }

    /* ---------------- Férmeture du popup Update des utilisateurs ---------------- */
    CloseUpdate(event: boolean) {
        if (!event) {
            this.if_show_modifier = false;
        } else {
            this.if_show_modifier = false;
            this.AfficherRole();
        }
    }
}
