import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { GeneralService, UtilisateursService } from 'src/app/services/services';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [
        `
            :host ::ng-deep .pi-eye,
            :host ::ng-deep .pi-eye-slash {
                transform: scale(1.6);
                margin-right: 1rem;
                color: var(--primary-color) !important;
            }
        `,
    ],
})
export class LoginComponent implements OnInit {
    valCheck: string[] = ['remember'];
    is_loading: boolean = false;
    Login: Subscription;
    FormulaireLogin: FormGroup;
    ApiMessage: any;
    IsHidden: boolean = false;
    IsFiled: boolean = false;
    Error: any = 0;

    constructor(
        public layoutService: LayoutService,
        private utilisateursService: UtilisateursService,
        private GeneralService: GeneralService,
        private router: Router
    ) {
        this.GeneralService.if_load = false; // suppression du loader
        /* ------------------ Initialisation du formulaire de login ----------------- */
        this.FormulaireLogin = new FormGroup({
            username: new FormControl(null, [
                Validators.maxLength(100),
                Validators.required,
            ]),
            password: new FormControl(null, [
                Validators.minLength(5),
                Validators.maxLength(30),
                Validators.required,
            ]),
        });
    }

    ngOnInit(): void {
        setTimeout(() => {
            this.is_loading = false;
        }, 500);
    }

    /* -------------------------------------------------------------------------- */
    /*                         Les fonctions pour le login                        */
    /* -------------------------------------------------------------------------- */

    get loginErrors() {
        return this.FormulaireLogin.controls;
    }

    LoginUtilisateur() {
        this.IsFiled = true;
        if (this.FormulaireLogin.valid) {
            this.is_loading = true;
            const body = {
                userName: this.FormulaireLogin.value.username.replace(/\s/g, ''),
                password: this.FormulaireLogin.value.password,
            };
            this.utilisateursService.LoginUtilisateur(body)
                .subscribe((response: any) => {
                    if (response?.isSucceed) {
                        this.IsHidden = false;
                        this.ApiMessage = 'Authentification valide';
                        this.Error = 0;
                        setTimeout(() => {
                            this.StoreData(response?.data);
                        }, 1000);
                    } else {
                        this.ApiMessage = response?.message || 'Une erreur est survenue';
                        this.error();
                    }
                }, (error) => {
                    this.ApiMessage = 'Une erreur est survenue : ' + error.message;
                    this.error();
                });
        } else {
            this.ApiMessage = 'Veuillez saisir les informations qui manquent';
            this.error();
        }
    }
    
    StoreData(data: any) {
        new Promise((resolve) => {
            let body: any[] = [
                {
                    key: 'nom_complet_utilisateur',
                    value: data.hasOwnProperty('nom_complet_utilisateur') ? data.nom_complet_utilisateur : null,
                },
                {
                    key: 'user_id',
                    value: data.hasOwnProperty('user_id') ? data.user_id : null,
                },
                {
                    key: 'jwt_token',
                    value: data.hasOwnProperty('XKestrel') ? data.XKestrel : null,
                },
                {
                    key: 'Roles_name',
                    value: data.hasOwnProperty('role_libelle') ? data.role_libelle : null,
                },
                {
                    key: 'id_role',
                    value: data.hasOwnProperty('id_role') ? data.id_role : null,
                },
                {
                    key: 'permissions',
                    value: data.hasOwnProperty('permissions') ? data?.permissions : null,
                },
                {
                    key: 'id_connected_user',
                    value: data.hasOwnProperty('id') ? data?.id : null,
                },
            ];
    
            resolve(body);
        }).then((body) => {
            setTimeout(() => {
                this.GeneralService.set_DataSession(body);
                setTimeout(() => {
                    if (data.id_role == environment.id_role_controller) {
                        this.router.navigate(['/']);
                        
                    } else if (data.id_role == environment.id_role_rtc) {
                        console.log("connection valide")
                        this.router.navigate(['/processus/list']);
                    } else {
                        this.router.navigate(['/']);
                    }
                }, 100);
            }, 100);
        });
    }
    
    /* -------------------------------------------------------------------------- */
    /*                            Les autres fonctions                            */
    /* -------------------------------------------------------------------------- */

    error() {
        this.IsHidden = false;
        this.Error = 2;
        this.is_loading = false;
        setTimeout(() => {
            this.IsHidden = true;
        }, 500);
    }

    ngOnDestroy(): void {
        let unsubscribe: any[] = [this.Login];
        unsubscribe.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
    }
}
