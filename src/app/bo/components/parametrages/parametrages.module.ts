import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';;
import { ParametragesRoutingModule } from './parametrages-routing.module';
import { ParametragesComponent } from './parametrages.component';
import { SettingComponent } from './setting/setting.component';
import { AddSettingComponent } from './setting/crud-Setting/add-setting/add-setting.component';
import { UpdateSettingComponent } from './setting/crud-Setting/update-setting/update-setting.component';
import { CategorieComponent } from './categorie/categorie.component';
import { SmqComponent } from './smq/smq.component';
import { SiteComponent } from './site/site.component';
import { AddSiteComponent } from './site/crud-site/add-site/add-site.component';
import { UpdateSiteComponent } from './site/crud-site/update-site/update-site.component';
import { AddSmqComponent } from './smq/crud-smq/add-smq/add-smq.component';
import { UpdateSmqComponent } from './smq/crud-smq/update-smq/update-smq.component';
import { AddCategorieComponent } from './categorie/crud-categorie/add-categorie/add-categorie.component';
import { UpdateCategorieComponent } from './categorie/crud-categorie/update-categorie/update-categorie.component';

@NgModule({
    imports: [CommonModule, ParametragesRoutingModule, SharedModule],
    declarations: [
        ParametragesComponent,
        SettingComponent,
        AddSettingComponent,
        UpdateSettingComponent,
        CategorieComponent,
        SmqComponent,
        SiteComponent,
        AddSiteComponent,
        UpdateSiteComponent,
        AddSmqComponent,
        UpdateSmqComponent,
        AddCategorieComponent,
        UpdateCategorieComponent,
    ],
})
export class ParametragesModule {}
