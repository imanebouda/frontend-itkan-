// reclamation-details.model.ts
import { ReclamationsModel } from 'src/app/models/reclamation.model';

export class ReclamationDetailsModel extends ReclamationsModel {
    reclamantNom: string;
    reclamantPrenom: string;
    responsableNomComplet: string;
}
