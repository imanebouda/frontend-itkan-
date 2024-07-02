import { TypeAuditModel } from './type-audit.model';
import { SmqModel } from './smq.model';
import { ProcessusModel } from './processus.model';
import { QuestionModel } from './question.model';
export interface ChecklistModel {
    id: number;
    typeAuditId: number;
    typeAudit: TypeAuditModel;
    smQ_ID: number;
    smq: SmqModel;
    processusID: number;
    processus: ProcessusModel;
   // CheckListAuditId: number;
   // question : QuestionModel;
}
