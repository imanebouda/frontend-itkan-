import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GeneralService } from 'src/app/services/services';
import { Subscription } from 'rxjs';
import { PusherService } from 'src/app/services/general/pusher.service';


@Component({
  selector: 'app-processus',
  templateUrl: './processus.component.html',
  styleUrls: ['./processus.component.scss']
})
export class ProcessusComponent {
  if_show_ajouter: boolean;

  Subscription_router: any;
  items: { label: string; link: string; }[];
  menu_items: { label: string; icon: string; route: string; command: (e: any) => void; }[];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public generalService: GeneralService,
) {}
 /* ------------------------------ les variables ----------------------------- */

 ngOnInit(): void {


}


 }
