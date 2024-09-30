import {People} from "../people/people.models";


export interface CreateTodo {
  title: string;
  limitDate: string;
}

export interface UpdateTodo {
  id: number;
  title?: string;
  limitDate?: string;
  completed?: boolean;
  people?: People[];
}

export interface Todo {
  id: number;
  title: string;
  limitDate?: string;
  completed: boolean;
  people: People[];
}
