import { Component, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaillesService } from 'src/app/services/tailles/taille.service';

@Component({
  selector: 'app-update-taille',
  templateUrl: './update-taille.component.html'
})
export class UpdateTailleComponent {
  /* ------------------------------ Les variables globales ----------------------------- */
  Afficher_params: Subscription;
  Modifier: Subscription;
  Restaurer: Subscription;
  ShowDataLigne: Subscription;
  @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
  @Input('data_selected_taille') data_selected_taille: any; // data de fabriquant
  is_loading: boolean = true;
  /* ----------------------- les variables du formulaire ---------------------- */
  Formmulaire_update_taille: FormGroup;
  IsFiled: boolean = false;
  Ifmessage: boolean = false;
  Error: number = 0;
  ApiMessage: any;
  Disabled: boolean = false;
  listLignes: any = [];

  constructor(
      private tailleService: TaillesService,
  ) {
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.Formmulaire_update_taille = new FormGroup({
          id: new FormControl(null, Validators.required),
          /* ---------------------------- les champs requis --------------------------- */
          label: new FormControl(null, [Validators.required]),
      });
  }

  ngOnInit(): void {
    let fields: any[] = ['id', 'label'];
    fields.forEach((element) => {
        this.Formmulaire_update_taille.get(element).setValue(
            this.data_selected_taille.hasOwnProperty(element) ? this.data_selected_taille?.[element] : null
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
      return this.Formmulaire_update_taille.controls;
  }

  /* ------------------------ Lors du click sur valider ----------------------- */

  SubmitForm() {
    this.IsFiled = true;

    if (this.Formmulaire_update_taille.valid) {
        this.is_loading = true;
        this.Disabled = true;
        this.CallApiUpdate();
    } else {
        this.error('Formulaire invalide !');
    }
  }

  CallApiUpdate() {
    this.Modifier = this.tailleService
    .ModifierTaille(this.Formmulaire_update_taille.value)
    .subscribe((r: any) => {
        r = JSON.parse(r);

        switch (r?.['msg']) {
            case 'Modifié':
                this.success('Taille modifié');
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
