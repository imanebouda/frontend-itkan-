import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../service/app.layout.service';
import { GeneralService } from 'src/app/services/services';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
})
export class AppMenuComponent implements OnInit {
    model: any[] = [];

    constructor(
        public layoutService: LayoutService,
        private generalService: GeneralService
    ) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Accueil',
                items: [
                    {
                        label: 'Accueil',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/'],
                        visible: this.generalService.canActivate(
                            'Accueil-Consulter'
                        ),
                        ispopup: false,
                    },
                    {
                        label: 'Tableau bord',
                        icon: 'pi pi-fw pi-table',
                        routerLink: ['tableau-bord'],
                        visible: this.generalService.canActivate(
                            'Tableau bord-Consulter'
                        ),
                        ispopup: false,
                    },
                ],
                visible: this.generalService.canActivateAll(
                    ['Accueil-Consulter', 'Tableau bord-Consulter']
                ),
            },
            {
                label: 'SMQ',
                visible: this.generalService.canActivateAll(
                    ['Leadership-Consulter','Processus-Consulter','Procedure-Consulter','Bibliothèque-Consulter','Documents Périme-Consulter']
                ),
                items: [
                    {
                        label: 'Leadership',
                        icon: 'pi pi-briefcase',
                        routerLink: ['Leadership/Contexte'],
                        visible: this.generalService.canActivate(
                            'Leadership-Consulter'
                        ),
                        ispopup:false,
                    },
                    {
                        label: 'Processus',
                        icon: 'pi pi-fw pi-inbox',
                        routerLink: ['processus/list'],
                        visible: this.generalService.canActivate(
                            'Processus-Consulter'
                        ),
                        ispopup:false
                    },
                    {
                        label: 'Procédures',
                        icon: 'pi pi-fw pi-list',
                        routerLink: ['procedure/list'],
                        visible: this.generalService.canActivate(
                            'Procédure-Consulter'
                        ),
                        ispopup:false
                    },
                    {
                        label: 'Bibliothèque',
                        icon: 'pi pi-book',
                        routerLink: ['bibliothèque'],
                        visible: this.generalService.canActivate(
                            'Bibliothèque-Consulter'
                        ),
                        ispopup:false
                    },
                    {
                        label: 'Documents Périmés',
                        icon: 'pi pi-ban',
                        routerLink:['Documents-Périme'],
                        visible: this.generalService.canActivate(
                            'Documents Périme-Consulter'
                        ),
                        ispopup:false,
                    },
                ],
            },
            {
                label: 'Paramétrage',
                visible: this.generalService.canActivateAll(
                    ['Utilisateurs-Consulter', 'Paramétrages-Consulter', 'Organisme-Consulter']
                ),
                items: [
                    {
                        label: 'Organisme',
                        icon: 'pi pi-id-card',
                        routerLink: ['organisme'],
                        visible: this.generalService.canActivate(
                            'Organisme-Consulter'
                        ),
                        ispopup:false
                    },
                    {
                        label: 'Utilisateurs',
                        icon: 'pi pi-users',
                        routerLink: ['utilisateurs/liste'],
                        visible: this.generalService.canActivate(
                            'Utilisateurs-Consulter'
                        ),
                        ispopup:false
                    },
                    {
                        label: 'Paramètres',
                        icon: 'pi pi-cog',
                        routerLink: ['parametrages/liste'],
                        visible: this.generalService.canActivate(
                            'Paramétrages-Consulter'
                        ),
                        ispopup:false
                    },

                ],
            },
            {
                label: 'Audit',
                visible: this.generalService.canActivateAll(
                    ['Utilisateurs-Consulter', 'Paramétrages-Consulter', 'Organisme-Consulter']
                ),
                items: [
                    {
                        label: 'Audit ',
                        icon: 'pi pi-id-card',
                        routerLink: ['list'],
                        visible: this.generalService.canActivate(
                            'Organisme-Consulter'
                        ),
                        ispopup:false
                    },

                    {
                        label: 'Questions',
                        icon: 'pi pi-users',
                        routerLink: ['listCheckList'],
                        visible: this.generalService.canActivate(
                            'Utilisateurs-Consulter'
                        ),
                        ispopup:false
                    },
                    {
                        label: 'CheckList',
                        icon: 'pi pi-users',
                        routerLink: ['list_Check_List'],
                        visible: this.generalService.canActivate(
                            'Utilisateurs-Consulter'
                        ),
                        ispopup:false
                    },
                    {
                        label: 'Paramètres',
                        icon: 'pi pi-cog',
                        routerLink: ['parametrages/liste'],
                        visible: this.generalService.canActivate(
                            'Paramétrages-Consulter'
                        ),
                        ispopup:false
                    },


                ],


            },
        ];
    }
}
