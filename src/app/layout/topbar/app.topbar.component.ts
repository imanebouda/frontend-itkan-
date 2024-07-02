import { AfterViewInit, Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from '../service/app.layout.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/services';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html',
})
export class AppTopBarComponent {
    items!: MenuItem[];
    @ViewChild('menubutton') menuButton!: ElementRef;
    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;
    @ViewChild('topbarmenu') menu!: ElementRef;

    /* ----------------------------- Popup passoword ---------------------------- */
    if_show_update_password: boolean = false;
    if_show_receb: boolean = false;
    data_selected_user: any;
    Header_info: any;
    AddRECEBForm: FormGroup;
    constructor(
        public layoutService: LayoutService,
        public generalService: GeneralService,
        private router: Router,
    ) {
        this.AddRECEBForm = new FormGroup({
            carnet_status: new FormControl(null, [Validators.required])
        })
    }

    itemsprofiles = [
        {
            label: this.generalService.get_DataSession('nom_complet_utilisateur'),
            icon: 'pi pi-user',
            items: [
                {
                    label: 'Change Password',
                    icon: 'pi pi-key',
                    command: () => {
                        this.ShowUpdatePassword()
                    }
                },
                {
                    label: 'Se déconnecter',
                    icon: 'pi pi-sign-out',
                    command: () => {
                        this.logout()
                    }
                }
            ]
        },
    ]

    logout() {

        //On affiche la popup de confirmation
        Swal.fire({
            title: 'Êtes-vous sûrs de vouloir déconnecté ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#5664d2',
            cancelButtonColor: '#FD991D',
            cancelButtonText: '<i class="pi pi-times-circle"></i> ' + 'Annuler',
            confirmButtonText: ' <i class="pi pi-check-circle"></i> ' + 'Valider',
            reverseButtons: true
        }).then((result) => {
            //Si l'utilisateur confirme
            if (result.isConfirmed) {
                localStorage.clear();
                this.router.navigate(['/auth']);
            }
        })
    }

    /* -------------------------------------------------------------------------- */
    /*                Modification d'un mot de passe d'utilisateur                */
    /* -------------------------------------------------------------------------- */

    ShowUpdatePassword() {
        this.data_selected_user = {
            same_user_as_connected: "",
            id_user: this.generalService.get_DataSession('user_id'),
            nom_complet_utilisateur: this.generalService.get_DataSession('nom_complet_utilisateur'),
        };
        this.Header_info = `Modification du mot de passe de l'utilisateur(e) : (${this.data_selected_user?.nom_complet_utilisateur})`;
        setTimeout(() => {
            this.if_show_update_password = true;
        }, 100);
    }

    ShowReceb() {
        this.if_show_receb = true;
    }

    ClosePassword(event: boolean) {
        if (event) {
            this.if_show_update_password = false;
        } else {
            this.if_show_update_password = false;
        }
    }

    SubmitForm() {
        this.if_show_receb = false;
        if (this.AddRECEBForm.value.carnet_status == "carnet_conforme")
            this.router.navigate(['/ods/list', this.AddRECEBForm.value.carnet_status]);
        else
            this.router.navigate(['/verificationpremier/add', this.AddRECEBForm.value.carnet_status]);
    }
}
