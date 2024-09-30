// Cargar tareas
import {createAction, props} from "@ngrx/store";
import {CreateTodo, Todo, UpdateTodo} from "../todos.models";

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction(
  '[Todo] Load Todos Success',
  props<{ todos: Todo[] }>()
);
export const loadTodosFailure = createAction(
  '[Todo] Load Todos Failure',
  props<{ error: any }>()
);

export const createTodo = createAction(
  '[Todo] Create Todo',
  props<{ todo: CreateTodo }>()
);

export const createTodoSuccess = createAction(
  '[Todo] Create Todo Success',
  props<{ todo: Todo }>()
);

export const createTodoFailure = createAction(
  '[Todo] Create Todo Failure',
  props<{ error: any }>()
);

export const updateTodo = createAction(
  '[Todo] Update Todo',
  props<{ todo: UpdateTodo }>()
);

export const updateTodoSuccess = createAction(
  '[Todo] Update Todo Success',
  props<{ updatedTodo: Todo }>()
);

export const updateTodoFailure = createAction(
  '[Todo] Update Todo Failure',
  props<{ error: any }>()
);

// export const toggleTodoStatus = createAction(
//   '[Todo] Toggle Todo Status',
//   props<{ todoId: number }>()
// );
