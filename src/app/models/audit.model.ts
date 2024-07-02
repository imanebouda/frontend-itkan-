
import { TypeAuditModel } from "./type-audit.model";
import { UsersModel } from "./users.model";
export class AuditModel{
    id !: number ;
    nomAudit !: string;
    dateAudit !: Date ;
    status !: string;
    description !: string;
    typeaudit_id !: number;
    typeAudit?: TypeAuditModel;
    user_id !: number;
    auditor?: UsersModel;
    static statusOptions: string[] = ['En cours', 'Terminé', 'Validé'];
}
