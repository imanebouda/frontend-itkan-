import { Component, OnInit } from '@angular/core';
import { ConstatModel } from '../../../../models/constat.model';
import { ConstatService } from '../../../../services/AuditServices/constat.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SiteAuditService } from 'src/app/services/AuditServices/site-audit.service';
import { SiteAuditModel } from 'src/app/models/site-audit.model';
@Component({
  selector: 'app-update-site-audit',
  templateUrl: './update-site-audit.component.html',
  styleUrls: ['./update-site-audit.component.scss']
})
export class UpdateSiteAuditComponent implements OnInit {
  currentSiteAudit = new SiteAuditModel();

  constructor(
      private siteAuditService: SiteAuditService,
      private activatedRoute: ActivatedRoute,
      private router: Router
  ) {}

  ngOnInit() {
      this.activatedRoute.params.subscribe(params => {
          const id = params['id'];
          if (id) {
              this.siteAuditService.editSiteAudit(id).subscribe(siteAudit => {
                  this.currentSiteAudit = siteAudit;
              });
          }
      });
  }

  updateSiteAudit() {
      this.siteAuditService.updateSiteAudit(this.currentSiteAudit.id, this.currentSiteAudit).subscribe(() => {
          this.router.navigate(['editSiteAudit/']);
      });
  }
}
