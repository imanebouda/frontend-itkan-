import { Component } from '@angular/core';
import { ConstatModel } from '../../../../models/constat.model';
import { SiteAuditModel } from 'src/app/models/site-audit.model';
import { SiteAuditService } from 'src/app/services/AuditServices/site-audit.service'; 
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-list-site-audit',
  templateUrl: './list-site-audit.component.html',
  styleUrls: ['./list-site-audit.component.scss']
})
export class ListSiteAuditComponent {
  siteAudits: SiteAuditModel[];
  Afficher_params: Subscription;
  currentSiteAudit = new SiteAuditModel();


  constructor(private siteAuditservice: SiteAuditService) {
      this.loadsiteAudits();
  }

  loadsiteAudits() {
      this.siteAuditservice.SiteAuditList().subscribe(
          siteAudits => this.siteAudits = siteAudits,
          error => console.error('Error fetching siteAudits:', error)
      );
  }

  deleteSiteAudit(siteAuditData: SiteAuditModel): void {
      this.siteAuditservice.deleteSiteAudit(siteAuditData.id, siteAuditData)
          .subscribe(
              (response: any) => {
                  console.log('siteAudit supprimé avec succès', response);
                  // Faire quelque chose avec la réponse si nécessaire
              },
              (error: any) => {
                  console.error('Erreur lors de la suppression du siteAudit', error);
                  // Gérer l'erreur si nécessaire
              }
          );
          
  }

}
