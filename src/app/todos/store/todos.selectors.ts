import {createSelector} from "@ngrx/store";
import {AppState} from "../../app.state";
import {TodoState} from "./todos.reducer";

export const selectTodos = (state: AppState) => state.todos
export const selectAllTodos = createSelector(selectTodos, (todosState: TodoState) => todosState.todos)
export const selectDataStatus = createSelector(selectTodos, (todosState: TodoState) => todosState.loadStatus)
