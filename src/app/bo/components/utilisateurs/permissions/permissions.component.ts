import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { ApiGeneralService } from 'src/app/services/services';
import { PermissionService } from 'src/app/services/utilisateurs/permission.service';

@Component({
    selector: 'app-permissions',
    templateUrl: './permissions.component.html',
})
export class PermissionsComponent implements OnInit {
    /* ------------------------------ Les variables globales ----------------------------- */
    is_loading: boolean = false;
    Afficher_permission: Subscription;
    /* ------------------------ les variables d'affichage ----------------------- */
    skip: any = 0;
    take: any = 10;
    order: any = 'asc';
    colone: any = 'libelle_permission';
    totalRecords: any = 0;
    Formmulaire_permissions: FormGroup
    items: FormArray;
    ListePermissions: any[];
    ListeAccess: any[];
    FormmulaireRecherche: FormGroup;
    liste_roles: any[] = [];
    Afficher_params: Subscription;
    Ajouter: Subscription;
    Ifmessage: boolean = false;
    Error: number = 0;
    ApiMessage: any;

    constructor(
        private apiGeneralService: ApiGeneralService,
        private generalService: GeneralService,
        private permissionService: PermissionService
    ) {
        this.FormmulaireRecherche = new FormGroup({
            id_role: new FormControl(null),
            controller: new FormControl(null)
        });
    }

    ngOnInit(): void {
        this.LoadRolesList();
    }

    RechercherPermission() {
        setTimeout(() => {
            this.AfficherPermission();
        }, 100);
    }

    LoadRolesList() {
        this.is_loading = true
        let body: any = {
            roles: true,
        };
        this.Afficher_params = this.apiGeneralService
            .LoadRolesList(body)
            .subscribe((res: any) => {
                res = JSON.parse(res);
                console.log('res',res);
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

                        this.FormmulaireRecherche.get("id_role").setValue(this.liste_roles[0]?.value)
                        this.AfficherPermission();
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

    AfficherPermission() {
        this.is_loading = true;
        let body: any = {
            id_role: this.FormmulaireRecherche.value.id_role,
            controller: this.FormmulaireRecherche.value.controller,
        };
        this.Afficher_permission = this.permissionService
            .AfficherPermission(body)
            .subscribe((r: any) => {
                r = JSON.parse(r)
                console.log(r);
                if (
                    r.hasOwnProperty('msg') &&
                    r?.msg == 'success'
                ) {
                    this.ListePermissions = r.hasOwnProperty('data')
                        ? r?.['data']
                        : [];

                    this.ListeAccess = this.ListePermissions.filter((p) => p.haspermiss == true)
                    this.ListePermissions = this.ListePermissions.filter((p) => p.haspermiss == false)
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
            this.AfficherPermission();
        }, 10);
    }

    Sort(event: any) {
        this.colone = event?.field;
        this.order = event?.order == -1 ? 'DESC' : 'asc';
        setTimeout(() => {
            this.AfficherPermission();
        }, 10);
    }

    /* -- Lors de la destruction du composant pour ne pas avoir les memories leaks --*/

    ngOnDestroy(): void {
        let unsubscribePermission = [this.Afficher_permission];
        unsubscribePermission.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
    }

    OnSubmit(body:any) {
        this.Ajouter = this.permissionService
            .AjouterPermissions(body)
            .subscribe((r: any) => {
                r = JSON.parse(r);
                console.log( r)
                switch (r?.['msg']) {
                    case 'Ajouté':
                        this.success('Permission (e) ajouté(e)');
                        this.AfficherPermission();
                        break;
                    default:
                        this.error(r?.msg);
                        break;
                }
            });
    }


    error(message: any) {
        this.is_loading = false;
        this.Error = 1;
        this.ApiMessage = message;
        this.Ifmessage = true;
        setTimeout(() => {
            this.Ifmessage = false;
        }, 3000);
    }

    success(message: any) {
        this.Error = 0;
        this.ApiMessage = message;
        this.Ifmessage = true;
        setTimeout(() => {
            this.Ifmessage = false;
            this.Error = 0;
            this.ApiMessage = '';
            this.is_loading = false;
        }, 500);
    }

    onMoveToSource(event:any){

        var body:any = {
            id_role:this.FormmulaireRecherche.value.id_role,
            access: this.ListeAccess
        }

        this.OnSubmit(body)

    }

    onMoveToTarget(event:any){

        var body:any = {
            id_role:this.FormmulaireRecherche.value.id_role,
            access: this.ListeAccess
        }
        
        this.OnSubmit(body)
    }
}
