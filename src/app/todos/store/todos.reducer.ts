import {createReducer, on} from "@ngrx/store";
import {Todo} from "../todos.models";
import * as TodoActions from "../store/todos.actions";

export type dataStatus = 'loading' | 'success' | 'error'

export interface TodoState {
  todos: Todo[];
  error: any;
  loadStatus?: dataStatus;
  createStatus?: dataStatus;
}

export const initialState: TodoState = {
  todos: [],
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.loadTodos, (state) => ({...state, loadStatus: 'loading' as dataStatus})),
  on(TodoActions.loadTodosSuccess, (state, {todos}) => ({
    ...state,
    todos: [...todos, ...state.todos.filter(t => t.id > 200)],
    loadStatus: 'success' as dataStatus
  })),
  on(TodoActions.loadTodosFailure, (state, {error}) => ({...state, error, loadStatus: 'error' as dataStatus})),
  on(TodoActions.createTodo, (state) => ({...state, createStatus: 'loading' as dataStatus})),
  on(TodoActions.createTodoSuccess, (state, {todo}) => ({
    ...state, createStatus: 'success' as dataStatus,
    todos: [...state.todos, todo],
  })),
  on(TodoActions.createTodoFailure, (state, {error}) => ({...state, error, createStatus: 'error' as dataStatus})),
  on(TodoActions.updateTodo, (state) => ({...state, createStatus: 'loading' as dataStatus})),
  on(TodoActions.updateTodoSuccess, (state, {updatedTodo}) => ({
    ...state, createStatus: 'success' as dataStatus,
    todos: state.todos.map(todo =>
      todo.id === updatedTodo.id ? updatedTodo : todo
    ),
  })),
  on(TodoActions.updateTodoFailure, (state, {error}) => ({...state, error, createStatus: 'error' as dataStatus})),
);
