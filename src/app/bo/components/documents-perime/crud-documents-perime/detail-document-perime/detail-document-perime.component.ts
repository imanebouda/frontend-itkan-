import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-detail-document-perime',
  templateUrl: './detail-document-perime.component.html',
})
export class DetailDocumentPerimeComponent {
  @Input('data_selected_proces_documents') data_selected_proces_documents : any;
  // data de la reclamatiom
 ngOnInit(): void {
 }
}
