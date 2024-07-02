import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { PusherService } from 'src/app/services/general/pusher.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { RoleService } from 'src/app/services/utilisateurs/role.service';

@Component({
    selector: 'app-formulaire-update-roles',
    templateUrl: './role_update.component.html',
})
export class UpdateRoleComponent implements OnInit {
    /* ------------------------------ Les variables globales ----------------------------- */
    Afficher_params: Subscription;
    Modifier: Subscription;
    Restaurer: Subscription;
    @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
    @Input('data_selected_role') data_selected_role: any; // data de l'utilisateur
    is_loading: boolean = true;
    /* ----------------------- les variables du formulaire ---------------------- */
    Formmulaire_update_role: FormGroup;
    IsFiled: boolean = false;
    Ifmessage: boolean = false;
    Error: number = 0;
    ApiMessage: any;
    Disabled: boolean = false;
    /* ------------------------- les listes depuis l'api ------------------------ */
    liste_roles: any[] = [];

    constructor(
        private generalService: GeneralService,
        private apiGeneralService: ApiGeneralService,
        private pusherService: PusherService,
        private role_service: RoleService
    ) {
        /* ---------------------- Initialisation du formulaire ---------------------- */
        this.Formmulaire_update_role = new FormGroup({
            Id: new FormControl(null, Validators.required),
            /* ---------------------------- les champs requis --------------------------- */
            Name: new FormControl(null, Validators.required),
            Code: new FormControl(null, Validators.required),
        });
    }

    ngOnInit(): void {
        /* -------------------------------------------------------------------------- */
        /*                                Data binding                                */
        /* -------------------------------------------------------------------------- */
        let fields: any[] = [
            'Id',
            'Name',
            'Code'
        ];
        
        fields.forEach((element) => {
            this.Formmulaire_update_role.get(element).setValue(
                this.data_selected_role.hasOwnProperty(element)
                    ? this.data_selected_role?.[element]
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
                Name:
                    this.Formmulaire_update_role.value
                        .Name
            };
            this.pusherService.FunctionSidebar_data(side_bar_data); // mise à jour des infos user sur le sidebar
            /* -------------------------------------------------------------------------- */
            /*                               UPDATE SESSION                               */
            /* -------------------------------------------------------------------------- */
            let session_data: any[] = [
                {
                    key: 'ame',
                    value: this.Formmulaire_update_role.value
                        .Name,
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
        return this.Formmulaire_update_role.controls;
    }

    /* ------------------------ Lors du click sur valider ----------------------- */

    SubmitForm() {
        this.IsFiled = true;

        if (this.Formmulaire_update_role.valid) {
            this.is_loading = true;
            this.Disabled = true;
            this.CallApiUpdate();
        } else {
            this.error('Formulaire invalide !');
        }
    }

    CallApiUpdate() {
        this.Modifier = this.role_service
            .ModifieRole(this.Formmulaire_update_role.value)
            .subscribe((r: any) => {
                r = JSON.parse(r);

                switch (r?.['msg']) {
                    case 'Modifié':
                        this.success(
                            'Profile modifié(e)',
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
