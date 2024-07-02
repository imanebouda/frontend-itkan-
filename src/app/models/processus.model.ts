export interface ProcessusModel {
    id: number;
    code: string;
    version: string;
    libelle: string;
    description: string;
    pilote: number;
    coPilote: number;
    creationDate: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    smQ_ID: number;
    categorie_ID: number;
    useR_ID: number;
    smq: any;
    categories: any;
    users: any;
    piloteUser: any;
    coPiloteUser: any;
}
