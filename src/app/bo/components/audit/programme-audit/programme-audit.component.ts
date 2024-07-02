import {Component, OnInit} from '@angular/core';
import {ProgrammeAuditService} from "../../../../services/AuditServices/programme-audit.service";
import {ProgrammeAuditModel} from "../../../../models/ProgrammeAudit";
import {AuditModel} from "../../../../models/audit.model";
import { AuditService } from 'src/app/services/AuditServices/audit.service';

@Component({
  selector: 'app-programme-audit',
  templateUrl: './programme-audit.component.html',
  styleUrls: ['./programme-audit.component.scss']
})
export class ProgrammeAuditComponent implements OnInit {
    programmeAudits: ProgrammeAuditModel[] = [];
    audits: { [key: number]: AuditModel } = {};

    constructor(
        private programmeAuditService: ProgrammeAuditService,
        private auditService: AuditService
    ) {}

    ngOnInit(): void {
        this.programmeAuditService.getProgrammeAudits().subscribe((data: ProgrammeAuditModel[]) => {
            this.programmeAudits = data;

        });
    }

    getAuditById(auditId: number): AuditModel | undefined {
        return this.audits[auditId];
    }
}

