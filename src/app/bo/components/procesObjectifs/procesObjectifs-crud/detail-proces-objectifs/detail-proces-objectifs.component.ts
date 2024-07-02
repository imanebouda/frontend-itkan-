import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-detail-proces-objectifs',
  templateUrl: './detail-proces-objectifs.component.html',
})
export class DetailProcesObjectifsComponent implements OnInit  {
  @Input('data_selected_proces_objectifs') data_selected_proces_objectifs : any;
   // data de la reclamatiom
  ngOnInit(): void {
  }
}
