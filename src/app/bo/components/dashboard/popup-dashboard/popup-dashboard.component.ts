import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-popup-dashboard',
  templateUrl: './popup-dashboard.component.html'
})
export class PopupDashboardComponent implements OnInit{
  is_loading: boolean = false;
  products: any[]= [
    { ods: 12, client : 'Jakov', mat: 25 }, 
    { ods: 14, client : 'Marko', mat: 31 }
  ];

  @Input() data_selected_ords:any;

  constructor( private router: Router ){}
  ngOnInit(): void {
    
  }

  
}
