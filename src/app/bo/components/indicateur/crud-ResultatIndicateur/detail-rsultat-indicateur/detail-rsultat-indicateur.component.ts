import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-rsultat-indicateur',
  templateUrl: './detail-rsultat-indicateur.component.html',
  styleUrls: ['./detail-rsultat-indicateur.component.scss']
})
export class DetailRsultatIndicateurComponent {
  @Input('data_selected_Resultat_indicateur') data_selected_Resultat_indicateur : any;
  // data de la reclamatiom
 ngOnInit(): void {
 }
}
