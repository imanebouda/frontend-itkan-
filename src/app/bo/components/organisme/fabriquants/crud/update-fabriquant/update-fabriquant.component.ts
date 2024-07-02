import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { FabriquantsService } from 'src/app/services/fabriquant/fabriquant.service';
import { LigneService } from 'src/app/services/ligne/ligne.service';
import { GeneralService } from 'src/app/services/services';

@Component({
  selector: 'app-update-fabriquant',
  templateUrl: './update-fabriquant.component.html'
})
export class UpdateFabriquantComponent {
/* ------------------------------ Les variables globales ----------------------------- */
  Afficher_params: Subscription;
  Modifier: Subscription;
  Restaurer: Subscription;
  ShowDataLigne: Subscription;
  @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
  @Input('data_selected_fabriquant') data_selected_fabriquant: any; // data de fabriquant
  is_loading: boolean = true;
  /* ----------------------- les variables du formulaire ---------------------- */
  Formmulaire_update_fabriquant: FormGroup;
  IsFiled: boolean = false;
  Ifmessage: boolean = false;
  Error: number = 0;
  ApiMessage: any;
  Disabled: boolean = false;
  listLignes: any = [];

  constructor(
      private fabriquantService: FabriquantsService,
      private ligneService: LigneService,
      private generalService: GeneralService
  ) {
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.Formmulaire_update_fabriquant = new FormGroup({
          id: new FormControl(null, Validators.required),
          /* ---------------------------- les champs requis --------------------------- */
          label: new FormControl(null, [Validators.required]),
      });
  }

  ngOnInit(): void {
    let fields: any[] = ['id', 'label'];
    fields.forEach((element) => {
        this.Formmulaire_update_fabriquant.get(element).setValue(
            this.data_selected_fabriquant.hasOwnProperty(element) ? this.data_selected_fabriquant?.[element] : null
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
      return this.Formmulaire_update_fabriquant.controls;
  }

  /* ------------------------ Lors du click sur valider ----------------------- */

  SubmitForm() {
    this.IsFiled = true;

    if (this.Formmulaire_update_fabriquant.valid) {
        this.is_loading = true;
        this.Disabled = true;
        this.CallApiUpdate();
    } else {
        this.error('Formulaire invalide !');
    }
  }

  CallApiUpdate() {
    this.Modifier = this.fabriquantService
    .ModifieFabriquant(this.Formmulaire_update_fabriquant.value)
    .subscribe((r: any) => {
        r = JSON.parse(r);

        switch (r?.['msg']) {
            case 'Modifié':
                this.success('fabriquant modifié');
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
