import {Component} from '@angular/core';
import {loadTodos, updateTodo} from "../store/todos.actions";
import {Store} from "@ngrx/store";
import {TodoState} from "../store/todos.reducer";
import {selectAllTodos, selectCompletedTodos, selectDataStatus, selectPendingTodos} from "../store/todos.selectors";
import {map} from "rxjs";
import {Todo} from "../todos.models";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {
  protected loading$ = this.store.select(selectDataStatus)
  filter: 'all' | 'pending' | 'completed' = 'all';

  constructor(private store: Store<{ todos: TodoState }>) {
  }

  get todos$() {
    switch (this.filter) {
      case "completed":
        return this.store.select(selectCompletedTodos);
      case "pending":
        return this.store.select(selectPendingTodos);
      default:
        return this.store.select(selectAllTodos);
    }
  }

  ngOnInit() {
    this.store.dispatch(loadTodos());
  }

  get loading() {
    return this.loading$.pipe(map(status => status == 'loading'))
  }

  toggleCompletion(todo: Todo) {
    this.store.dispatch(updateTodo({todo: {...todo, completed: !todo.completed}}))
  }
}
