import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { ApiGeneralService } from 'src/app/services/api_general/api_general.service';
import { ParametrageService } from 'src/app/services/services';
import { SiteService } from 'src/app/services/site/site.service';
import { SmqService } from 'src/app/services/smq/smq.service';


@Component({
  selector: 'app-add-smq',
  templateUrl: './add-smq.component.html',
  styleUrls: ['./add-smq.component.scss']
})
export class AddSmqComponent {
/* ------------------------------ Les variables globales ----------------------------- */
Afficher_params: Subscription;
Ajouter: Subscription;
Restaurer: Subscription;
@Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
is_loading: boolean = true;
has_access_yes: any = [];
skip: any = 0;
take: any = 10;
order: any = 'asc';
colone: any = 'label';
/* ----------------------- les variables du formulaire ---------------------- */
Formmulaire_ajout_parametrage: FormGroup;
IsFiled: boolean = false;
Ifmessage: boolean = false;
Error: number = 0;
ApiMessage: any;
Disabled: boolean = false;
  Afficher: any;
  smqList: any;
  siteList: any;

constructor(
    private smq_service: SmqService,
    private site_service : SiteService,
    private generalService : GeneralService,
) {
    /* ---------------------- Initialisation du formulaire ---------------------- */
    this.Formmulaire_ajout_parametrage = new FormGroup({
        /* ---------------------------- les champs requis --------------------------- */
        Libelle: new FormControl(null, [ Validators.required]),
        SiteID: new FormControl(0, { validators: [Validators.required], updateOn: 'blur' }),
        Description: new FormControl(null, [Validators.required]),
    });
}

ngOnInit(): void {
    /* ----------------------- Initialisation des valeurs ----------------------- */
    setTimeout(() => {
        this.is_loading = false;
    }, 500);
    this.AfficherparametrageSite();
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
    this.Ajouter = this.smq_service
        .AjouterParametrage(this.Formmulaire_ajout_parametrage.value)
        .subscribe((r: any) => {
            r = JSON.parse(r);
            switch (r?.['msg']) {
                case 'Ajouté':
                    this.success('Parametrage ajouté(e)');
                    break;
                default:
                    this.error(r?.msg);
                    break;
            }
        });
}

AfficherparametrageSite() {
  this.is_loading = true;
  let body: any = {
    colone: this.colone,
    order: this.order,
    skip: this.skip,
    take: this.take,
  };
  this.Afficher = this.site_service
      .AfficherParametrage(body)
      .subscribe((res: any) => {
          res = JSON.parse(res);
          console.log(res);
          if (res.codeReponse === 200) {
            /* -------------------------------- Les rôles ------------------------------- */
            if (res.data) {
              this.siteList  = res.data.map((element: any) => ({
                value: element.ID,
                label: element.Libelle
              }));
            }
          } else {
            this.generalService.errorSwal('Oups quelque chose a mal tourné ...');
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
