// src/app/models/reclamation.model.ts

export class ReclamationsModel {
    id: number;
    objet: string;
    détail: string;
    analyse?: string;
    status?: string;
    reclamantID: number;
    responsableID: number;
    creationDate: Date;


    static statusOptions = [
      'En attente',
      'En cours',
      'Résolu'
  ];
  }
  