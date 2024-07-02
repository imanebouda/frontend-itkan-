import { Component, OnInit } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/services';
import { Location } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {

    if_show_ajouter: boolean;
    Subscription_router: any;
    items: { label: string; link: string; }[];
    menu_items: { label: string; icon: string; route: string; command: (e: any) => void; }[];
  
    constructor(
      private primengConfig: PrimeNGConfig,
      private router: Router,
      private route: ActivatedRoute,
      public generalService: GeneralService,
      private location: Location
  ) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
        this.route.params.subscribe(params => {
            const processusId = params['id'];
            console.log('processusId',processusId);
            this.getCurrentmenu(processusId); // Appelez la fonction avec l'ID du processus
            this.DetailOngles(processusId);
          });
    }

    
  /* -------------------------------------------------------------------------- */
  /*                            Ajout ou modification                           */
  /* -------------------------------------------------------------------------- */
  

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
            let elements: any[] = [0, 1, 2,3]; /// la partie à changer suivant le nombre d'élements du menu
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

getCurrentmenu(processusId : number) {
 //const processusId = this.generalService.getProcessusID('detail'); 
    switch (this.router.url) {
        case '/processus':
        case  `/processus/detail/${processusId}`:
            this.items = [
                {
                    label: 'Fiche ', link: this.router.url,
                },
            ];
            this.InitSelected(0);
            break;
         case `/procesObjectifs/list/${processusId}`:
             this.items = [
                 { label: 'Objectifs ', link: this.router.url },
             ];
             this.InitSelected(1);
             break;
         case `/Indicateurs/list/${processusId}`:
               this.items = [
                   { label: 'Indicateurs', link: this.router.url },
               ];
               this.InitSelected(2);
               break;
         case `/procedure/list/${processusId}`:
                 this.items = [
                     { label: 'Procédures', link: this.router.url },
                 ];
                 this.InitSelected(3);
                 break;
    }
}

DetailOngles(processusId : number) {
// const processusId = this.generalService.getProcessusID('detail'); 
  this.menu_items = [
      {
          label: 'Fiche ',
          icon: 'pi pi-fw pi-box',
          route: `/processus/detail/${processusId}`,
          command: (e: any) => {
              this.router.navigate([e?.item?.route]);
              this.items = [
                  {
                    label: 'Fiche ', link: this.router.url,
                  },
              ];
              this.InitSelected(0);
          },
      },
      {
        label: 'Objectifs ',
          icon: 'pi pi-fw pi-box',
          route: `procesObjectifs/list/${processusId}`,
          command: (e: any) => {
              this.router.navigate([e?.item?.route]);
              this.items = [
                { label: 'Objectifs ', link: this.router.url },
              ];
              this.InitSelected(1);
          },
      },
      {
       label: 'Indicateurs ',
         icon: 'pi pi-fw pi-box',
         route: `Indicateurs/list/${processusId}`,
         command: (e: any) => {
             this.router.navigate([e?.item?.route]);
             this.items = [
               { label: 'Indicateurs ', link: this.router.url },
             ];
             this.InitSelected(2);
         },
     },
     {
       label: 'Procédures ',
         icon: 'pi pi-fw pi-box',
         route: `procedure/list/${processusId}`,
         command: (e: any) => {
             this.router.navigate([e?.item?.route]);
             this.items = [
               { label: 'Procédures ', link: this.router.url },
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

retourPagePrecedente(): void {
    this.location.back();
  }

}
