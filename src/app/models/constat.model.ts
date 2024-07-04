import {TypeContat} from "./type-contat.model";
import { QuestionModel } from "./question.model";
export interface ConstatModel{
       // ID: number;
        constat: string;
        typeConstatId: number;
        checklistId: number;
        typeConstat: TypeContat;
        question: QuestionModel;
}
