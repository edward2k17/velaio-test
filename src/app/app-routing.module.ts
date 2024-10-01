import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListPageComponent} from "./todos/list-page/list-page.component";
import {CreatePageComponent} from "./todos/create-page/create-page.component";

const routes: Routes = [
  {path: '', redirectTo: '/list', pathMatch: 'full'},
  {path: 'list', component: ListPageComponent},
  {path: 'create', component: CreatePageComponent},
  {path: 'modify/:id', component: CreatePageComponent},
  {path: '**', redirectTo: '/list'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
