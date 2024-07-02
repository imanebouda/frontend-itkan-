import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { PusherService } from 'src/app/services/general/pusher.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { UtilisateursService } from 'src/app/services/utilisateurs/utilisateurs.service';

@Component({
    selector: 'app-formulaire-update-utilisateurs',
    templateUrl: './utilisateurs_update.component.html',
})
export class UpdateUtilisateurComponent implements OnInit {
    /* ------------------------------ Les variables globales ----------------------------- */
    Afficher_params: Subscription;
    Modifier: Subscription;
    Restaurer: Subscription;
    @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
    @Input('data_selected_user') data_selected_user: any; // data de l'utilisateur
    is_loading: boolean = true;
    /* ----------------------- les variables du formulaire ---------------------- */
    Formmulaire_update_utilisateur: FormGroup;
    IsFiled: boolean = false;
    Ifmessage: boolean = false;
    Error: number = 0;
    ApiMessage: any;
    Disabled: boolean = false;
    /* ------------------------------- les listes depuis l'environment ------------------------------- */
    liste_autorisations: any[] = [];
    liste_type_civilite: any[] = [];
    /* ------------------------- les listes depuis l'api ------------------------ */
    liste_roles: any[] = [];
    liste_departements: any[] = [];
    liste_villes: any[] = [];
    liste_superviseurs: any[] = []; // les superviseurs

    constructor(
        private generalService: GeneralService,
        private apiGeneralService: ApiGeneralService,
        private pusherService: PusherService,
        private utilisateurs_service: UtilisateursService
    ) {
        /* ---------------------- Initialisation du formulaire ---------------------- */
        this.Formmulaire_update_utilisateur = new FormGroup({
            Id: new FormControl(null, Validators.required),
            /* ---------------------------- les champs requis --------------------------- */
            IdRole: new FormControl(null, Validators.required),
            Email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            Username: new FormControl(null, [
                Validators.required,
            ]),
            NomCompletUtilisateur: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
            ])
        });
    }

    ngOnInit(): void {
        console.log('data_selected_user',this.data_selected_user);
        /* -------------------------------------------------------------------------- */
        /*                                Data binding                                */
        /* -------------------------------------------------------------------------- */
        let data_to_append: any = {
            id_role: this.data_selected_user?.IdRole,
        };
        console.log(data_to_append);
        
        this.LoadRolesList(data_to_append);

        let fields: any[] = [
            'Id',
            'Email',
            'NomCompletUtilisateur',
            'IdRole',
            'Username'
        ];
        fields.forEach((element) => {
            this.Formmulaire_update_utilisateur.get(element).setValue(
                this.data_selected_user.hasOwnProperty(element)
                    ? this.data_selected_user?.[element]
                    : null
            );
        });
                
        setTimeout(() => {
            this.is_loading = false;
        }, 500);
    }

    /* -------------------------------------------------------------------------- */
    /*                             Gestion des erreurs                            */
    /* -------------------------------------------------------------------------- */

    error(message: any) {
        this.is_loading = false;
        this.Error = 1;
        this.ApiMessage = message;
        this.Disabled = false;
        this.Ifmessage = true;
        setTimeout(() => {
            this.Ifmessage = false;
        }, 3000);
    }

    success(message: any, if_same_as_logger: boolean = false) {
        /* -------------------------------------------------------------------------- */
        /*                       Si c'est un self UPDATE DE USER                      */
        /* -------------------------------------------------------------------------- */
        if (if_same_as_logger) {
            /* -------------------------------------------------------------------------- */
            /*                               UPDATE SIDEBAR                               */
            /* -------------------------------------------------------------------------- */
            let side_bar_data: any = {
                nom_complet_utilisateur:
                    this.Formmulaire_update_utilisateur.value
                        .NomCompletUtilisateur,
                Roles_name: this.liste_roles.find(
                    (elem1: any) =>
                        elem1?.value ==
                        this.Formmulaire_update_utilisateur.value.IdRole
                )?.label,
            };
            this.pusherService.FunctionSidebar_data(side_bar_data); // mise à jour des infos user sur le sidebar
            /* -------------------------------------------------------------------------- */
            /*                               UPDATE SESSION                               */
            /* -------------------------------------------------------------------------- */
            let session_data: any[] = [
                {
                    key: 'nom_complet_utilisateur',
                    value: this.Formmulaire_update_utilisateur.value
                        .NomCompletUtilisateur,
                },
                {
                    key: 'Roles_name',
                    value: this.Formmulaire_update_utilisateur.value
                        .Roles_name,
                },
            ];
            this.generalService.set_DataSession(session_data);
        }

        this.Error = 0;
        this.ApiMessage = message;
        this.Ifmessage = true;
        setTimeout(() => {
            this.ClosePopUp(true);
            this.Ifmessage = false;
            this.Error = 0;
            this.ApiMessage = '';
            this.Disabled = false;
            this.is_loading = false;
        }, 500);
    }

    get FormulaireErrors() {
        return this.Formmulaire_update_utilisateur.controls;
    }

    /* ------------------------ Lors du click sur valider ----------------------- */

    SubmitForm() {
        this.IsFiled = true;
        if (this.Formmulaire_update_utilisateur.valid) {
            this.is_loading = true;
            this.Disabled = true;
            this.CallApiUpdate();
        } else {
            this.error('Formulaire invalide !');
        }
    }

    CallApiUpdate() {
        this.Modifier = this.utilisateurs_service
            .ModifierUtilisateur(this.Formmulaire_update_utilisateur.value)
            .subscribe((r: any) => {
                r = JSON.parse(r);

                switch (r?.['msg']) {
                    case 'Modifié':
                        this.success(
                            'Utilisateur(e) modifié(e)',
                            r?.['if_same_as_logger']
                        );
                        break;
                    default:
                        this.error(r?.['msg']);
                        break;
                }
            });
    }

    /* ----------------------------- Fermer le popup ---------------------------- */
    ClosePopUp(state: boolean) {
        this.FermerPopUp.emit(state);
    }


    LoadRolesList(data_to_append: any) {
        let body: any = {
            roles: true,
        };
    
        this.Afficher_params = this.apiGeneralService
            .LoadRolesList(body)
            .subscribe((res: any) => {
                res = JSON.parse(res);
                console.log(res);
                if (res.hasOwnProperty('msg') && res?.['msg'] == 'success') {
                    new Promise((resolve) => {
                        /* -------------------------------- les rôles ------------------------------- */
                        if (res.hasOwnProperty('data')) {
                            res?.['data'].forEach((element: any) => {
                                const IdRole =element?.Id;
                                this.liste_roles.push({
                                    value: IdRole,
                                    label: element?.Name
                                });
                                console.log('Valeurs de liste_roles : ');
                                this.liste_roles.forEach((role) => {
                                    console.log(role.value);
                                    console.log(role.label);
                                });
                            });
                        }
                        resolve(data_to_append);
                    }).then((value: any) => {
                        this.Formmulaire_update_utilisateur.get('IdRole').setValue(value?.id_role);
                         console.log('value : ',value?.id_role)
                    });
                } else {
                    this.generalService.errorSwal(res?.['msg']);
                    this.is_loading = false;
                }
            });
    }
    


    /* -- Lors de la destruction du composant pour ne pas avoir les memories leaks --*/

    ngOnDestroy(): void {
        let unsubscribe_liste: any[] = [
            this.Modifier,
            this.Restaurer,
            this.Afficher_params,
        ];
        unsubscribe_liste.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
    }
}
