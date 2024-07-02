import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { GeneralService } from 'src/app/services/general/general.service';
import { ReclamationsService } from 'src/app/services/reclamtion/reclamtions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pop-reclama-dashboard',
  templateUrl: './pop-reclama-dashboard.component.html'
})
export class PopReclamaDashboardComponent {
  /* ------------------------- Les variables globales ------------------------- */
  Afficher: Subscription;
  is_loading: boolean = false;
  data_selected_detailreclamation: any;
  /* ------------------------ les variables d'affichage ----------------------- */
  skip: any = 0;
  take: any = 10;
  order: any = 'asc';
  colone: any = 'name';
  totalRecords: any = 0;
  liste_reclamation: any[] = [];
  FormmulaireRecherche: FormGroup;
  /* ----------------- Les variables du popup ajout ou update ----------------- */
  Header_info: any ="Détail de la reclamation";
  if_show_detail: boolean = false;

  constructor(
    private generalService: GeneralService,
    private reclamationService: ReclamationsService
  ) {
      /* ---------------------- Initialisation du formulaire ---------------------- */
      this.FormmulaireRecherche = new FormGroup({
        reference: new FormControl(null),
        titre: new FormControl(null),
        created_at: new FormControl(null),
      });
  }

  ngOnInit(): void {
    this.ShowReclamation();
    this.SearchReclamation();
  }

  SearchReclamation(){
    this.skip = 0;
      this.take = 10;
      setTimeout(() => {
          this.ShowReclamation();
      }, 100);
  }
  ShowDetailReclamation(data_selected_detailreclamation: any = null){
    this.data_selected_detailreclamation = data_selected_detailreclamation;
    this.if_show_detail=true;
  }

  ShowReclamation() {
    this.is_loading = true;
    let body: any = {
        colone: this.colone,
        order: this.order,
        skip: this.skip,
        take: this.take,
        titre: this.FormmulaireRecherche.value.titre,
        reference: this.FormmulaireRecherche.value.reference,
        created_at: this.FormmulaireRecherche.value.created_at,
    };
    this.Afficher = this.reclamationService
    .AfficherReclamation(body)
    .subscribe((r: any) => {
      r = JSON.parse(r);
      if (r.hasOwnProperty('msg') && r?.msg == 'success') {
        this.liste_reclamation = r.hasOwnProperty('data')? r?.['data']: [];
        this.totalRecords = r.hasOwnProperty('TotalRows')? r?.['TotalRows']: 0;
        this.is_loading = false;
      } else {
        this.generalService.errorSwal(r?.msg);
        this.is_loading = false;
      }
    });
  }

  /* -------------------- Les fonctions pour l'affichage --------------------- */
  ClearSearch() {
    this.FormmulaireRecherche.reset();
    setTimeout(() => {
        this.SearchReclamation();
    }, 100);
  }

  paginate(event: any) {
    this.take = event?.rows;
    this.skip = event?.first;
    setTimeout(() => {
        this.ShowReclamation();
    }, 10);
  }

  Sort(event: any) {
    this.colone = event?.field;
    this.order = event?.order == -1 ? 'DESC' : 'asc';
    setTimeout(() => {
        this.ShowReclamation();
    }, 10);
  }
}
