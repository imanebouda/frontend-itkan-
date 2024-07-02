import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ParametragesComponent } from './parametrages.component';
import { SettingComponent } from './setting/setting.component';
import { CategorieComponent } from './categorie/categorie.component';
import { SmqComponent } from './smq/smq.component';
import { SiteComponent } from './site/site.component';


@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: ParametragesComponent,
                children: [
                    {
                        path: '',
                        redirectTo: 'liste',
                        pathMatch: 'full',
                    },
                    {
                        path: 'liste',
                        component: SettingComponent,
                    },
                    {
                        path: 'catégories',
                        component: CategorieComponent,
                    },
                    {
                        path: 'smq',
                        component: SmqComponent,
                    },
                    {
                        path: 'sites',
                        component: SiteComponent,
                    },
                    { path: '**', redirectTo: 'liste', pathMatch: 'full' },
                ],
            },
            { path: '**', redirectTo: '', pathMatch: 'full' },
        ]),
    ],
    exports: [RouterModule],
})
export class ParametragesRoutingModule {}


// {
//     path: 'typeinspections',
//     component: TypeInspectionsComponent,
// },