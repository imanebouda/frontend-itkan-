import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { OrganismesService } from 'src/app/services/utilisateurs/organismes.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { typeOrganismeService } from 'src/app/services/typeOrganisme/typeOrganisme.service';
import { GeneralService } from 'src/app/services/general/general.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-organisme-info',
    templateUrl: './organisme-info.component.html',
    providers: [DatePipe]
})
export class OrganismeInfoComponent implements OnInit {
    Ajouter: Subscription;
    Afficher: Subscription;
    is_loading: boolean = true;
    IsFiled: boolean = false;
    Ifmessage: boolean = false;
    Error: number = 0;
    ApiMessage: any;
    Disabled: boolean = false;
    submitted: boolean = false;
    listTypeOrg: any = [];
    imagePath: File = null;
    imageUrl: any = 'assets/layout/images/user-cicrle.svg';
    FormOrganisme: FormGroup;
    ShowDataOrg: Subscription;

    constructor(
        private organismesService: OrganismesService,
        private typeOrganismeService: typeOrganismeService,
        private messageService: MessageService,
        private generalService: GeneralService,
        private sanitizer: DomSanitizer,
        private datePipe : DatePipe
    ) {
        this.FormOrganisme = new FormGroup({
            id: new FormControl(0),
            code: new FormControl(null, Validators.required),
            brand: new FormControl(null, Validators.required),
            social_reason: new FormControl(null, Validators.required),
            approval: new FormControl(null, Validators.required),
            address: new FormControl(null, Validators.required),
            zip_code: new FormControl(null, Validators.required),
            city: new FormControl(null, Validators.required),
            phone: new FormControl(null, Validators.required),
            gsm: new FormControl(null, Validators.required),
            email: new FormControl(null, Validators.required),
            logo: new FormControl(null),
            open_date: new FormControl(null),
            id_type_organisme: new FormControl(null, Validators.required),
        });
    }

    ngOnInit(): void {
        this.is_loading = false;
        this.LoadCurrentOrgaisme();
        this.GetAllTypeOrganisme();
    }

    GetAllTypeOrganisme() {
        let body: any = {
            colone: 'asc',
            order: 'type',
        };

        this.ShowDataOrg = this.typeOrganismeService
            .GetTypeOrganisme(body)
            .subscribe((r: any) => {
                r = JSON.parse(r);
                if (r.hasOwnProperty('codeReponse') && r?.codeReponse == 200) {
                    this.listTypeOrg = r.hasOwnProperty('data') ? r?.['data'] : [];
                } else {
                    this.generalService.errorSwal(r?.msg);
                }
            });
    }


    LoadCurrentOrgaisme() {
        this.is_loading = true;
        this.Afficher = this.organismesService
            .CurrentOrganisme()
            .subscribe((r: any) => {
                r = JSON.parse(r);
                if (r.hasOwnProperty('codeReponse') && r?.codeReponse == '200') {
                    const formData = r.data ? JSON.parse(r.data) : null;
                    
                    // Formater la date open_date
                    if (formData && formData.open_date) {
                        formData.open_date = this.datePipe.transform(
                            new Date(formData.open_date),
                            'yyyy-MM-dd'
                        );
                    }
    
                    this.FormOrganisme.patchValue(formData);
                    this.is_loading = false;
    
                    // Load img
                    this.GetCurrentImage();
                } else {
                    this.error(r?.msg);
                    this.is_loading = false;
                }
            });
    }
    

    GetCurrentImage() {
        this.organismesService.GetImage().subscribe({
            next: (event) => {
                if (event.type === HttpEventType.Response) {
                    const downloadedFile = new Blob([event.body], {
                        type: event.body.type,
                    });
                    let objectURl = URL.createObjectURL(downloadedFile);
                    this.imageUrl =
                        this.sanitizer.bypassSecurityTrustUrl(objectURl);
                } // this.downloadFile(event);
                else {
                    this.imageUrl = 'assets/layout/images/user-cicrle.svg';
                }
            },
        });
    }

    SubmitForm() {
        this.IsFiled = true;
        if (this.FormOrganisme.valid) {
            this.is_loading = true;
            this.Disabled = true;
            this.CallApiAjouter();
        } else {
            this.error('Formulaire invalide !');
        }
    }

    CallApiAjouter() {
        this.Ajouter = this.organismesService
            .SaveOrganimse(this.FormOrganisme.value)
            .subscribe((r: any) => {
                r = JSON.parse(r);
                switch (r?.['msg']) {
                    case 'ajouter':
                        this.success('Organimse Ajouté');
                        break;
                    case 'modifier':
                        this.success('Organimse Modifié');
                        this.LoadCurrentOrgaisme();
                        break;
                    default:
                        this.error(r?.msg);
                        break;
                }
            });
    }

    handleFileInput(file: File) {
        this.imagePath = file;
        let reader = new FileReader(); // HTML5 FileReader API
        reader.readAsDataURL(file);
        // When file uploads set it to file formcontrol
        reader.onload = () => {
            this.imageUrl = reader.result;
        };

        this.SaveImage();
    }

    onRemoveImage(e: any) {
        this.imagePath = null;
        this.imageUrl = 'assets/layout/images/user-cicrle.svg';
        if (this.FormOrganisme.value.id) {
            this.organismesService.GetImage().subscribe({
                next: (event) => {
                    if (event.type === HttpEventType.Response) {
                        const downloadedFile = new Blob([event.body], {
                            type: event.body.type,
                        });
                        let objectURl = URL.createObjectURL(downloadedFile);
                        this.imageUrl =
                            this.sanitizer.bypassSecurityTrustUrl(objectURl);
                    } // this.downloadFile(event);
                },
            });
        }
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

    success(message: any) {
        this.Error = 0;
        this.ApiMessage = message;
        this.Ifmessage = true;
        setTimeout(() => {
            this.Ifmessage = false;
            this.Error = 0;
            this.ApiMessage = '';
            this.Disabled = false;
            this.is_loading = false;
        }, 3000);
    }

    get FormErrors() {
        return this.FormOrganisme.controls;
    }

    SaveImage() {
        this.organismesService.saveImage(this.imagePath).then((filePath) => {
            this.imageUrl = filePath;
            this.messageService.add({
                severity: 'success',
                summary: 'Succès',
                detail: 'Opération effectuée avec succès',
                life: 3000,
            });

            //Reload
            window.location.reload();
        });
    }
}
