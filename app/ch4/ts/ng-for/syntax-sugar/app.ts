import {Component, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  templateUrl: './app.html'
})
class App {
  todos: string[];
  name: string;
  handle() {
    alert(42);
  }
  constructor() {
    this.name = "John";
    this.todos = ['Buy milk', "Save the world"];
  }
}

@NgModule({
  declarations: [App],
  imports: [BrowserModule],
  bootstrap: [App],
})
class AppModule {}

platformBrowserDynamic().bootstrapModule(AppModule);

