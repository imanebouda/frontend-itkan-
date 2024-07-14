import { Action } from "./action.model";

export class Preuve {
    id: number;
    filename: string;
    filepath: string;
    creationDate: Date;
    actionId: number;
    action?: Action;
  }
  