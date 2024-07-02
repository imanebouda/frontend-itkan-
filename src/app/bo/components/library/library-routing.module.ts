import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LibraryComponent } from './library.component';
import { AutorisedGuard } from 'src/app/services/guard/autorised.guard';
import { ListLibraryComponent } from './list-library/list-library.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component:LibraryComponent,
                children: [
                    {
                        path: '',
                        redirectTo: '',
                        pathMatch: 'full',
                    },
                    {
                        path: '',
                        component:ListLibraryComponent ,
                        canActivate: [AutorisedGuard],
                        data: { role: 'bibliothèque-Consulter'},
                    },
                    { path: '**', redirectTo: 'list', pathMatch: 'full' },
                ],
            },

            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class HomeRoutingModule { }