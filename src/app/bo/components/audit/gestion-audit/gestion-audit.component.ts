import {Component, OnInit} from '@angular/core';
import {ProcessusService} from "../../../../services/processus/processus.service";
import {Observable} from "rxjs";
import {FormControl, FormGroup} from "@angular/forms";
import {GeneralService} from "../../../../services/general/general.service";
import {Router} from "@angular/router";
import {DataService} from "../../../../services/dataShared/data.service";

@Component({
  selector: 'app-gestion-audit',
  templateUrl: './gestion-audit.component.html',
  styleUrls: ['./gestion-audit.component.scss']
})
export class GestionAuditComponent implements OnInit{
    listDeclaration: any[] = [];
    processesList: any[] = [];
    colone: any = 'ID';
    order: any = 'DESC';
    is_loading: boolean = true;
    FormmulaireRecherche: FormGroup;
    skip: any = 0;
    take: any = 10;
    totalRecords: any = 0;

   //$: Observable<any>; // Observable pour contenir la liste des processus
    auditType: string = 'Type_Audit_A_Explorer'; // Type d'audit à rechercher, à remplacer par votre propre valeur

    constructor(private processusService: ProcessusService,
                private processus_src : ProcessusService,
                public generalService: GeneralService,
                private router: Router,
                private dataSharedService :  DataService ) {
        this.FormmulaireRecherche = new FormGroup({
            code: new FormControl(null),
            date: new FormControl(null),
            libelle: new FormControl(null),
            categorie: new FormControl(null)
        });
    }




    ngOnInit(): void {
        this.getProcessusByAuditType();

      // this.fetchProcessusByAuditType(); // Appelez la fonction lors de l'initialisation du composant

    }

  /*  fetchProcessusByAuditType(): void {

        this.is_loading = true;

        const code = this.FormmulaireRecherche.value.code;
        const libelle = this.FormmulaireRecherche.value.libelle;
        const categorie = this.FormmulaireRecherche.value.categorie;

      this.processusService.getProcessusByAuditType().subscribe();

    }*/
    Sort(event: any) {
        this.colone = event?.field;
        this.order = event?.order == -1 ? 'DESC' : 'asc';
        setTimeout(() => {
            this.getProcessusByAuditType();
        }, 10);
    }
    DisplayProcessus() {
        this.is_loading = true;

        const code = this.FormmulaireRecherche.value.code;
        const libelle = this.FormmulaireRecherche.value.libelle;
        const categorie = this.FormmulaireRecherche.value.categorie;
        this.processus_src.GetProcessus(
            code,
            libelle,
            categorie,
            this.colone, // Assurez-vous que c'est bien "colonne" au lieu de "colone"
            this.order,
            this.take,
            this.skip
        ).subscribe(
            (response: any) => {
                try {

                    if (response) {

                        this.listDeclaration = response.data || [];
                        this.totalRecords = response.TotalRows || 0;
                    } else {
                        this.generalService.errorSwal(response.Message);
                    }
                } catch (error) {
                    this.generalService.errorSwal('Une erreur inattendue s\'est produite.');
                } finally {
                    this.is_loading = false;
                }
            },
            (error) => {
                this.generalService.errorSwal('Une erreur de communication avec le serveur s\'est produite.',error);
                this.is_loading = false;
            }
        );


    }

    getProcessusByAuditType() {
        this.is_loading = true;

        const code = this.FormmulaireRecherche.value.code;
        const libelle = this.FormmulaireRecherche.value.libelle;
        const categorie = this.FormmulaireRecherche.value.categorie;
        this.processus_src.GetProcessus(
            code,
            libelle,
            categorie,
            this.colone, // Assurez-vous que c'est bien "colonne" au lieu de "colone"
            this.order,
            this.take,
            this.skip
        ).subscribe(
            (response: any) => {
                try {

                    if (response) {

                        this.listDeclaration = response.data || [];
                        this.totalRecords = response.TotalRows || 0;
                    } else {
                        this.generalService.errorSwal(response.Message);
                    }
                } catch (error) {
                    this.generalService.errorSwal('Une erreur inattendue s\'est produite.');
                } finally {
                    this.is_loading = false;
                }
            },
            (error) => {
                this.generalService.errorSwal('Une erreur de communication avec le serveur s\'est produite.',error);
                this.is_loading = false;
            }
        );
    }
    paginate(event: any) {
        this.take = event?.rows;
        this.skip = event?.first;
        setTimeout(() => {
            this.getProcessusByAuditType();
        }, 10);
    }
    DetailAnProcessus(p: any) {
        this.router.navigate(['processus/detail', p.ID]);
        this.dataSharedService.setSelectedItemId(p.ID);
    }




}
