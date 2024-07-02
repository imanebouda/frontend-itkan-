import { Component } from '@angular/core';
import { ConstatModel } from '../../../../models/constat.model';
import { AuditModel } from '../../../../models/audit.model';
import { ConstatService } from '../../../../services/AuditServices/constat.service';
import { AuditService } from 'src/app/services/AuditServices/audit.service';

@Component({
    selector: 'app-add-constat',
    templateUrl: './add-constat.component.html',
    styleUrls: ['./add-constat.component.scss']
})
export class AddConstatComponent {
    /*newConstat = new ConstatModel();
    audits: AuditModel[] = [];

    newAuditId!: number;

    constructor(
        private constatService: ConstatService,
        private auditService: AuditService
    ) {
        this.loadAudits();
    }

    loadAudits() {
        this.auditService.auditList().subscribe(
            audits => this.audits = audits,
            error => console.error('Error fetching audits:', error)
        );
    }

    addConstat() {
        this.constatService.addConstat(this.newConstat).subscribe(() => {
            // Logique de redirection ou de traitement supplémentaire après l'ajout du constat
        });
    }*/
}
