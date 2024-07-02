import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-proc-objectifs',
  templateUrl: './detail-proc-objectifs.component.html',
  styleUrls: ['./detail-proc-objectifs.component.scss']
})
export class DetailProcObjectifsComponent {
  @Input('data_selected_Proc_objectifs') data_selected_Proc_objectifs : any;
   // data de la reclamatiom
  ngOnInit(): void {
  }
}
