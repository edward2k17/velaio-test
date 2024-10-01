import {People} from "../people/people.models";


export interface CreateTodo {
  title: string;
  deadline: string;
  people?: People[];
}

export interface UpdateTodo {
  id: number;
  title?: string;
  deadline?: string;
  completed?: boolean;
  people?: People[];
}

export interface Todo {
  id: number;
  title: string;
  deadline?: string;
  completed: boolean;
  people: People[];
}
