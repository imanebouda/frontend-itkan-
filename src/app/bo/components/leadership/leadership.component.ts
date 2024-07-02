import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { PusherService } from 'src/app/services/general/pusher.service';
import { GeneralService } from 'src/app/services/services';

@Component({
  selector: 'app-leadership',
  templateUrl: './leadership.component.html',
  styleUrls: ['./leadership.component.scss']
})
export class LeadershipComponent implements OnInit, OnDestroy {
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
                if (data_recu?.page == '/Leadership') {
                    this.items = [
                        { label: 'Gestion des utilisateurs', link: 'Leadership/Contexte' },
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
            let elements: any[] = [0, 1, 2];
            elements = elements.filter(el => el !== current);

            elements.forEach((key: any) => {
                let element: any = list.item(key);
                element.children[0].classList.remove('p-menuitem-link', 'p-button');
                element.children[0].classList.add('p-2');
            });

            let element: any = list.item(current);
            element.children[0].classList.remove('p-menuitem-link', 'p-button-info');
            element.children[0].classList.add('p-2', 'p-button', 'p-button-info');
        }, 10);
    }

    getCurrentmenu() {
        const currentRoute = this.router.url;
        switch (currentRoute) {
            case '/Leadership':
            case '/Leadership/Contexte':
                this.items = [
                    { label: 'Gestion des Contextes', link: this.router.url },
                ];
                this.InitSelected(0);
                break;
            case '/Leadership/Politique-Qualite':
                this.items = [
                    { label: 'Gestion Politique Qualite', link: this.router.url },
                ];
                this.InitSelected(1);
                break;
            case '/Leadership/Manuel-Qualite':
                this.items = [
                    { label: 'Gestion Manuel Qualite', link: this.router.url },
                ];
                this.InitSelected(2);
                break;
        }
    }

    activateMenuByRoute() {
        this.getCurrentmenu();
    }

    MenuAdmin() {
        this.menu_items = [
            { label: 'Contexte', icon: 'pi pi-fw pi-box', route: '/Leadership/Contexte', command: this.handleMenuCommand(0) },
            { label: 'Politique Qualité', icon: 'pi pi-fw pi-box', route: '/Leadership/Politique-Qualite', command: this.handleMenuCommand(1) },
            { label: 'Manuel Qualité', icon: 'pi pi-fw pi-box', route: '/Leadership/Manuel-Qualite', command: this.handleMenuCommand(2) },
        ];
    }

    handleMenuCommand(index: number) {
        return (e: any) => {
            this.router.navigate([e?.item?.route]);
            this.items = [{ label: this.menu_items[index].label, link: this.router.url }];
            this.InitSelected(index);
        };
    }

    ngOnDestroy(): void {
        if (this.Subscription_router) {
            this.Subscription_router.unsubscribe();
        }
    }
}
