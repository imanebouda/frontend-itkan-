import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { DocumentsPerimeComponent } from './documents-perime.component';
import { ListDocumentPerimeComponent } from './crud-documents-perime/list-document-perime/list-document-perime.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:ListDocumentPerimeComponent,
                canActivate: [AutorisedGuard],
                data: { role: 'Processus-Consulter'},
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class DocumentsPerimeRoutingModule { }

