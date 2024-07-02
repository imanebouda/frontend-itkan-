import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { VehiculesService } from 'src/app/services/vehicules/vehicules.service';
import { DeclarationService } from 'src/app/services/declaration/declaration.service';
import { MarquesService } from 'src/app/services/marque/marque.service';
import { TypeMarquesService } from 'src/app/services/typeMarque/TypeMarque.service';

@Component({
  selector: 'app-add-declaration',
  templateUrl: './add-declaration.component.html',
  styleUrls: ['./add-declaration.component.scss']
})
export class AddDeclarationComponent implements OnInit {
  // Les variables globales
  Afficher_params: Subscription;
  Ajouter: Subscription;
  ShowDataMarque: Subscription;
  ShowDataTypeMarque: Subscription;
  SearchVehicule: Subscription;
  Restaurer: Subscription;
  @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
  is_loading: boolean = false;
  has_access_yes: any = [];
  selectedItem: any;
  listMarque: any = [];
  listTypeMarque: any = [];
  listMarqueDefault: any = [];
  listTypeMarqueDefault: any = [];

  // Les variables du formulaire
  clientForm: FormGroup;
  IsFiledVehiculeForm: boolean = false;
  IsFiledClientForm: boolean = false;
  Ifmessage: boolean = false;
  Error: number = 0;
  ApiMessage: any;
  Disabled: boolean = false;

  constructor(
    private marquesService: MarquesService,
    private typeMarquesService: TypeMarquesService,
    private generalService: GeneralService,
    private declarationService: DeclarationService,
  ) {

    this.clientForm = new FormGroup({
      immatriculeSous: new FormControl(null, [Validators.required]),
      marque: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      nomClient: new FormControl(null, [Validators.required]),
      titulaireCIN: new FormControl(null, [Validators.required]),
      numeroSerie: new FormControl(null, [Validators.required]),
      proprieteDe: new FormControl(null, [Validators.required]),
      detailsDeclaration: new FormControl(null),
    });
  }

  ngOnInit(): void {
    this.GetAllMarque();
    this.GetTypeMarque(null);
  }

  // Gestion des erreurs
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

  get DeclarationFormErrors() {
    return this.clientForm.controls;
  }

  // Lors du click sur valider
  SubmitForm() {
    this.IsFiledVehiculeForm = true;

    if (this.clientForm.valid) {
      this.is_loading = true;
      this.Disabled = true;
      this.CallAddApi();
    } else {
      this.IsFiledClientForm = true;
      this.error('Formulaire invalide !');
    }
  }

  CallAddApi() {
    this.Ajouter = this.declarationService.AddAnDeclaration(
      this.clientForm.value
    ).subscribe((r: any) => {
      r = JSON.parse(r);
      switch (r?.['codeReponse']) {
        case 200:
          this.success('Déclaration ajoutée');
          break;
        default:
          this.error(r?.msg);
          break;
      }
    });
  }

  // Fermer le popup
  ClosePopUp(state: boolean) {
    this.FermerPopUp.emit(state);
  }

  // Lors de la destruction du composant pour ne pas avoir les memory leaks
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

  GetAllMarque() {
    this.is_loading = true
    let body: any = {
      colone: 'asc',
      order: 'type',
    };

    this.ShowDataMarque = this.marquesService
      .GetMarques(body)
      .subscribe((r: any) => {
        r = JSON.parse(r);
        if (r.hasOwnProperty('codeReponse') && r?.codeReponse == 200) {
          this.listMarqueDefault = r.hasOwnProperty('data') ? r?.['data'] : [];
        } else {
          this.generalService.errorSwal(r?.msg);
        }
        this.is_loading = false
      });
  }


  GetTypeMarque(id: number) {
    this.is_loading = true;
    let body: any = {
      id_marque: id
    };

    this.ShowDataTypeMarque = this.typeMarquesService
      .GetTypeMarqueByIdMarque(body)
      .subscribe((r: any) => {
        r = JSON.parse(r);
        if (r.hasOwnProperty('codeReponse') && r?.codeReponse == 200) {
          this.listTypeMarqueDefault = r.hasOwnProperty('data') ? r?.data : [];
        } else {
          this.generalService.errorSwal(r?.msg);
        }
        this.is_loading = false
      });
  }

  searchMarque(event: any) {
    this.listMarque = this.listMarqueDefault.filter((marque: any) =>
      marque?.label?.toLowerCase().includes(event?.query?.toLowerCase())
    );

    this.listMarque = this.listMarque.map((marque: any) =>
      marque?.label
    );
  }

  searchTypeMarque(event: any) {
    this.listTypeMarque = this.listTypeMarqueDefault.filter((type: any) =>
      type?.label?.toLowerCase().includes(event?.query?.toLowerCase())
    );

    this.listTypeMarque = this.listTypeMarque.map((marqueType: any) =>
      marqueType?.label
    );
  }
}
