import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GeneralService } from 'src/app/services/general/general.service';
import { PusherService } from 'src/app/services/general/pusher.service';

@Component({
    selector: 'app-declaration',
    templateUrl: './declaration.component.html',
})
export class DeclarationComponent implements OnInit {
    /* ------------------------------ les variables ----------------------------- */
    menu_items: any[] = [];
    items: any[] = [{ label: null, link: null }];
    Subscription_router: Subscription;

    constructor(
        private router: Router,
        public generalService: GeneralService,
        private pusherService: PusherService
    ) {
        /* --------------------------- Modification du nav -------------------------- */
        this.Subscription_router = this.pusherService.GetterNavs.subscribe(
            (data_recu: any) => {
                if (data_recu) {
                    if (data_recu?.page == '/Ddp') {
                        this.items = [
                            {
                                label: 'gestions des déclarations',
                                link: '/Ddp/list',
                            },
                        ];
                        // this.InitSelected(0);
                    }
                }
            }
        );
    }

    ngOnInit(): void {
        /* ---------------------- On pointe sur le curent menu ---------------------- */
        // setTimeout(() => {
        //     this.getCurrentmenu();
        // }, 100);
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

    // InitSelected(curent: any) {
    //     let menu: any = document.getElementById('menu_bar');
    //     setTimeout(() => {
    //         let list: any =
    //             menu.children[0]?.children[1]?.children[0]?.children;
    //         /* -------------------------------- Le reset -------------------------------- */
    //         new Promise((resolve) => {
    //             let elements: any[] = [0, 1, 2]; // la partie à changer suivant le nombre d'élements du menu
    //             for (var i = 0; i < elements.length; i++) {
    //                 if (elements[i] === curent) {
    //                     elements.splice(i, 1);
    //                 }
    //             }
    //             resolve(elements);
    //         }).then((data: any[] | any) => {
    //             setTimeout(() => {
    //                 data.forEach((key: any) => {
    //                     let element: any = list.item(key);
    //                     element.children[0].classList.remove(
    //                         'p-menuitem-link',
    //                         'p-button'
    //                     );
    //                     element.children[0].classList.add('p-2');
    //                 });
    //             }, 10);
    //             setTimeout(() => {
    //                 /* -------------------------------- Selection ------------------------------- */
    //                 let element: any = list.item(curent);
    //                 element.children[0].classList.remove(
    //                     'p-menuitem-link',
    //                     'p-button-info'
    //                 );
    //                 element.children[0].classList.add(
    //                     'p-2',
    //                     'p-button',
    //                     'p-button-info'
    //                 );
    //             }, 10);
    //         });
    //     }, 10);
    // }

    // getCurrentmenu() {
    //     switch (this.router.url) {
    //         case '/ods':
    //         case '/ods/list':
    //             this.items = [
    //                 {
    //                     label: 'Gestion des ordres de service',
    //                     link: this.router.url,
    //                 },
    //             ];
    //             this.InitSelected(0);
    //             break;
    //         // case '/parametrages/roles':
    //         //     this.items = [
    //         //         { label: 'Gestion des rôles', link: this.router.url },
    //         //     ];
    //         //     this.InitSelected(1);
    //         //     break;
    //         // case '/parametrages/permissions':
    //         //     this.items = [
    //         //         { label: 'Gestion des permissions', link: this.router.url },
    //         //     ];
    //         //     this.InitSelected(1);
    //         //     break;
    //     }
    // }

    ngOnDestroy(): void {
        let unsubscribe_liste: any[] = [this.Subscription_router];
        unsubscribe_liste.forEach((element: any) => {
            if (element) {
                element.unsubscribe();
            }
        });
    }
}
