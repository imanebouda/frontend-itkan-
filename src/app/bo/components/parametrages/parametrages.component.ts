import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-parametrages',
    templateUrl: './parametrages.component.html',
})
export class ParametragesComponent implements OnInit, OnDestroy {
    menu_items: any[] = [];
    items: any[] = [{ label: null, link: null }];
    Subscription_router: Subscription;

    constructor(
        private router: Router,
        public generalService: GeneralService,
        private pusherService: PusherService
    ) {
        this.Subscription_router = this.pusherService.GetterNavs.subscribe(
            (data_recu: any) => {
                if (data_recu && data_recu.page == '/parametrages') {
                    this.items = [
                        {
                            label: 'Gestion des parametrages',
                            link: '/parametrages',
                        },
                    ];
                    this.InitSelected(0);
                }
            }
        );
    }

    ngOnInit(): void {
        this.MenuAdmin();
        setTimeout(() => {
            this.getCurrentmenu();
        }, 100);

        this.router.events
            .pipe(filter((event: Event) => event instanceof NavigationEnd))
            .subscribe(() => {
                this.activateMenuByRoute();
            });
    }

    onItemClick(event: any) {
        if (event?.item && event?.item?.link && event?.item?.link == '/accueil') {
            this.generalService.is_loading = true;
            this.router.navigate([event?.item?.link]).then(() => {
                this.generalService.currentMenu = event?.item?.link;
                setTimeout(() => {
                    this.generalService.is_loading = false;
                }, 250);
            });
        }
    }

    InitSelected(current: any) {
        let menu: any = document.getElementById('menu_bar');
        setTimeout(() => {
            let list: any = menu.children[0]?.children[1]?.children[0]?.children;

            new Promise((resolve) => {
                let elements: any[] = [0, 1, 2, 3, 4, 5, 6, 7];
                for (var i = 0; i < elements.length; i++) {
                    if (elements[i] === current) {
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
                    let element: any = list.item(current);
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
            case '/parametrages':
            case '/parametrages/liste':
                this.items = [
                    { label: 'Parametrages', link: this.router.url },
                ];
                this.InitSelected(0);
                break;
            case '/parametrages/catégories':
                this.items = [
                    { label: 'Gestion des catégories', link: this.router.url },
                ];
                this.InitSelected(1);
                break;
            case '/parametrages/smq':
                this.items = [
                    { label: 'Gestion des SMQ', link: this.router.url },
                ];
                this.InitSelected(2);
                break;
            case '/parametrages/sites':
                this.items = [
                    { label: 'Gestion des Sites', link: this.router.url },
                ];
                this.InitSelected(3);
                break;
        }
    }

    MenuAdmin() {
        this.menu_items = [
            {
                label: 'Paramètres',
                icon: 'pi pi-fw pi-box',
                route: '/parametrages/liste',
                command: (e: any) => {
                    this.router.navigate([e?.item?.route]);
                    this.items = [
                        {
                            label: 'Paramètres',
                            link: this.router.url,
                        },
                    ];
                    this.InitSelected(0);
                },
            },
            {
                label: 'Catégories',
                icon: 'pi pi-fw pi-box',
                route: '/parametrages/catégories',
                command: (e: any) => {
                    this.router.navigate([e?.item?.route]);
                    this.items = [
                        {
                            label: 'Catégories',
                            link: this.router.url,
                        },
                    ];
                    this.InitSelected(1);
                },
            },
            {
                label: 'SMQ',
                icon: 'pi pi-fw pi-box',
                route: '/parametrages/smq',
                command: (e: any) => {
                    this.router.navigate([e?.item?.route]);
                    this.items = [
                        {
                            label: 'SMQ',
                            link: this.router.url,
                        },
                    ];
                    this.InitSelected(2);
                },
            },
            {
                label: 'Sites',
                icon: 'pi pi-fw pi-box',
                route: '/parametrages/sites',
                command: (e: any) => {
                    this.router.navigate([
                        e?.item?.route]);
                    this.items = [
                        {
                            label: 'Sites',
                            link: this.router.url,
                        },
                    ];
                    this.InitSelected(3);
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

    activateMenuByRoute() {
        const currentRoute = this.router.url;
        switch (currentRoute) {
            case '/parametrages':
            case '/parametrages/liste':
                this.items = [
                    { label: 'Parametrages', link: currentRoute },
                ];
                this.InitSelected(0);
                break;
            case '/parametrages/catégories':
                this.items = [
                    { label: 'Gestion des catégories', link: currentRoute },
                ];
                this.InitSelected(1);
                break;
            case '/parametrages/smq':
                this.items = [
                    { label: 'Gestion des SMQ', link: currentRoute },
                ];
                this.InitSelected(2);
                break;
            case '/parametrages/sites':
                this.items = [
                    { label: 'Gestion des Sites', link: currentRoute },
                ];
                this.InitSelected(3);
                break;
            default:
                // Gérez les autres cas si nécessaire
                break;
        }
    }
}

