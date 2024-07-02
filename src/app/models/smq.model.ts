export interface SmqModel {
    id: number;
    libelle: string;
    description: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
    siteID: number;
    sites: any;
}
