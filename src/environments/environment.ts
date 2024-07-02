const api_url: any = 'https://localhost:44305';
const front_url: any = 'http://localhost:4200';
export const environment = {
    production: false,
    /* -------------------------------------------------------------------------- */
    /*                                 LES ROUTES                                 */
    /* -------------------------------------------------------------------------- */
    API_BASE_URL_GENERAL: `${api_url}/api/`,
    
    API_BASE_URL_USERS: `${api_url}/api_user/`,
    API_BASE_URL_PARAMETRAGE: `${api_url}/api_parametrage/`,
    API_BASE_URL_ImagesEssai: `${api_url}/images/ficheessais/`,
    API_BASE_URL_ImagesInspection: `${api_url}/images/inspections/`,
    unique_claim: 'Vnh0ohaeHj76hV4ctMU6IXNlwpK8pKusj7618QJKKj',
    /* -------------------------------------------------------------------------- */
    /*                                les variables                               */
    /* -------------------------------------------------------------------------- */
    /* -------------------------- Les rôles du système pour les guards et les ngif des composants -------------------------- */
    id_role_controller: '6',
    id_role_verfi: '7',
    id_role_superadministrateur: '2', // 1 en base64 => "MQ==" puis md5
    id_role_rtc: '5',
    id_role_gestionnaire_produits: 'f7947d50da7a043693a592b4db43b0a1', // 4 en base64 => "NA==" puis md5
    CRYPTAGE_KEY:'eyJhbGciOiJIUzI1NiJ9.ew0KICAic3ViIjogIjEyMzQ1Njc4OTAiLA0KICAibmFtZSI6ICJBbmlzaCBOYXRoIiwNCiAgImlhdCI6IDE1MTYyMzkwMjINCn0.Yf5EylKplirKs_VaRl7eEtnuoHNjQiU77qHXv9hHu6s',
    months: [
        'Janvier',
        'Février',
        'Mars',
        'Avril',
        'Mai',
        'Juin',
        'Juillet',
        'Août',
        'Septembre',
        'Octobre',
        'Novembre',
        'Décembre',
    ],
    /* -------------------------------------------------------------------------- */
    /*                                  LES APIS                                  */
    /* -------------------------------------------------------------------------- */
    api: {
        Processus: {
            getAll :'processus',
            recherche : 'processus/recherche',
            ajouter: 'processus/ajouter',
            categories : 'processus/GetCategories',
            smq :'processus/GetSMQ',
            modifie :'processus/update',
            supprimer:'processus/Delete',
            detaille : 'processus/Detail' ,
            GetProcessusData :'processus/GetProcessusData',
            getProcessusByPilote:'processus/GetProcessusByPilote',
            getProcessusByAuditType:'{auditId}/processus'

        },
        ProcesObjectifs :{
            recherche :'ProcesObjectifs/recherche',
            ajouter : 'ProcesObjectifs/ajouter',
            modifie : 'ProcesObjectifs/update',
            supprimer:'ProcesObjectifs/Delete'
        },
        ProcesDocuments : {
            detaille: 'ProcesDocuments/Detail',
            ajouter : 'ProcesDocuments/ajouter',
            modifie :'ProcesDocuments/update',
            supprimer :'ProcesDocuments/Delete',
            statut:'ProcesDocuments/modifier-perime',
            download : 'ProcesDocuments/download',
            recherche : 'ProcesDocuments/recherche-documents',
            check : 'ProcesDocuments/CheckValidDocument'
        },
        ProcDocuments : {
            getAll:  'ProcDocuments',
            detaille: 'ProcDocuments/Detail',
            ajouter : 'ProcDocuments/ajouter',
            modifie :'ProcDocuments/update',
            supprimer :'ProcDocuments/Delete',
            statut:'ProcDocuments/modifier-perime',
            download : 'ProcDocuments/download',
            recherche :'ProcDocuments/recherche'
        },
        Procedures : {
            getAll : 'procedures',
            recherche :'procedures/recherche',
            ajouter : 'procedures/ajouter',
            modifie : 'procedures/update',
            supprimer : 'procedures/Delete',
            detaille : 'procedures/Detail'
        },
        ProcObjectifs :{
            recherche :'ProcObjectifs/recherche',
            ajouter : 'ProcObjectifs/ajouter',
            modifie : 'ProcObjectifs/update',
            supprimer:'ProcObjectifs/Delete'
        },
        Indicateurs : {
           recherche :'Indicateur/recherche',
           supprimer:'Indicateur/Delete',
           ajouter : 'Indicateur/ajouter',
           modifie : 'Indicateur/update',
           detaille : 'Indicateur/Detail'
        },
        ResultatIndicateurs :{
            recherche :'ResultatsIndicateurs/recherche',
            ajouter : 'ResultatsIndicateurs/ajouter',
            modifie : 'ResultatsIndicateurs/update',
            supprimer : 'ResultatsIndicateurs/Delete',
            // detaille : 'ResultatsIndicateurs/Detail'
        },
        dashboards: {
            tableaux: 'dashboards/tableaux',
            tableauxResultIndicateurs: 'ResultatsIndicateurs'
        },
        PolitiqueQualite :{
            ajouter :'PolitiqueQualite/ajouter',
            detaille :'PolitiqueQualite/Detail',
            modifie :'PolitiqueQualite/update',
            supprimer : 'PolitiqueQualite/Delete',
            statut:'PolitiqueQualite/modifier-perime',
            download : 'PolitiqueQualite/download',
        },
        ManuelQualite :{
            ajouter :'ManuelQualite/ajouter',
            detaille :'ManuelQualite/Detail',
            modifie :'ManuelQualite/update',
            supprimer : 'ManuelQualite/Delete',
            statut:'ManuelQualite/modifier-perime',
            download : 'ManuelQualite/download',
        },
        ville: {
            afficher: 'AfficherVille',
            ajouter: 'AjouterVille',
            supprimer: 'SupprimerVille',
            modifier: 'ModifierVille',
            restaurer: 'RestaurerVille',
        },
        pays: {
            afficher: 'AfficherPays',
            ajouter: 'AjouterPays',
            supprimer: 'SupprimerPays',
            modifier: 'ModifierPays',
            restaurer: 'RestaurerPays',
        },
        /* --------------------------------- general -------------------------------- */
        general: {
            telecharger: 'TelechargerDocument',
            LoadRolesList: 'LoadRolesList',
            LoadCountDashboard: 'LoadCountDashboard',
            AfficherLogs: 'AfficherLogs',
        },
        user: {
            /* ---------------------------------- crud ---------------------------------- */
            getAll :'Auth/GetAll',
            getAllPilote :'Auth/GetAllPilote',
            getAllCoPilote:'Auth/GetAllCoPilote',
            login: 'Auth/login',
            save: 'Auth/Insert',
            modifie: 'Auth/update',
            modifier_password: 'Auth/UpdatePassWord',
            afficher_image: 'Auth/AfficherImageUtilisateur',
            afficher: 'Auth/search',
            supprimer: 'Auth/delete',
            GetAllByRoleController: 'Auth/GetAllByRoleController',
            PasswordForgotten: 'Auth/PasswordForgotten',
        },
        role: {
            search: 'roles/search',
            afficherAll: 'roles/GetAll',
            AjouterRole: 'roles/insert',
            ModifieRole: 'roles/update',
            supprimer: 'roles/delete',
        },
        permissions: {
            getAllbyRole: 'permissions/GetAllByRole',
            save: 'permissions/save',
        },
        parametrage: {
            search: 'parametrages/search',
            afficherAll: 'parametrages/GetAll',
            Ajouter: 'parametrages/insert',
            Modifie: 'parametrages/update',
            supprimer: 'parametrages/delete',
        },
        smq: {
            search: 'SMQ/search',
            afficherAll: 'SMQ/GetAll',
            Ajouter: 'SMQ/insert',
            Modifie: 'SMQ/update',
            supprimer: 'SMQ/delete',
        },
        categorie: {
            search: 'Categorie/search',
            afficherAll: 'Categorie/GetAll',
            Ajouter: 'Categorie/insert',
            Modifie: 'Categorie/update',
            supprimer: 'Categorie/delete',
        },
        sites: {
            search: 'sites/search',
            afficherAll: 'sites/GetAll',
            Ajouter: 'sites/insert',
            Modifie: 'sites/update',
            supprimer: 'sites/delete',
        },

        clients: {
            getHeaderNamesFromCSV: 'clients/getHeaderNamesFromCSV',
            UploadFileAndData: 'clients/UploadFileAndData',
            search: 'clients/search',
            searchByName: 'clients/SearchByName',
            afficherAll: 'clients/GetAll',
            Ajouter: 'clients/insert',
            Modifie: 'clients/update',
            supprimer: 'clients/delete',
        },

        declaration:{
            search: 'Declaration/search',
            afficherAll: 'Declaration/GetAll',
            Ajouter : 'Declaration/insert',
            Modifie: 'Declaration/update',
            supprimer :'Declaration/delete',
            changerStatut :'Declaration/changer-statut'
        },
        typeOrdreService: {
            Search: 'TypeOrdreService/search',
            GetAll: 'TypeOrdreService/GetAll',
            Add: 'TypeOrdreService/insert',
            Update: 'TypeOrdreService/update',
            Delete: 'TypeOrdreService/delete',
        },

        OrganismService: {
            Search: 'Organismes/search',
            GetAll: 'Organismes/GetAll',
            Add: 'Organismes/insert',
            Update: 'Organismes/update',
            Delete: 'Organismes/delete',
        },

        CertificatService: {
            Search: 'Certificat/Search',
            GetCertifByIdInspection: 'Certificat/GetCertifByIdInspection',
            GetAll: 'Certificat/GetAll',
            Add: 'Certificat/Insert',
            Update: 'Certificat/Update',
            Delete: 'Certificat/Delete',
        },

        reclamation: {
            search: 'reclamations/search',
            afficherAll: 'reclamations/GetAll',
            ajouterReclamation: 'reclamations/insert',
            ModifieReclamation: 'reclamations/update',
            supprimerReclamtion: 'reclamations/delete',
            ReclamationById: 'reclamations/ReclamationById',
        },
        ligne: {
            Search: 'lignes/search',
            GetAll: 'lignes/GetAll',
            Add: 'lignes/insert',
            Update: 'lignes/update',
            Delete: 'lignes/delete',
        },
        typeOrganisme: {
            Search: 'TypeOrganisme/search',
            GetAll: 'TypeOrganisme/GetAll',
            Add: 'TypeOrganisme/insert',
            Update: 'TypeOrganisme/update',
            Delete: 'TypeOrganisme/delete',
        },
        materielUtilise: {
            GetAll: 'MaterielUtilises/GetMaterielUtiliseByIdInspection',
            Save: 'MaterielUtilises/SaveMaterielUtiliseForInspection',
        },
    },
    supperadmin: 'Supper admin',
    Administateur: 'Administateur',
    max_value_to_compress: 2200,
    value_to_compress: 2000000,
    html_config: '',
};
