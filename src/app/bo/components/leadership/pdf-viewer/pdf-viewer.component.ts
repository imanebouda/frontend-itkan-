import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ManuelQualiteService } from 'src/app/services/manuelQualite/manuelQualite.service';
import { PolitiqueQualiteService } from 'src/app/services/politiqueQualite/politiqueQualite.service';
@Component({
  selector: 'app-pdf-viewer',
  templateUrl: './pdf-viewer.component.html',
  styleUrls: ['./pdf-viewer.component.scss']
})
export class PdfViewerComponent {
  pdfurl : string='';
  document : any ;
  is_loading: boolean = true;
  @Input('data_selected_Dp') data_selected_Dp: any;
  @Output() FermerPopUp = new EventEmitter<boolean>();
  
  constructor(
    private politiqueQualite_src: PolitiqueQualiteService,
    private manuelQualite_src: ManuelQualiteService,
) { }



ngOnInit(): void {
  setTimeout(() => {
    if(this.data_selected_Dp.TypeDocument ==="PQ"){
      this.is_loading=true;
      this.document = this.data_selected_Dp.ID;
      this.politiqueQualite_src.DownloadPQDocument( this.document ).subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.click();
          this.pdfurl=url;
          //window.URL.revokeObjectURL(url);
      });
      this.is_loading=false
    } else if (this.data_selected_Dp.TypeDocument ==="MQ"){
      this.is_loading=true;
      this.document = this.data_selected_Dp.ID;
      this.manuelQualite_src.DownloadMQDocument(this.document).subscribe((data: Blob) => {
          const blob = new Blob([data], { type: 'application/octet-stream' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.click();
          this.pdfurl=url;
          //window.URL.revokeObjectURL(url);
      });
      this.is_loading=false
    }
  }, 500);
}



 

  // Fermer le popup
  ClosePopUp(state: boolean) {
    this.FermerPopUp.emit(state);
  }
}
