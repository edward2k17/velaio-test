import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPageComponent} from './list-page/list-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
  ]
})
export class TodosModule {
}
