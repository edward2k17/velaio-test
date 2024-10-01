import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {StoreModule} from "@ngrx/store";
import {EffectsModule} from "@ngrx/effects";
import {ConfigService} from "./core/config.service";
import {todoReducer} from "./todos/store/todos.reducer";
import {TodoEffects} from "./todos/store/todos.effects";
import {HttpClientModule} from "@angular/common/http";
import {TodosModule} from "./todos/todos.module";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

export function initializeApp(configService: ConfigService) {
  return () => configService.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({todos: todoReducer}, {}),
    EffectsModule.forRoot([TodoEffects]),
    TodosModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializeApp,
      deps: [ConfigService],
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
