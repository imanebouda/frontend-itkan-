import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-utilisateurs',
    templateUrl: './utilisateurs.component.html',
})
export class UtilisateursComponent implements OnInit, OnDestroy {
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
                if (data_recu && data_recu?.page == '/utilisateurs') {
                    this.items = [
                        {
                            label: 'Gestion des utilisateurs',
                            link: '/utilisateurs/liste',
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

    activateMenuByRoute() {
        const currentRoute = this.router.url;
        switch (currentRoute) {
            case '/utilisateurs':
            case '/utilisateurs/liste':
                this.items = [
                    { label: 'Gestion des utilisateurs', link: this.router.url },
                ];
                this.InitSelected(0);
                break;
            case '/utilisateurs/roles':
                this.items = [
                    { label: 'Gestion des rôles', link: this.router.url },
                ];
                this.InitSelected(1);
                break;
            case '/utilisateurs/permissions':
                this.items = [
                    { label: 'Gestion des permissions', link: this.router.url },
                ];
                this.InitSelected(2);
                break;
        }
    }

    InitSelected(current: any) {
        let menu: any = document.getElementById('menu_bar');
        setTimeout(() => {
            let list: any =
                menu.children[0]?.children[1]?.children[0]?.children;

            new Promise((resolve) => {
                let elements: any[] = [0, 1, 2];
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
            case '/utilisateurs':
            case '/utilisateurs/liste':
                this.items = [
                    { label: 'Gestion des utilisateurs', link: this.router.url },
                ];
                this.InitSelected(0);
                break;
            case '/utilisateurs/roles':
                this.items = [
                    { label: 'Gestion des rôles', link: this.router.url },
                ];
                this.InitSelected(1);
                break;
            case '/utilisateurs/permissions':
                this.items = [
                    { label: 'Gestion des permissions', link: this.router.url },
                ];
                this.InitSelected(2);
                break;
        }
    }

    MenuAdmin() {
        this.menu_items = [
            {
                label: 'Liste des utilisateurs',
                icon: 'pi pi-fw pi-box',
                route: '/utilisateurs/liste',
                command: (e: any) => {
                    this.router.navigate([e?.item?.route]);
                    this.items = [
                        {
                            label: 'Gestion des utilisateurs',
                            link: this.router.url,
                        },
                    ];
                    this.InitSelected(0);
                },
            },
            {
                label: 'Liste des rôles',
                icon: 'pi pi-fw pi-box',
                route: '/utilisateurs/roles',
                command: (e: any) => {
                    this.router.navigate([e?.item?.route]);
                    this.items = [
                        { label: 'Gestion des rôles', link: this.router.url },
                    ];
                    this.InitSelected(1);
                },
            },
            {
                label: 'Liste des permissions',
                icon: 'pi pi-fw pi-box',
                route: '/utilisateurs/permissions',
                command: (e: any) => {
                    this.router.navigate([e?.item?.route]);
                    this.items = [
                        {
                            label: 'Gestion des permissions',
                            link: this.router.url,
                        },
                    ];
                    this.InitSelected(2);
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
