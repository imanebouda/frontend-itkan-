import { Injectable } from '@angular/core';
import {ProgrammeAuditModel} from "../../models/ProgrammeAudit";
import {HttpClient} from "@angular/common/http";
import {AuditModel} from "../../models/audit.model";

@Injectable({
  providedIn: 'root'
})
export class ProgrammeAuditService {

    private apiUrl = 'https://localhost:44305/api/ProgrammeAudit';
   // private apiauth='https://localhost:44305/api/Auth/GetAllAuditeur'




    audits :AuditModel[];
    programmeaudit! :ProgrammeAuditModel;
    constructor(private http: HttpClient) {

    }



    getProgrammeAudits() {
        return this.http.get<ProgrammeAuditModel[]>(`${this.apiUrl}/programme-audits`);
    }
    getProgrammeAuditsForAudit(auditId: number) {
        return this.http.get<ProgrammeAuditModel[]>(`${this.apiUrl}/programme-audits/${auditId}`);
    }
}
