import {TypeContat} from "./type-contat.model";
import { QuestionModel } from "./question.model";
export class ConstatModel{
        id: number;
        constat: string;
        typeConstatId: number;
        questionId: number;
        typeConstat: TypeContat;
        question: QuestionModel;
}
