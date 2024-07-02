import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { DataService } from 'src/app/services/dataShared/data.service';
import { MenuVisibilityService } from 'src/app/services/dataShared/menu-visibility.service';
import { PusherService } from 'src/app/services/general/pusher.service';
import { GeneralService } from 'src/app/services/services';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit, OnDestroy {
  activeItem: MenuItem | undefined;
  menu_items: MenuItem[] = [];
  items: MenuItem[] = [];
  Subscription_router: Subscription;

  constructor(
    private router: Router,
    private dataSharedService: DataService,
    public menuVisibilityService: MenuVisibilityService,
    private pusherService: PusherService,
    public generalService: GeneralService,
  ) {
    this.Subscription_router = this.pusherService.GetterNavs.subscribe(
      (data_recu: any) => {
        if (data_recu && data_recu.page === '/Indicateurs') {
          this.items = [
            {
              label: 'Gestion des processus',
              link: '/Indicateurs/list',
            },
          ];
          this.InitSelected(2);
        }
      }
    );
  }

  ngOnInit() {
    this.dataSharedService.selectedItemId$.subscribe(processusId => {
      this.DetailOngles(processusId);
      setTimeout(() => {
        this.getCurrentmenu(processusId);
      }, 100);

      this.router.events
        .pipe(filter((event: Event) => event instanceof NavigationEnd))
        .subscribe(() => {
          this.activateMenuByRoute(processusId);
        });
    });
  }

  ngOnDestroy(): void {
    if (this.Subscription_router) {
      this.Subscription_router.unsubscribe();
    }
  }

  activateMenuByRoute(processusId: any) {
    const currentRoute = this.router.url;
    const routes = [
      `/processus/detail/${processusId}`,
      `/procesObjectifs/list/${processusId}`,
      `/Indicateurs/list/${processusId}`,
    ];

    for (let i = 0; i < routes.length; i++) {
      if (currentRoute.startsWith(routes[i])) {
        this.items = [{ label: this.menu_items[i].label, link: currentRoute }];
        this.InitSelected(i);
        break;
      }
    }
  }

  InitSelected(current: number) {
    let menu: any = document.getElementById('menu_bar');
    setTimeout(() => {
      let list: any = menu.children[0]?.children[1]?.children[0]?.children;
      let elements: number[] = [0, 1, 2];

      elements = elements.filter(el => el !== current);

      elements.forEach((key: number) => {
        let element: any = list.item(key);
        element.children[0].classList.remove('p-menuitem-link', 'p-button', 'clr');
        element.children[0].classList.add('p-2');
      });

      let element: any = list.item(current);
      element.children[0].classList.remove('p-menuitem-link', 'p-button-info', 'clr');
      element.children[0].classList.add('p-2', 'p-button', 'p-button-info', 'clr');
    }, 10);
  }

  getCurrentmenu(processusId: number) {
    const currentRoute = this.router.url;
    switch (currentRoute) {
      case '/processus':
      case `/processus/detail/${processusId}`:
        this.items = [
          { label: 'Fiche ', link: currentRoute },
        ];
        this.InitSelected(0);
        break;
      case `/procesObjectifs/list/${processusId}`:
        this.items = [
          { label: 'Objectifs ', link: currentRoute },
        ];
        this.InitSelected(1);
        break;
      case `/Indicateurs/list/${processusId}`:
        this.items = [
          { label: 'Indicateurs', link: currentRoute },
        ];
        this.InitSelected(2);
        break;
    }
  }

  DetailOngles(processusId: number) {
    this.menu_items = [
      {
        label: 'Fiche ',
        icon: 'pi pi-fw pi-box',
        route: `/processus/detail/${processusId}`,
        command: (e: any) => this.handleMenuCommand(e, 0),
      },
      {
        label: 'Objectifs ',
        icon: 'pi pi-fw pi-box',
        route: `procesObjectifs/list/${processusId}`,
        command: (e: any) => this.handleMenuCommand(e, 1),
      },
      {
        label: 'Indicateurs',
        icon: 'pi pi-fw pi-box',
        route: `/Indicateurs/list/${processusId}`,
        command: (e: any) => this.handleMenuCommand(e, 2),
      },
    ];
  }

  handleMenuCommand(event: any, index: number) {
    this.router.navigate([event?.item?.route]);
    this.items = [{ label: this.menu_items[index].label, link: this.router.url }];
    this.InitSelected(index);
  }
}
