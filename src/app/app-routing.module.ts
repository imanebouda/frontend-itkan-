import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './bo/components/notfound/notfound.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { AuthGuard } from './services/guard/auth.guard';
import { AutorisedGuard } from './services/guard/autorised.guard';
import { ListAuditComponent } from './bo/components/audit/list-audit/list-audit.component';
import { AddAuditComponent } from './bo/components/audit/add-audit/add-audit.component';
import { AddConstatComponent } from './bo/components/Constat/add-constat/add-constat.component';
import { UpdateAuditComponent } from './bo/components/audit/update-audit/update-audit.component';

import { AddSiteAuditComponent } from './bo/components/site-audit/add-site-audit/add-site-audit.component';
import { ListSiteAuditComponent } from './bo/components/site-audit/list-site-audit/list-site-audit.component';
import { UpdateSiteAuditComponent } from './bo/components/site-audit/update-site-audit/update-site-audit.component';
import { ListCheckListComponent } from './bo/components/question/list-check-list/list-check-list.component';
import { AddCheckListComponent } from './bo/components/question/add-check-list/add-check-list.component';
import { UpdateCheckListComponent } from './bo/components/question/update-check-list/update-check-list.component';

import { GestionAuditComponent } from './bo/components/audit/gestion-audit/gestion-audit.component';
import { DropdownComponent } from './bo/components/audit/dropdown/dropdown.component';
import { DetailAuditComponent } from './bo/components/audit/detail-audit/detail-audit.component';
import { ProgrammeAuditComponent } from './bo/components/audit/programme-audit/programme-audit.component';
import { ListChecklistComponent } from './bo/components/check_list/list-check-list/list-check-list.component';

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'auth',
          loadChildren: () =>
            import('./bo/components/auth/auth.module').then(
              (m) => m.AuthModule
            ),
        },
        {
          path: '',
          canActivate: [AuthGuard],
          component: AppLayoutComponent,
          children: [
            {
              path: '',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Accueil-Consulter' },
              loadChildren: () =>
                import('./bo/components/home/home.module').then(
                  (m) => m.HomeModule
                ),
            },
            {
              path: 'tableau-bord',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Tableau bord-Consulter' },
              loadChildren: () =>
                import('./bo/components/dashboard/dashboard.module').then(
                  (m) => m.DashboardModule
                ),
            },
            {
              path: 'bibliothèque',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Bibliothèque-Consulter' },
              loadChildren: () =>
                import('./bo/components/library/library.module').then(
                  (m) => m.LibraryModule
                ),
            },
            {
              path: 'utilisateurs',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Utilisateurs-Consulter' },
              loadChildren: () =>
                import('./bo/components/utilisateurs/utilisateurs.module').then(
                  (m) => m.UtilisateursModule
                ),
            },
            {
              path: 'processus',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Processus-Consulter' },
              loadChildren: () =>
                import('./bo/components/processus/processus.module').then(
                  (m) => m.ProcessusModule
                ),
            },
            {
              path: 'procesObjectifs',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Processus Objectifs-Consulter' },
              loadChildren: () =>
                import(
                  './bo/components/procesObjectifs/procesObjectifs.module'
                ).then((m) => m.ProcesObjectifsModule),
            },
            {
              path: 'procedure',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Procédure-Consulter' },
              loadChildren: () =>
                import('./bo/components/procedure/procedure.module').then(
                  (m) => m.ProcedureModule
                ),
            },
            {
              path: 'procObjectifs',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Procédures Objectifs-Consulter' },
              loadChildren: () =>
                import('./bo/components/proc-objectifs/proc-objectifs.module').then(
                  (m) => m.ProcObjectifsModule
                ),
            },
            {
              path: 'Documents-Périme',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Documents Périme-Consulter' },
              loadChildren: () =>
                import(
                  './bo/components/documents-perime/documents-perime.module'
                ).then((m) => m.DocumentsPerimeModule),
            },
            {
              path: 'list',
              component: ListAuditComponent,
            },
            {
              path: 'addaudit',
              component: AddAuditComponent,
            },
            {
              path: 'editaudit/:id',
              component: UpdateAuditComponent,
            },
            {
              path: 'detailAudit/:id',
              component: DetailAuditComponent,
            },
            {
              path: 'addconstat',
              component: AddConstatComponent,
            },
            {
              path: 'addSiteAudit',
              component: AddSiteAuditComponent,
            },
            {
              path: 'listSiteAudit',
              component: ListSiteAuditComponent,
            },
            {
              path: 'editSiteAudit/:id',
              component: UpdateSiteAuditComponent,
            },
            {
              path: 'listCheckList',
              component: ListCheckListComponent,
            },
            { path: 'listCheckList/:checklistAuditId', component: ListCheckListComponent },

            {
              path: 'list_Check_List',
              component: ListChecklistComponent,
            },
            {
              path: '',
              redirectTo: '/list_Check_List',
              pathMatch: 'full',
            },
          /*  {
              path: '**',
              redirectTo: '/list_Check_List',
            },*/
            {
              path: 'addCheckList',
              component: AddCheckListComponent,
            },
            {
              path: 'editCheckList/:id',
              component: UpdateCheckListComponent,
            },
            {
              path: 'gestionaudit/:id',
              component: GestionAuditComponent,
            },
            {
              path: 'programmeaudit',
              component: ProgrammeAuditComponent,
            },
            {
              path: 'ecart',
              component: DropdownComponent,
            },
            {
                            path: 'Leadership',
                            canActivate: [AuthGuard, AutorisedGuard],
                            data: {role: 'Leadership-Consulter' },
                            loadChildren: () =>
                                import(
                                    './bo/components/leadership/leadership.module'
                                ).then((m) => m.LeadershipModule),
                        },
            {
              path: 'Indicateurs',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Indicateurs-Consulter' },
              loadChildren: () =>
                import('./bo/components/indicateur/indicateur.module').then(
                  (m) => m.IndicateurModule
                ),
            },
            {
              path: 'Leadership',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Leadership-Consulter' },
              loadChildren: () =>
                import('./bo/components/leadership/leadership.module').then(
                  (m) => m.LeadershipModule
                ),
            },
            {
              path: 'parametrages',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Paramétrages-Consulter' },
              loadChildren: () =>
                import('./bo/components/parametrages/parametrages.module').then(
                  (m) => m.ParametragesModule
                ),
            },
            {
              path: 'organisme',
              canActivate: [AuthGuard, AutorisedGuard],
              data: { role: 'Organisme-Consulter' },
              loadChildren: () =>
                import('./bo/components/organisme/organisme.module').then(
                  (m) => m.OrganismeModule
                ),
            },
          ],
        },
        {
          path: 'landing',
          loadChildren: () =>
            import('./bo/components/landing/landing.module').then(
              (m) => m.LandingModule
            ),
        },
        { path: 'notfound', component: NotfoundComponent },
        { path: '**', redirectTo: '/notfound' },
      ],
      {
        scrollPositionRestoration: 'enabled',
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
      }
    ),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
