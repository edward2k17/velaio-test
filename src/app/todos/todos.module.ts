import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ListPageComponent} from './list-page/list-page.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatCardModule} from "@angular/material/card";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatToolbarModule} from "@angular/material/toolbar";
import {CreatePageComponent} from './create-page/create-page.component';
import {RouterLink} from "@angular/router";
import {CreateFormComponent} from "./components/create-form/create-form.component";
import {TodoItemComponent} from "./components/todo-item/todo-item.component";

@NgModule({
  declarations: [
    ListPageComponent,
    CreatePageComponent
  ],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonToggleModule,
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    RouterLink,
    CreateFormComponent,
    TodoItemComponent,
  ]
})
export class TodosModule {
}
