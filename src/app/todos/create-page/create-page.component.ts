import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {selectAllTodos} from "../store/todos.selectors";
import {Observable, of, switchMap} from "rxjs";
import {Todo} from "../todos.models";

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent {
  protected todo$: Observable<Todo | undefined>;

  constructor(private router: Router, private route: ActivatedRoute, private store: Store) {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.todo$ = this.store.select(selectAllTodos).pipe(switchMap((todos) => {
      return of(todos.find(t => t.id == id))
    }))
  }

  formSubmitted() {
    this.router.navigate(['/list'])
  }
}
