import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuditService } from 'src/app/services/AuditServices/audit.service';

@Component({
    selector: 'app-dropdown',
    templateUrl: './dropdown.component.html',
    styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit{
    auditeurForm: FormGroup; // Définissez le FormGroup parent

    userAuditeur: any[] = [];
    Afficher_params: any;
    auditeurs: any[] = [];
    selectedOption: string;

    constructor(private fb: FormBuilder, private auditService: AuditService) { }

    ngOnInit(): void {
        // Initialisez le FormGroup parent
        this.auditeurForm = this.fb.group({
            Auditeur: [null]
        });

        // Chargez les auditeurs
        this.getAllAuditeur();
    }

    getAllAuditeur(): void {
        this.Afficher_params = this.auditService.GetAllAuditeur().subscribe(
            (res: any) => {
                if (res) {
                    this.userAuditeur = res.map((element: any) => ({
                        value: element.id,
                        label: element.nomCompletUtilisateur
                    }));
                }
            },
            (error: any) => {
                console.error('Erreur lors de la récupération des auditeurs', error);
            }
        );
    }

    onDropdownChange(): void {
        // Code pour gérer le changement dans le dropdown
    }
}
