import { TypeAction } from './type-action.model';
import { StatusAction } from './status-action.model';
import { UsersModel } from './users.model';

export class Action {
  id: number;
  libelle: string;
  creationDate: Date;
  description: string;
  userId: number;
  user?: UsersModel;
  typeActionId: number;
  typeAction?: TypeAction;
  statusActionId: number;
  statusAction?: StatusAction;
}
