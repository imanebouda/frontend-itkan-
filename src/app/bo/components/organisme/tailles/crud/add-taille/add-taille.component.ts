import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TaillesService } from 'src/app/services/tailles/taille.service';

@Component({
  selector: 'app-add-taille',
  templateUrl: './add-taille.component.html'
})
export class AddTailleComponent {
  /* ------------------------------ Les variables globales ----------------------------- */
  Afficher_params: Subscription;
  Ajouter: Subscription;
  Restaurer: Subscription;
  @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
  is_loading: boolean = true;
  /* ----------------------- les variables du formulaire ---------------------- */
  Formmulaire_ajout_taille: FormGroup;
  IsFiled: boolean = false;
  Ifmessage: boolean = false;
  Error: number = 0;
  ApiMessage: any;
  Disabled: boolean = false;
  listLignes: any = [];

  constructor( private tailleService: TaillesService,){
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.Formmulaire_ajout_taille = new FormGroup({
          /* ---------------------------- les champs requis --------------------------- */
          label: new FormControl(null, [Validators.required]),
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
    return this.Formmulaire_ajout_taille.controls;
  }

  /* ------------------------ Lors du click sur valider ----------------------- */

  SubmitForm() {
    this.IsFiled = true;
    if (this.Formmulaire_ajout_taille.valid) {
        this.is_loading = true;
        this.Disabled = true;
        this.CallApiAjouter();
    } else {
        this.error('Formulaire invalide !');
    }
  }

  CallApiAjouter() {
    this.Ajouter = this.tailleService
      .AjouterTaille(this.Formmulaire_ajout_taille.value)
      .subscribe((r: any) => {
          r = JSON.parse(r);
          switch (r?.['msg']) {
            case 'Ajouté':
              this.success('Taille ajouté');
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
