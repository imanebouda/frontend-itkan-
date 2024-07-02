import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GeneralService } from 'src/app/services/general/general.service';
import { PusherService } from 'src/app/services/general/pusher.service';

@Component({
    selector: 'app-organisme',
    templateUrl: './organisme.component.html',
    styleUrls: ['./organisme.component.scss'],
})
export class OrganismeComponent implements OnInit {
    /* ------------------------------ les variables ----------------------------- */
    menu_items: any[] = [];
    items: any[] = [{ label: null, link: null }];
    Subscription_router: Subscription;

    constructor(
        private generalService: GeneralService,
        private pusherService: PusherService,
        private router: Router
    ) {

        /* --------------------------- Modification du nav -------------------------- */
        this.Subscription_router = this.pusherService.GetterNavs.subscribe(
            (data_recu: any) => {
                if (data_recu) {
                    if (data_recu?.page == '/organisme') {
                        this.items = [
                            {
                                label: 'Organisme',
                                link: '/organisme',
                            },
                        ];
                        this.InitSelected(0);
                    }
                }
            }
        );
    }

    ngOnInit(): void {
        /* --------------------------- Chargement du menu --------------------------- */
        this.MenuAdmin();
        /* ---------------------- On pointe sur le curent menu ---------------------- */
        setTimeout(() => {
            this.getCurrentmenu();
        }, 100);
    }

    onItemClick(event: any) {
        if (event?.item) {
            if (event?.item?.link && event?.item?.link == '/accueil') {
                this.generalService.is_loading = true;
                this.router.navigate([event?.item?.link]).then(() => {
                    this.generalService.currentMenu = event?.item?.link;
                    setTimeout(() => {
                        this.generalService.is_loading = false;
                    }, 250);
                });
            }
        }
    }

    /* -------------------------------------------------------------------------- */
    /*             Cette fonction permet de selectionner le menu actif            */
    /* -------------------------------------------------------------------------- */

    InitSelected(curent: any) {
        let menu: any = document.getElementById('menu_bar');
        setTimeout(() => {
            let list: any =
                menu.children[0]?.children[1]?.children[0]?.children;
            /* -------------------------------- Le reset -------------------------------- */
            new Promise((resolve) => {
                let elements: any[] = [0,1]; // la partie à changer suivant le nombre d'élements du menu
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i] === curent) {
                        elements.splice(i, 1);
                    }
                }
                resolve(elements);
            }).then((data: any[] | any) => {
                setTimeout(() => {
                    data.forEach((key: any) => {
                        let element: any = list.item(key);
                        element.children[0].classList.remove(
                            'p-menuitem-link',
                            'p-button'
                        );
                        element.children[0].classList.add('p-2');
                    });
                }, 10);
                setTimeout(() => {
                    /* -------------------------------- Selection ------------------------------- */
                    let element: any = list.item(curent);
                    element.children[0].classList.remove(
                        'p-menuitem-link',
                        'p-button-info'
                    );
                    element.children[0].classList.add(
                        'p-2',
                        'p-button',
                        'p-button-info'
                    );
                }, 10);
            });
        }, 10);
    }

    getCurrentmenu() {
        switch (this.router.url) {
            case '/organisme':
            case '/organisme/organismeinfo':
                this.items = [
                    { label: 'Organisme info', link: this.router.url, },
                ];
                this.InitSelected(0);
                break;
        }
    }

    /* ------------- Si la personne connéctée est un administrateur ------------- */
    MenuAdmin() {
        this.menu_items = [
            {
                label: 'Organisme info',
                icon: 'pi pi-fw pi-box',
                route: '/organisme/organismeinfo',
                command: (e: any) => {
                    this.router.navigate([e?.item?.route]);
                    this.items = [
                        {
                            label: 'Organisme info',
                            link: this.router.url,
                        },
                    ];
                    this.InitSelected(0);
                },
            },
        ];
    }

    ngOnDestroy(): void {
        let unsubscribe_liste: any[] = [this.Subscription_router];
        unsubscribe_liste.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
    }
}
