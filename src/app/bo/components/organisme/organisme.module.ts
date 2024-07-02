import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OrganismeComponent } from './organisme.component';
import { StyleClassModule } from 'primeng/styleclass';
import { OrganismesRoutingModule } from './organisme-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { OrganismeInfoComponent } from './organisme-info/organisme-info.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        StyleClassModule,
        OrganismesRoutingModule,
        SharedModule,
    ],
    declarations: [OrganismeComponent, OrganismeInfoComponent ],
})
export class OrganismeModule {}
