import {AuditModel} from "./audit.model";

export interface ProgrammeAuditModel {
    id: number;
    auditID: number;
    title: string;
    dateAudit: Date;
    description: string;
    audit: AuditModel; // Si vous avez un modèle Audit en Angular
}
