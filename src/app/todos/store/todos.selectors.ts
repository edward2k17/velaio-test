import {createFeatureSelector, createSelector} from "@ngrx/store";
import {TodoState} from "./todos.reducer";

export const selectTodos = createFeatureSelector<TodoState>('todos');
export const selectAllTodos = createSelector(
  selectTodos,
  (todosState: TodoState) => todosState.todos)
export const selectCompletedTodos = createSelector(
  selectTodos,
  (todosState: TodoState) => todosState.todos.filter(todo => todo.completed))
export const selectPendingTodos = createSelector(
  selectTodos,
  (todosState: TodoState) => todosState.todos.filter(todo => !todo.completed))
export const selectDataStatus = createSelector(selectTodos, (todosState: TodoState) => todosState.loadStatus)
