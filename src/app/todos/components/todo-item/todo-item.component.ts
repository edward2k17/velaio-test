import {Component, Input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {Todo} from "../../todos.models";
import {updateTodo} from "../../store/todos.actions";
import {Store} from "@ngrx/store";
import {TodoState} from "../../store/todos.reducer";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatCheckboxModule, MatListModule, MatIconModule, MatChipsModule],
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent {
  @Input() todo!: Todo;

  constructor(private store: Store<{ todos: TodoState }>) {
  }

  toggleCompletion(todo: Todo) {
    this.store.dispatch(updateTodo({todo: {...todo, completed: !todo.completed}}))
  }
}
