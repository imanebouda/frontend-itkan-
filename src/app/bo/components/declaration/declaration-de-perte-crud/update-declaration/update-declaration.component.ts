import { Component, OnInit, Output, EventEmitter, Input, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { DeclarationService } from 'src/app/services/declaration/declaration.service';  // Assurez-vous d'importer votre service de déclaration
import { ParametrageService } from 'src/app/services/services';
import { TypeMarquesService } from 'src/app/services/typeMarque/TypeMarque.service';
import { MarquesService } from 'src/app/services/marque/marque.service';
// Assurez-vous d'importer votre service de paramétrage

@Component({
    selector: 'app-update-declaration',
    templateUrl: './update-declaration.component.html',
    styleUrls: ['./update-declaration.component.scss']
})
export class UpdateDeclarationComponent implements OnInit, OnDestroy, OnChanges {
    @Output('FermerPopUp') FermerPopUp = new EventEmitter<boolean>();
    @Input('data_selected_ddp') data_selected_ddp: any;
    is_loading: boolean = true;
    UpdateDPPForm: FormGroup;
    IsFiledDDP: boolean = false;
    Ifmessage: boolean = false;
    Error: number = 0;
    ApiMessage: any;
    Disabled: boolean = false;
    transmissionTarifVisibility: any = null;
    modifierSubscription: Subscription;
    afficherParamsSubscription: Subscription;
    ShowDataMarque: Subscription;
    ShowDataTypeMarque: Subscription;
    listMarque: any = [];
    listTypeMarque: any = [];
    listMarqueDefault: any = [];
    listTypeMarqueDefault: any = [];

    constructor(
        private marquesService: MarquesService,
        private typeMarquesService: TypeMarquesService,
        private generalService: GeneralService,
        private DDPService: DeclarationService,
        private parametreService: ParametrageService
    ) {
        this.UpdateDPPForm = new FormGroup({
            id: new FormControl(null, Validators.required),
            immatriculeSous: new FormControl(null, [Validators.required]),
            marque: new FormControl(null, [Validators.required]),
            type: new FormControl(null, [Validators.required]),
            nomClient: new FormControl(null, [Validators.required]),
            titulaireCIN: new FormControl(null, [Validators.required]),
            numeroSerie: new FormControl(null, [Validators.required]),
            proprieteDe: new FormControl(null, [Validators.required]),
            detailsDeclaration: new FormControl(null)
        });
    }

    ngOnInit(): void {
        this.UpdateDPPForm.get('id')?.setValue(this.data_selected_ddp.ID);
        this.UpdateDPPForm.get('marque')?.setValue(this.data_selected_ddp.Marque);
        this.UpdateDPPForm.get('type')?.setValue(this.data_selected_ddp.Type);
        this.UpdateDPPForm.get('immatriculeSous')?.setValue(this.data_selected_ddp.ImmatriculeSous);
        this.UpdateDPPForm.get('nomClient')?.setValue(this.data_selected_ddp.NomClient);
        this.UpdateDPPForm.get('titulaireCIN')?.setValue(this.data_selected_ddp.TitulaireCIN);
        this.UpdateDPPForm.get('numeroSerie')?.setValue(this.data_selected_ddp.NumeroSerie);
        this.UpdateDPPForm.get('proprieteDe')?.setValue(this.data_selected_ddp.ProprieteDe);
        this.GetAllMarque();
        this.GetTypeMarque(null);
    }


    ngOnChanges(changes: SimpleChanges): void {
        if (changes.data_selected_ddp && changes.data_selected_ddp.currentValue) {
            // Mettez à jour le formulaire avec la nouvelle valeur de l'ID


        }
    }

    SubmitForm() {
        this.IsFiledDDP = true;
        if (this.UpdateDPPForm.valid) {
            this.is_loading = true;
            this.Disabled = true;
            this.callApiUpdate();
        } else {
            this.IsFiledDDP = true;
            this.handleError('Formulaire invalide !');
        }
    }

    callApiUpdate() {
        // Récupérez l'ID de la déclaration que vous souhaitez mettre à jour (s'il est nécessaire)
        const declarationId = this.data_selected_ddp?.id;

        // Vérifiez si vous avez un ID valide avant d'appeler la mise à jour
        if (declarationId !== undefined && declarationId !== null && declarationId > 0) {
            // Appelez la mise à jour de la déclaration en utilisant la méthode 'put'
            this.modifierSubscription = this.DDPService.UpdateAnDeclaration(this.UpdateDPPForm.value).subscribe((response: any) => {
                // Traitez ici la réponse de votre service de mise à jour de déclaration
                this.handleResponse(response);
            }, error => {
                this.handleError(error);
            });
        } else {
            this.handleError('ID de déclaration invalide.');
        }
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

    handleResponse(response: any) {
        // Traitez ici la réponse réussie de votre service
        this.is_loading = false;
        this.Disabled = false;
        this.success('DDP modifié');
    }


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

    get ODSFormErrors() {
        return this.UpdateDPPForm.controls;
    }

    handleError(error: any) {
        // Traitez ici les erreurs, affichez des messages à l'utilisateur, etc.
        this.is_loading = false;
        this.Disabled = false;
        this.Error = 1;
        this.ApiMessage = error;
        this.Ifmessage = true;
        setTimeout(() => {
            this.Ifmessage = false;
        }, 3000);
    }

    ClosePopUp(state: boolean) {
        this.FermerPopUp.emit(state);
    }

    ngOnDestroy(): void {
        if (this.modifierSubscription) {
            this.modifierSubscription.unsubscribe();
        }
        if (this.afficherParamsSubscription) {
            this.afficherParamsSubscription.unsubscribe();
        }
    }
}
