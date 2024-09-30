import {Actions, createEffect, ofType} from "@ngrx/effects";
import * as TodoActions from "../store/todos.actions";
import {catchError, map, mergeMap, of} from "rxjs";
import {Todo} from "../todos.models";
import {Injectable} from "@angular/core";
import {ApiService} from "../../core/api.service";

@Injectable()
export class TodoEffects {

  constructor(private actions$: Actions, private apiService: ApiService) {
  }

  loadTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.loadTodos),
      mergeMap(() =>
        this.apiService.get<Todo[]>('todos').pipe(
          map((todos) => TodoActions.loadTodosSuccess({todos})),
          catchError((error) => of(TodoActions.loadTodosFailure({error})))
        )
      )
    )
  );
  updateTodos$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TodoActions.updateTodo),
      mergeMap((data) =>
        this.apiService.put<Todo>(`todos/${data.todo.id}`, {...data.todo}).pipe(
          map((todo) => TodoActions.updateTodoSuccess({updatedTodo: todo})),
          catchError((error) => of(TodoActions.updateTodoFailure({error})))
        )
      )
    )
  );
}
