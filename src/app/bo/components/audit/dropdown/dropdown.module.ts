import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownComponent } from './dropdown.component';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DropdownModule} from "primeng/dropdown"; // Importez FormsModule depuis Angular

@NgModule({
    declarations: [
        DropdownComponent
    ],
    imports: [
        CommonModule,
        DropdownModule,
        ReactiveFormsModule,

        FormsModule // Ajoutez FormsModule ici
    ],
    exports: [
        DropdownComponent
    ]
})
export class DropdownModules { }
