import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { ParametrageService } from 'src/app/services/services';
import { SiteService } from 'src/app/services/site/site.service';


@Component({
  selector: 'app-add-site',
  templateUrl: './add-site.component.html',
  styleUrls: ['./add-site.component.scss']
})
export class AddSiteComponent {
/* ------------------------------ Les variables globales ----------------------------- */
Afficher_params: Subscription;
Ajouter: Subscription;
Restaurer: Subscription;
@Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
is_loading: boolean = true;
has_access_yes: any = [];
/* ----------------------- les variables du formulaire ---------------------- */
Formmulaire_ajout_parametrage: FormGroup;
IsFiled: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;

constructor(
    private site_service : SiteService
) {
    /* ---------------------- Initialisation du formulaire ---------------------- */
    this.Formmulaire_ajout_parametrage = new FormGroup({
        /* ---------------------------- les champs requis --------------------------- */
        libelle: new FormControl(null, [
            Validators.required
        ]),
        description: new FormControl(null, [
            Validators.required]),
    });
}

ngOnInit(): void {
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
    return this.Formmulaire_ajout_parametrage.controls;
}

/* ------------------------ Lors du click sur valider ----------------------- */

SubmitForm() {
    this.IsFiled = true;
    if (this.Formmulaire_ajout_parametrage.valid) {
        this.is_loading = true;
        this.Disabled = true;
        this.CallApiAjouter();
    } else {
        this.error('Formulaire invalide !');
    }
}

CallApiAjouter() {
    this.Ajouter = this.site_service 
        .AjouterParametrage(this.Formmulaire_ajout_parametrage.value)
        .subscribe((r: any) => {
            r = JSON.parse(r);
            switch (r?.['msg']) {
                case 'Ajouté':
                    this.success('Site ajouté(e)');
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
