import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ConfigService} from "./config.service";
import {CreateTodo} from "../todos/todos.models";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private configService: ConfigService, private http: HttpClient) {
  }

  get<T>(relativeUrl: string) {
    return this.http.get<T>(`${this.configService.apiUrl}/${relativeUrl}`);
  }

  post<T>(relativeUrl: string, data: CreateTodo) {
    return this.http.post<T>(`${this.configService.apiUrl}/${relativeUrl}`, data);
  }

  put<T>(relativeUrl: string, data: Partial<T>) {
    return this.http.put<T>(`${this.configService.apiUrl}/${relativeUrl}`, data);
  }
}
