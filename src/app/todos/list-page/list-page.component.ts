import {Component} from '@angular/core';
import {loadTodos, updateTodo} from "../store/todos.actions";
import {Store} from "@ngrx/store";
import {TodoState} from "../store/todos.reducer";
import {selectAllTodos, selectDataStatus} from "../store/todos.selectors";
import {map} from "rxjs";
import {Todo} from "../todos.models";

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent {
  protected todos$ = this.store.select(selectAllTodos);
  protected loading$ = this.store.select(selectDataStatus)

  constructor(private store: Store<{ todos: TodoState }>) {
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
