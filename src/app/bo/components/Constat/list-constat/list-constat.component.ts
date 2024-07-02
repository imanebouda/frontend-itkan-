/*import { Component } from '@angular/core';
import { ConstatModel } from '../../../../models/constat.model';
import { ConstatService } from '../../../../services/AuditServices/constat.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-list-constat',
    templateUrl: './list-constat.component.html',
    styleUrls: ['./list-constat.component.scss']
})
export class ListConstatComponent {
    constats: ConstatModel[];
    Afficher_params: Subscription;

    constructor(private constatService: ConstatService) {
        this.loadConstats();
    }

    loadConstats() {
        this.constatService.constatList().subscribe(
            constats => this.constats = constats,
            error => console.error('Error fetching constats:', error)
        );
    }

    deleteConstat(constatData: any): void {
        this.constatService.deleteConstat(constatData)
            .subscribe(
                (response: any) => {
                    console.log('Constat supprimé avec succès', response);
                    // Faire quelque chose avec la réponse si nécessaire
                },
                (error: any) => {
                    console.error('Erreur lors de la suppression du constat', error);
                    // Gérer l'erreur si nécessaire
                }
            );
    }
}*/
