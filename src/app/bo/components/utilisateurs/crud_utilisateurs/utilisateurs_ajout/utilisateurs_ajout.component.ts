import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { GeneralService } from 'src/app/services/general/general.service';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { UtilisateursService } from 'src/app/services/utilisateurs/utilisateurs.service';

@Component({
    selector: 'app-formulaire-ajout-utilisateurs',
    templateUrl: './utilisateurs_ajout.component.html',
})
export class AjoutUtilisateurComponent implements OnInit {
    /* ------------------------------ Les variables globales ----------------------------- */
    Afficher_params: Subscription;
    Ajouter: Subscription;
    Restaurer: Subscription;
    @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
    is_loading: boolean = true;
    has_access_yes: any = [];
    /* ----------------------- les variables du formulaire ---------------------- */
    Formmulaire_ajout_utilisateur: FormGroup;
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
    liste_superviseurs: any[] = []; // les superviseurs

    constructor(
        private generalService: GeneralService,
        private apiGeneralService: ApiGeneralService,
        private utilisateurs_service: UtilisateursService
    ) {
        /* ---------------------- Initialisation du formulaire ---------------------- */
        this.Formmulaire_ajout_utilisateur = new FormGroup({
            /* ---------------------------- les champs requis --------------------------- */
            id_role: new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
            email: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            username: new FormControl(null, [
                Validators.required
            ]),
            nom_complet_utilisateur: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
            ]),
            password: new FormControl(null, Validators.required)
        });
    }

    ngOnInit(): void {
        this.LoadRolesList(); // Chargement des listes
        /* ----------------------- Initialisation des valeurs ----------------------- */
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

    success(message: any) {
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
        return this.Formmulaire_ajout_utilisateur.controls;
    }

    /* ------------------------ Lors du click sur valider ----------------------- */

    SubmitForm() {
        this.IsFiled = true;
        if (this.Formmulaire_ajout_utilisateur.valid) {
            this.is_loading = true;
            this.Disabled = true;
            this.CallApiAjouter();
        } else {
            this.error('Formulaire invalide !');
        }
    }

    CallApiAjouter() {
        this.Ajouter = this.utilisateurs_service
            .AjouterUtilisateur(this.Formmulaire_ajout_utilisateur.value)
            .subscribe((r: any) => {
                r = JSON.parse(r);
                switch (r?.['msg']) {
                    case 'Ajouté':
                        this.success('Utilisateur(e) ajouté(e)');
                        break;
                    default:
                        this.error(r?.msg);
                        break;
                }
            });
    }

    /* ----------------------------- Fermer le popup ---------------------------- */
    ClosePopUp(state: boolean) {
        this.FermerPopUp.emit(state);
    }

    LoadRolesList() {
        let body: any = {
            roles: true,
            users: true,
        };
        this.Afficher_params = this.apiGeneralService
            .LoadRolesList(body)
            .subscribe((res: any) => {
                res = JSON.parse(res)
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
                    this.is_loading = false;
                }
            });
    }

    /* -- Lors de la destruction du composant pour ne pas avoir les memories leaks --*/

    ngOnDestroy(): void {
        let unsubscribe_liste: any[] = [
            this.Ajouter,
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
