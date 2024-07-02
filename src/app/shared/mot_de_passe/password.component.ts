import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UtilisateursService } from 'src/app/services/utilisateurs/utilisateurs.service';

@Component({
    selector: 'app-password',
    templateUrl: './password.component.html',
})
export class PasswordComponent implements OnInit {
    /* ----------------------- les variables ----------------------- */
    is_loading: boolean = false;
    Modifier: Subscription;
    FormmulairePassword: FormGroup;
    IsFiled: boolean = false;
    Ifmessage: boolean = false;
    Error: number = 0;
    ApiMessage: any;
    Disabled: boolean = false;
    @Input('data_selected_user') data_selected_user: any; // data de l'utilisateur
    @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
    if_old_password_required: boolean = false;

    constructor(private utilisateurs_service: UtilisateursService) {
        /* ---------------------- Initialisation du formulaire ---------------------- */
        this.FormmulairePassword = new FormGroup({
            new_password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30),
            ]),
            re_new_password: new FormControl(null, [
                Validators.required,
                Validators.minLength(6),
                Validators.maxLength(30),
            ]),
        });
    }

    ngOnInit(): void {
    }

    ClosePopUp(state: boolean) {
        this.FermerPopUp.emit(state);
    }

    ChangePassword() {
        this.IsFiled = true;
        if (this.FormmulairePassword.valid) {
            if (
                this.FormmulairePassword.value.new_password ==
                this.FormmulairePassword.value.re_new_password
            ) {
                let body: any = {
                    newPassword: this.FormmulairePassword.value.new_password,
                    id: this.data_selected_user?.id_user, // celui a qui on change le mot de passe
                };
                this.is_loading = true;
                this.Disabled = true;
                this.Modifier = this.utilisateurs_service
                    .ModifierPasswordUtilisateur(body)
                    .subscribe((r: any) => {
                        r = JSON.parse(r)
                        switch (r?.msg) {
                            case 'Mot de passe modifie avec succes':
                                this.IsFiled = false;
                                this.success('Mot de passe modifie avec succes !');
                                break;
                            default:
                                this.error(r?.msg);
                                break;
                        }
                    });
            } else {
                this.error('Les deux mots de passes ne correspondent pas !');
            }
        } else {
            this.error('Formulaire invalide !');
        }
    }

    /* ------------------ Les fonctions de gestion des erreurs ------------------ */

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
        }, 2000);
    }

    get Formulaire_errors() {
        return this.FormmulairePassword.controls;
    }

    ngOnDestroy(): void {
        let unsubscribe_liste: any = [this.Modifier];
        unsubscribe_liste.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
    }
}
