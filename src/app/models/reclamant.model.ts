export class ReclamantModel{
    id: number;
  nom: string;
  prénom: string;
  email: string;
  mobile?: string;
  adresse?: string;
  ville?: string;
  creationDate: Date;
  reclamations: any[];
}