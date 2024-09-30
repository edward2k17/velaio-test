import {Injectable} from '@angular/core';
import {map} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private config: any;

  constructor(private http: HttpClient) {}

  loadConfig() {
    return this.http.get('/assets/config.json')
      .pipe(map((config) => {
        this.config = config;
      }))
      .toPromise();
  }

  get apiUrl() {
    return this.config?.apiUrl;
  }
}
