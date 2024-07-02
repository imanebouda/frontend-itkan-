import {Component, ElementRef, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {GeneralService} from "../../../../services/general/general.service";
import {ProcessusService} from "../../../../services/processus/processus.service";
import {ProcesDocumentsService} from "../../../../services/procesDocuments/procesDocuments.service";
import {PusherService} from "../../../../services/general/pusher.service";
import {MenuVisibilityService} from "../../../../services/dataShared/menu-visibility.service";
import {DataService} from "../../../../services/dataShared/data.service";
import Swal from "sweetalert2";
import {environment} from "../../../../../environments/environment";
import { AuditService } from 'src/app/services/AuditServices/audit.service';
import {AuditModel} from "../../../../models/audit.model";
import { ConstatModel } from 'src/app/models/constat.model';
import { ConstatService } from 'src/app/services/AuditServices/constat.service';
@Component({
    selector: 'app-detail-audit',
    templateUrl: './detail-audit.component.html',
    styleUrls: ['./detail-audit.component.scss']
})
export class DetailAuditComponent  implements  OnInit{
    currentAudit=new AuditModel();
    constats: ConstatModel[] = [];
    isLoading: boolean = true;
    constructor(
        private  auditService:AuditService,
        private activatedRoute :ActivatedRoute,
        private router : Router,
        private constatService: ConstatService
    ) {


    }
    ngOnInit() {
        // this.currentAudit=this.auditService.editAudit(this.activatedRoute.snapshot.params['id']);
        this.auditService.editAudit(this.activatedRoute.snapshot.params['id']).subscribe(p=>{
            this.currentAudit=p;
            // this.newCategoryId = this.currentProduct.category?.idCatecory!;
        });
        this.loadConstats();
    }
    loadConstats(): void {
        this.isLoading = true;
        this.constatService.getConstats().subscribe(
          (constats: ConstatModel[]) => {
            this.constats = constats;
            this.isLoading = false;
          },
          (error: any) => {
            console.error('Error fetching constats:', error);
            this.isLoading = false;
            // Handle error message or retry logic here
          }
        );
      }
}










