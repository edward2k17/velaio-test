import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPageComponent} from './list-page/list-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";

@NgModule({
  declarations: [
    ListPageComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
  ]
})
export class TodosModule {
}
